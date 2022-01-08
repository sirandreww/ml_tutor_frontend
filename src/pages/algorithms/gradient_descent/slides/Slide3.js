// ------------------------ IMPORTS ------------------------  
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

import { button, LeftItem, CenterItem, RightItem } from 'pages/algorithms/dashboard/utils'
import Typography from '@mui/material/Typography';
import functionPlot from "function-plot";
import { create, all } from 'mathjs';

const PrettoSlider = styled(Slider)({
    width: '30%',
    height: 8,
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-thumb': {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
        '&:before': {
            display: 'none',
        },
    },
    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 12,
        background: 'unset',
        padding: 0,
        width: 32,
        height: 32,
        borderRadius: '50% 50% 50% 0',
        backgroundColor: '#1976d2',
        transformOrigin: 'bottom left',
        transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
        '&:before': { display: 'none' },
        '&.MuiSlider-valueLabelOpen': {
            transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
        },
        '& > *': {
            transform: 'rotate(45deg)',
        },
    },
});

// ------------------------ CODE ------------------------    

const math = create(all, {})

// --------------------------------------------------------

export default function GradientDescentSlide3() {

    const [myfun, setFun] = React.useState('x^2')
    const [alpha, setAlpha] = React.useState(1)
    const [startX, setStartX] = React.useState('0')
    const [startY, setStartY] = React.useState('0')
    const [ticking, setTicking] = React.useState(false)
    const [count, setCount] = React.useState(0)
    const [data2D, setData2D] = React.useState({ x: [], y: [], z: [] })
    const [draw, setDraw] = React.useState(false)

    const handleStates = (
        { fn = myfun, al = alpha, sx = startX, sy = startY, tck = ticking, cnt = count, d2D = data2D, dr = draw } =
            { fn: 'x^2', al: 1, sx: 0, sy: 0, tck: false, cnt: 0, d2D: { x: [], y: [], z: [] }, dr: false }) => {
        setFun(fn)
        setStartX(sx)
        setStartY(sy)
        setAlpha(al)
        setDraw(dr)
        setCount(cnt)
        setTicking(tck)

        if (dr) {
            (myfun !== '') ? setData2D(getData2D(myfun)) : setData2D(d2D)
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
    }, [myfun, alpha, startX, startY, count, draw, data2D]);

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
                                <PrettoSlider
                                    valueLabelDisplay="auto"
                                    aria-label="pretto slider"
                                    defaultValue={alpha}
                                    step={0.05}
                                    min={0}
                                    max={10}
                                    onChange={(event, value) => handleStates({ tck: false, al: value })}
                                />
                                <br /><br />
                                Starting point (x = <input type='text' style={{ width: '5rem' }} value={startX} onChange={event => handleStates({ tck: false, cnt: 0, sx: event.target.value })} />)
                                <br /><br />
                                The derivative of the function is:  {getDev(myfun, 'x')}
                            </Typography>
                        </LeftItem>
                    </Grid>
                    <Grid item xs={12}>
                        <CenterItem>
                            <div id='graph-board'></div>
                        </CenterItem>
                        <RightItem>
                            {button({ eventHandler: () => handleStates({ tck: false, cnt: 0 }), type: 'stop' })}
                            {button({ eventHandler: () => handleStates({ tck: false }), type: 'pause' })}
                            {button({ eventHandler: () => handleStates({ tck: true }), type: 'play' })}
                            <p>{count}</p>
                        </RightItem>
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

function getData2D(f) {
    try {
        var data = {
            x: [],
            y: [],
            z: []
        }

        for (let y = -10; y < 11; y += 1) {
            var new_y = [[], []]
            for (let x = -10; x < 11; x += 1) {
                new_y[0].push(math.evaluate(f, { 'x': x, 'y': y }))
                new_y[1].push(x)
            };
            data.x.push(new_y[1])
            data.y.push(y)
            data.z.push(new_y[0])
        }

        return data
    }
    catch (e) {
        console.log('error at getData2D(f) => \n', e)
        return '0'
    }
}