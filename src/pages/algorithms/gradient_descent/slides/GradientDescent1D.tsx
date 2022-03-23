// ------------------------ IMPORTS ------------------------  
import React from 'react';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import functionPlot from "function-plot";
import { button, LeftItem, CenterItem, mathJaxConfig, mathJaxStyle } from 'pages/algorithms/dashboard/utils'
import Typography from '@mui/material/Typography';
import QuestionTable from 'pages/algorithms/dashboard/QuestionTable';
import { PrettoSlider, getDev, getExample, math, DIGITS } from 'pages/algorithms/gradient_descent/helper';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import {TextField} from "@mui/material";
// --------------------------------------------------------

export const HEADERS_1D = [
    ['step', <MathJax style={mathJaxStyle} inline>{"\\(Step\\)"}</MathJax>, 1],
    ['x', <MathJax style={mathJaxStyle} inline>{"\\(x\\)"}</MathJax>, 1],
    ['dx', <MathJax style={mathJaxStyle} inline>{"\\(\\frac{df}{dx}(x)\\)"}</MathJax>, 1],
    ['tmpX', <MathJax style={mathJaxStyle} inline>{"\\(\\alpha * \\frac{df}{dx}(x)\\)"}</MathJax>, 1],
    ['newX', <MathJax style={mathJaxStyle} inline>{"\\(x_{new}\\)"}</MathJax>, 1],
]

