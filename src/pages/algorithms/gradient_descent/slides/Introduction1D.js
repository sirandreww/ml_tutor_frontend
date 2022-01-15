import * as React from 'react';
import Box from '@mui/material/Box';
import functionPlot from "function-plot";
import Typography from '@mui/material/Typography';
import { getDev, math } from 'pages/algorithms/gradient_descent/helper';


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

    return (
        <Box sx={{ width: '100%' }}>
            <Typography>
                Gradient descent is an iterative algorithm for finding a local minimum. <br/>
                It starts at a given point and the idea is to take repeated steps in the opposite direction of the gradient (derivative) of the function at the current point.<br/>
                <br/>
                Let us take for example f(x) = x^2 as function and x = 5 will be the starting point.<br/>
                The first 10 steps the algorithm takes are shown the following animation.<br/>
                <br/>
            </Typography>
            <div id='graph-board'></div>
            <Typography>
                <br/>
                How the algorithm achives this?<br/>
                In each step the algorithm calculates the derivative in the current point and based on that it calculate the next point.<br/>
                First we will introduce the Hyper-Parameter called alpha, this variable holds a number which is responsible on the step size.<br/>
                <br/>
                Some definitions:<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;x - the x value of the point.<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;f(x) - the y value of the point.<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;f' - is the derivative of f.<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;f'(x) - the y value of the derivative at x.<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;alpha - is the Hyper-parameter.<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;new_x - will be the x value of the new point.<br/>
                <br/>
                So in each step the algorithm do the following:<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. calculate f'(x)<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. new_x = x - (alpha * f'(x))<br/>
                <br/>
                Thats how the algorithm calculate the next point.<br/>
            </Typography>
        </Box>
    )
}
