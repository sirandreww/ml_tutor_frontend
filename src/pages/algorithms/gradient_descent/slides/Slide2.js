// ------------------------ IMPORTS ------------------------  
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import { button, LeftItem, CenterItem } from 'pages/algorithms/dashboard/utils'
import Typography from '@mui/material/Typography';
import functionPlot from "function-plot";
import { create, all } from 'mathjs';
import QuestionTable from 'pages/algorithms/dashboard/QuestionTable';

// ------------------------ CODE ------------------------    
const DIGITS = 3
const HEADERS_1D = [
    ['step', 'Step'],
    ['x', 'x'],
    ['dx', "f'(x)"],
    ['tmpX', "alpha * f'(x)"],
    ['newX', "x'"],
]
const math = create(all, {})

// --------------------------------------------------------

export default function GradientDescentSlide2() {

    const [myfun, setFun] = React.useState('x^2')
    const [alpha, setAlpha] = React.useState(1)
    const [startX, setStartX] = React.useState('0')
    const [startY, setStartY] = React.useState('0')
    const [ticking, setTicking] = React.useState(false)
    const [count, setCount] = React.useState(0)
    const [draw, setDraw] = React.useState(false)

    const handleStates = (
        { fn = myfun, al = alpha, sx = startX, sy = startY, tck = ticking, cnt = count, dr = draw } =
            { fn: 'x^2', al: 1, sx: 0, sy: 0, tck: false, cnt: 0, dr: false }) => {
        setFun(fn)
        setStartX(sx)
        setStartY(sy)
        setAlpha(al)
        setDraw(dr)
        setCount(cnt)
        setTicking(tck)

        if (dr) {
            // (myfun !== '') ? setData2D(getData2D(myfun)) : setData2D(d2D)
        }
    }

    React.useEffect(() => {
        try {
            let points = null;
            points = getPoints1D(myfun, startX, count, alpha);
            getGraph1D(myfun, points);
        }
        catch (e) {
            console.log("error at useEffect on parameters changes => \n", e)
        }
    }, [myfun, alpha, startX, startY, count, draw]);

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
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, }}>
                    <Grid item xs={12}>
                        <LeftItem>
                            <Typography sx={{ color: 'black', fontSize: '1rem' }}>
                                f(x):<br />
                                <input type='text' value={myfun} style={{ width: '100%', height: '2rem' }} onChange={event => handleStates({ tck: false, cnt: 0, fn: event.target.value })} />
                                <br /><br />
                                alpha:<br />
                                <input type='text' value={alpha} onChange={event => handleStates({ tck: false, cnt: 0, al: event.target.value })} />
                                <br /><br />
                                Starting point (x = <input type='text' style={{ width: '5rem' }} value={startX} onChange={event => handleStates({ tck: false, cnt: 0, sx: event.target.value })} />)
                                <br /><br />
                                The derivative of the function is:  {getDev(myfun, 'x')}
                            </Typography>
                        </LeftItem>
                    </Grid>
                    <Grid item xs={12}>
                        <CenterItem>
                            <QuestionTable
                                rowsNum={5}
                                headers={HEADERS_1D}
                                exampleEnabled={true}
                                rowNumbersEnabled={true}
                                example={getExample(myfun, [{ 'v': 'x', 'val': startX }], alpha)}
                                correctAnswers={getAnswers1D(HEADERS_1D, 6, myfun, startX, alpha)}
                            />
                            <div id='graph-board'></div>
                        </CenterItem>
                        <CenterItem>
                            {button({ eventHandler: () => handleStates({ tck: false, cnt: (count <= 0) ? 0 : count - 1 }), type: 'prev' })}
                            {button({ eventHandler: () => handleStates({ tck: false, cnt: 0 }), type: 'stop' })}
                            {button({ eventHandler: () => handleStates({ tck: false, cnt: count + 1 }), type: 'next' })}
                        </CenterItem>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

function getDev(f, v) {
    try {
        return math.derivative(f, v).toString()
    }
    catch (e) {
        console.log('error at getDev(f,v) => \n', e)
        return '0'
    }
}
function getExample(f, vars, alpha) {
    try {
        alpha = parseFloat(alpha)
        var prevs = {}
        vars.forEach(ele => prevs[ele.v] = parseFloat(ele.val).toFixed(DIGITS))

        var vs = []
        var devs = []
        var tmps = []
        var nexts = []

        for (let index = 0; index < vars.length; index++) {
            let { v, val } = vars[index];
            val = parseFloat(val).toFixed(DIGITS)

            let df = getDev(f, v)
            let dev = parseFloat(math.evaluate(df, prevs)).toFixed(DIGITS)
            let tmp = parseFloat(math.evaluate('alpha*dev', { 'alpha': alpha, 'dev': dev })).toFixed(DIGITS)
            let next = parseFloat(math.evaluate('v-tmp', { 'v': val, 'tmp': tmp })).toFixed(DIGITS)

            vs.push(val)
            devs.push(dev)
            tmps.push(tmp)
            nexts.push(next)
        }
        // console.log('getExample=', ['', ...vs, ...devs, ...tmps, ...nexts])
        return ['', ...vs, ...devs, ...tmps, ...nexts]
    }
    catch (e) {
        console.log('error at getExample(f, vars, alpha) => \n', e)
        return '0'
    }
}

function getPoints1D(f, startX, steps_count, alpha) {
    var points = [[startX, math.evaluate(f, { 'x': startX })]]
    var df = getDev(f, 'x')

    // console.log(startX)
    startX = parseFloat(startX)
    steps_count = parseFloat(steps_count)
    alpha = parseFloat(alpha)

    // console.log("f=", f, "df=", df, " startX=", startX, " steps_count=", steps_count, " alpha=", alpha)

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

    return points
}
function getAnswers1D(header, rows, f, startX, alpha) {
    try {
        let keys = header.map((ele) => ele[0]);
        let res = {}
        keys.forEach(key => res[key] = [])

        var df = getDev(f, 'x')
        startX = parseFloat(startX)
        alpha = parseFloat(alpha)

        var prev = startX
        for (let i = 0; i < rows; i++) {
            var ans = {
                step: i,
                x: prev,
                dx: parseFloat(math.evaluate(df, { 'x': prev })).toFixed(DIGITS),
                tmpX: null,
                newX: null,
            }
            ans.tmpX = parseFloat(math.evaluate('alpha*('.concat(df).concat(')'), { 'alpha': alpha, 'x': prev })).toFixed(DIGITS)
            ans.newX = parseFloat(math.evaluate('prev-tmp', { 'prev': prev, 'tmp': ans.tmpX })).toFixed(DIGITS)

            for (const [key, value] of Object.entries(ans)) {
                res[key].push(value)
            }

            prev = ans.newX

        }
        // ['', x, math.evaluate(df, {'x': x}), dfx, math.evaluate('x-tmp', {'x': x, 'tmp': dfx})]

        return res
    }
    catch (e) {
        console.log('error at getAnswers1D(header, rows, f, startX, alpha) => \n', e)
    }
}

function getGraph1D(f, points) {
    var width = 800;
    var height = 500;
    // console.log("points= \n", points)

    functionPlot({
        target: '#graph-board',
        width,
        height,
        xAxis: { domain: [-(points[0][0] + 2), points[0][0] + 2], label: 'x' },
        yAxis: { domain: [-(points[0][1] + 2), points[0][1] + 2], label: 'f(x)' },
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