function getPoints1D(f: string, startX: number, steps_count: number, alpha: number) {
    var points: [number, number][] = [[startX, math.evaluate(f, { 'x': startX })]]
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

function getGraph1D(f: string, points: [number, number][]) {
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

function getAnswers1D(header: [string, any ,number][], rows: number, f: string, startX: number, alpha: number) {
    let res: string[] = []
    try {
        var df = getDev(f, 'x')
        startX = Number(startX)
        alpha = Number(alpha)

        var prev = startX
        for (let i = 0; i < rows; i++) {
            var ans = {
                step: i,
                x: prev,
                dx: Number(math.evaluate(df, { 'x': prev })).toFixed(DIGITS),
                tmpX: "",
                newX: "",
            }
            ans.tmpX = Number(math.evaluate('alpha*('.concat(df).concat(')'), { 'alpha': alpha, 'x': prev })).toFixed(DIGITS)
            ans.newX = Number(math.evaluate('prev-tmp', { 'prev': prev, 'tmp': ans.tmpX })).toFixed(DIGITS)

            for (const [key, value] of Object.entries(ans)) {
                res.push(value.toString())
            }

            prev = Number(ans.newX)

        }
    }
    catch (e) {
        console.log('error at getAnswers1D(header, rows, f, startX, alpha) => \n', e)
    }
    return res
}

export default function GradientDescent1D(props) {
    const { alphaType, buttonsType, generateQuestionTable} = props

    const getAlphaInput = (type) => {
        switch(type){
            case 'slider':
                return (
                    <span>
                        <PrettoSlider
                            valueLabelDisplay="auto"
                            aria-label="pretto slider"
                            defaultValue={alpha}
                            step={0.05}
                            min={0}
                            max={2}
                            onChange={(event, value) => handleStates({ tck: false, dr: false, al: value })}
                        />
                    </span>
                );
            case 'input':
                return <TextField autoFocus fullWidth value={alpha} onChange={event => handleStates({ tck: false, cnt: 0, al: event.target.value })} />
            default:
                return null
        }
    }

    const getButtonsInput = (type) => {
        switch(type){
            case 'playGround':
            case 'hyperParameter': 
                return (
                    <CenterItem>
                        <Box sx={{ width: "100%", textAlign: 'center', direction: 'ltr' }}>
                            {button({ eventHandler: () => handleStates({ tck: false, cnt: 0 }), type: 'stop' })}
                            {button({ eventHandler: () => handleStates({ tck: false }), type: 'pause' })}
                            {button({ eventHandler: () => handleStates({ tck: true }), type: 'play' })}
                            <p>{count}</p>
                        </Box>
                    </CenterItem>
                );
            case 'stepByStep':
                return (
                    <CenterItem>
                        <Box sx={{ width: "100%", textAlign: 'center', direction: 'ltr' }}>
                            {button({ eventHandler: () => handleStates({ tck: false, cnt: (count <= 0) ? 0 : count - 1 }), type: 'prev' })}
                            {button({ eventHandler: () => handleStates({ tck: false, cnt: 0 }), type: 'stop' })}
                            {button({ eventHandler: () => handleStates({ tck: false, cnt: count + 1 }), type: 'next' })}
                        </Box>
                    </CenterItem>
                );
            default:
                return null
        }
    }

    const [myfun, setFun] = React.useState('x^2')
    const [alpha, setAlpha] = React.useState(0.1)
    const [startX, setStartX] = React.useState(-1)
    const [ticking, setTicking] = React.useState(false)
    const [count, setCount] = React.useState(0)

    const handleStates = (
        { fn = myfun, al = alpha, sx = startX, tck = ticking, cnt = count } =
            { fn: 'x^2', al: 0.1, sx: -1, tck: false, cnt: 0 }) => {
        setFun(fn)
        setStartX(sx)
        setAlpha(al)
        setCount(cnt)
        setTicking(tck)
    }

    React.useEffect(() => {
        try {
            let points = getPoints1D(myfun, startX, count, alpha)
            getGraph1D(myfun, points)
        }
        catch (e) {
            console.log("error at useEffect on parameters changes => \n", e)
        }
    }, [myfun, alpha, startX, count]);

    // For Initial plot when the page loads for the first time
    React.useEffect(() => {
        try {
            const timer = setTimeout(() => ticking && setCount(count + 1), 1e3)
            return () => clearTimeout(timer)
        }
        catch (e) {
            console.log("error at useEffect => \n", e)
        }
    });

    return (
        <div>
            <Box sx={{ width: "100%" }}>
                <MathJaxContext version={3} config={mathJaxConfig}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, }}>
                        <Grid item xs={12}>
                            <LeftItem>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, }} alignItems="center" justify="center">
                                    <Grid item xs={1}>
                                        <Typography style={{ color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(f(x)\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        <TextField autoFocus fullWidth value={myfun} onChange={event => handleStates({ tck: false, cnt: 0, fn: event.target.value })} />
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(\\alpha\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        { getAlphaInput(alphaType) }
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(x_{0}\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        <TextField autoFocus fullWidth value={startX} onChange={event => handleStates({ tck: false, cnt: 0, sx: event.target.value })} />
                                    </Grid>
                                </Grid>
                            </LeftItem>
                        </Grid>

                        <Grid item xs={12}>
                            <LeftItem>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, }}  alignItems="center" justify="center">
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(\\frac{df}{dx}\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        <TextField autoFocus fullWidth readOnly={true} value={getDev(myfun, 'x')} />
                                    </Grid>
                                </Grid>
                            </LeftItem>
                        </Grid>

                        <Grid item xs={12}>
                            <CenterItem>
                                <Box sx={{ width: "100%", textAlign: 'center', direction: 'ltr'}}>
                                    {generateQuestionTable ? (<QuestionTable
                                        rowsNum = {5}
                                        headers = {HEADERS_1D}
                                        exampleEnabled = {true}
                                        rowNumbersEnabled = {true}
                                        example = {getExample(myfun, [{ 'v': 'x', 'val': startX }], alpha)}
                                        correctAnswers = {getAnswers1D(HEADERS_1D, 6, myfun, startX, alpha)}
                                        comparator = {(res, ans) => Number(ans) === Number(res)}
                                    />) : null
                                    }
                                    <Box sx={{ width: "100%", textAlign: 'center', direction: 'ltr' }} id='graph-board' />
                                </Box>
                            </CenterItem>
                            { getButtonsInput(buttonsType) }
                        </Grid>
                    </Grid>
                </MathJaxContext>
            </Box>
        </div>
    );
}