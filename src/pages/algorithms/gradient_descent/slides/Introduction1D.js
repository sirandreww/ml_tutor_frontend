import * as React from 'react';
import Box from '@mui/material/Box';
import functionPlot from "function-plot";
import Typography from '@mui/material/Typography';
import { getDev, math } from 'pages/algorithms/gradient_descent/helper';
import { mathJaxConfig, mathJaxStyle } from 'pages/algorithms/dashboard/utils';
import { MathJax, MathJaxContext } from "better-react-mathjax";

function getPoints1D(f, startX, steps_count, alpha) {
    var points = [[startX, math.evaluate(f, { 'x': startX })]]
    var df = getDev(f, 'x')
    // console.log("f=", f, "df=", df, " startX=", startX, " steps_count=", steps_count, " alpha=", alpha)

    startX = Number(startX)
    steps_count = Number(steps_count)
    alpha = Number(alpha)


    var prev = startX
    for (let i = 0; i < steps_count; i++) {
        // console.log("i=", i)
        var tmp = math.evaluate('alpha*('.concat(df).concat(')'), { 'alpha': alpha, 'x': prev })
        // console.log("alpha*df = ", tmp) 
        var next = math.evaluate('prev-tmp', { 'prev': prev, 'tmp': tmp })
        // console.log("next = ", next)
        points.push([next, math.evaluate(f, { 'x': next })])
        prev = next
    }

    // console.log('points=', points)
    return points
}

function getGraph1D(f, points) {
    var width = 800;
    var height = 500;
    // console.log("points= \n", points)
    // console.log("f= \n", f)

    functionPlot({
        target: '#graph-board',
        width,
        height,
        xAxis: { domain: [-(math.abs(points[0][0]) + 2), math.abs(points[0][0]) + 2], label: 'x' },
        yAxis: { domain: [-(math.abs(points[0][1]) + 2), math.abs(points[0][1]) + 2], label: 'f(x)' },
        title: f,
        grid: true,
        disableZoom: true,
        data: [
            {
                fn: f,
                derivative: {
                    fn: getDev(f, 'x'),
                    updateOnMouseMove: true
                },
            },
            {
                points: points,
                fnType: 'points',
                graphType: 'polyline',
            }
        ]
    });
}

export default function Introduction1D() {
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        try {
            let points = getPoints1D('x^2', '5', count, '0.2');
            getGraph1D('x^2', points);
        }
        catch (e) {
            console.log("error at useEffect on parameters changes => \n", e)
        }
    }, [count]);

    React.useEffect(() => {
        try {
            let new_count = null;
            (count < 10) ? new_count = count + 1 : new_count = 0
            const timer = setTimeout(() => setCount(new_count), 1e3)
            return () => clearTimeout(timer)
        }
        catch (e) {
            console.log("error at useEffect => \n", e)
        }
    });

    const tab = <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    const headers_style = {fontFamily: 'Arial, Helvetica, sans-serif'}
    return (
        <Box sx={{ width: '100%' }}>
            <MathJaxContext version={3} config={mathJaxConfig}>
                <Typography component={'span'}>
                    <h1 style={headers_style}>Gradient descent 1D</h1>
                    <br/>
                    Gradient descent is an iterative algorithm for finding a local minimum. <br/>
                    It starts at a given point and the idea is to take repeated steps in the opposite direction of the gradient (derivative) of the function at the current point.<br/>
                    <br/>
                    Let us take for example <MathJax style={mathJaxStyle} inline>{"\\(f(x) = x^{2}\\)"}</MathJax> as the function and <MathJax style={mathJaxStyle} inline>{"\\(x = 5\\)"}</MathJax> as the starting point.<br/>
                    The first 10 steps the algorithm takes are shown in the following animation:<br/>
                    <br/>
                </Typography>
                <div id='graph-board' style={{pointerEvents: 'none'}}></div>
                <Typography component={'span'}>
                    <br/>
                    <h4 style={headers_style}>How does the algorithm achieve this?</h4><br/>
                    In each step the algorithm calculates the derivative of the current point and based on that it calculate the next point.<br/>
                    First we will introduce a Hyper-Parameter called alpha. Alpha holds a number which is responsible for the step size.<br/>
                    <br/><br/>
                    {tab}<h4 style={headers_style}>Some definitions:</h4><br/>
                    {tab}{tab}<MathJax style={mathJaxStyle} inline>{"\\(x\\)"}</MathJax> - the x value of the point.<br/><br/>
                    {tab}{tab}<MathJax style={mathJaxStyle} inline>{"\\(f(x)\\)"}</MathJax> - the y value of the point.<br/><br/>
                    {tab}{tab}<MathJax style={mathJaxStyle} inline>{"\\(\\frac{df}{dx}\\)"}</MathJax> - the derivative of f.<br/><br/>
                    {tab}{tab}<MathJax style={mathJaxStyle} inline>{"\\(\\frac{df}{dx}(x)\\)"}</MathJax> - the value of the derivative at x.<br/><br/>
                    {tab}{tab}<MathJax style={mathJaxStyle} inline>{"\\(\\alpha\\)"}</MathJax> - the Hyper-parameter that dictates step size.<br/><br/>
                    {tab}{tab}<MathJax style={mathJaxStyle} inline>{"\\(x_{new}\\)"}</MathJax>  - the x value of the new point.<br/><br/>
                    <br/><br/>
                    {tab}<h4 style={headers_style}>In each step the algorithm does the following:</h4><br/>
                    {tab}{tab}1. calculate <MathJax style={mathJaxStyle} inline>{"\\(\\frac{df}{dx}(x)\\)"}</MathJax><br/><br/>
                    {tab}{tab}2. Apply <MathJax style={mathJaxStyle} inline>{"\\(x_{new} = x - (\\alpha * \\frac{df}{dx}(x))\\)"}</MathJax><br/><br/>
                    {tab}{tab}3. Apply <MathJax style={mathJaxStyle} inline>{"\\(x = x_{new}\\)"}</MathJax><br/><br/>
                </Typography>
            </MathJaxContext>
        </Box>
    )
}
