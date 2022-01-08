// ------------------------ IMPORTS ------------------------  
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import { IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import BrushIcon from '@mui/icons-material/Brush';

import { LeftItem, CenterItem, RightItem } from 'pages/algorithms/dashboard/utils'
import Typography from '@mui/material/Typography';
import { create, all } from 'mathjs';
import Plotly from 'plotly.js-dist-min';

const math = create(all, {});


export default function Task2() {
    const [myfun, setFun] = React.useState('x^2 + y^2');
    const [alpha, setAlpha] = React.useState(0.01);
    const [startX, setStartX] = React.useState('10');
    const [startY, setStartY] = React.useState('10');
    const [ticking, setTicking] = React.useState(false);
    const [count, setCount] = React.useState(0);
    const [data2D, setData2D] = React.useState({ x: [], y: [], z: [] });
    const [draw, setDraw] = React.useState(true);

    const handleStates = (
        { fn = myfun, al = alpha, sx = startX, sy = startY, tck = ticking, cnt = count, d2D = data2D, dr = draw } =
            { fn: 'x^2 + y^2', al: 0.01, sx: 10, sy: 10, tck: false, cnt: 0, d2D: { x: [], y: [], z: [] }, dr: true }) => {
        setFun(fn);
        setStartX(sx);
        setStartY(sy);
        setAlpha(al);
        setDraw(dr);
        setCount(cnt);
        setTicking(tck);
        (myfun !== '') ? setData2D(getData2D(myfun)) : setData2D(d2D);
    }

    React.useEffect(() => {
        let points = null;
        points = getPoints2D(myfun, startX, startY, count, alpha);
        getGraph2D(data2D, points);
    }, [myfun, alpha, startX, startY, count, draw, data2D]);

    // For Initial plot when the page loads for the first time
    React.useEffect(() => {
        try {
            const timer = setTimeout(() => ticking && setCount(count + 1), 1e-3)
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
                                f(x, y):
                                <br />
                                <input type='text' value={myfun} style={{ width: '100%', height: '2rem' }} onChange={event => handleStates({ fn: event.target.value, tck: false, cnt: 0, dr: false })} />
                            </Typography>
                        </LeftItem>
                        <LeftItem>
                            <Typography sx={{ color: 'black', fontSize: '1rem' }}>
                                alpha:
                                <br />
                                <input type='text' value={alpha} onChange={event => handleStates({ tck: false, dr: false, cnt: 0, al: event.target.value })} />
                            </Typography>
                        </LeftItem>
                        <LeftItem>
                            <Typography sx={{ color: 'black', fontSize: '1rem' }}>
                                Starting point (
                                x = <input type='text' style={{ width: '5rem' }} value={startX} onChange={event => handleStates({ tck: false, dr: false, cnt: 0, sx: event.target.value })} />,
                                y = <input type='text' style={{ width: '5rem' }} value={startY} onChange={event => handleStates({ tck: false, dr: false, cnt: 0, sy: event.target.value })} />
                                )
                            </Typography>
                        </LeftItem>
                        <LeftItem>
                            <Typography sx={{ color: 'black', fontSize: '1rem' }}>
                                The derivative of the function is:  f'(x) = {getDev(myfun, 'x')}, f'(y) = {getDev(myfun, 'y')}
                            </Typography>
                        </LeftItem>
                    </Grid>
                    <Grid item xs={12}>
                        <CenterItem>
                            <div id='graph2-board'></div>
                        </CenterItem>
                        <RightItem>
                            <IconButton aria-label="delete" size="large" color="warning" onClick={() => handleStates({ dr: true })}>
                                <BrushIcon fontSize="inherit" />
                            </IconButton>
                            <IconButton aria-label="delete" size="large" color="error" onClick={() => handleStates({ tck: false, dr: false, cnt: 0 })}>
                                <ClearIcon fontSize="inherit" />
                            </IconButton>
                            <IconButton aria-label="delete" size="large" onClick={() => handleStates({ tck: false })}>
                                <PauseIcon fontSize="inherit" />
                            </IconButton>
                            <IconButton aria-label="delete" size="large" color="success" onClick={() => handleStates({ tck: true, dr: true })}>
                                <PlayArrowIcon fontSize="inherit" />
                            </IconButton>
                            <p>{count}</p>
                        </RightItem>
                    </Grid>
                </Grid>
            </Box>
            <div id="mygraph"></div>
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

function getPoints2D(f, startX, startY, steps_count, alpha) {
    try {
        var dfx = getDev(f, 'x')
        var dfy = getDev(f, 'y')
        var prevX = parseFloat(startX)
        var prevY = parseFloat(startY)
        steps_count = parseFloat(steps_count)
        alpha = parseFloat(alpha)

        var points = {
            x: [prevX],
            y: [prevY],
            z: [math.evaluate(f, { 'x': startX, 'y': startY })]
        }
        // console.log("f=", f, "dfx=", dfx, "dfy=", dfy, " startX=", startX, " steps_count=", steps_count, " alpha=", alpha)

        for (let i = 0; i < steps_count; i++) {
            // console.log("i=", i)

            var tmpX = math.evaluate('alpha*('.concat(dfx).concat(')'), { 'alpha': alpha, 'x': prevX, 'y': prevY })
            var tmpY = math.evaluate('alpha*('.concat(dfy).concat(')'), { 'alpha': alpha, 'x': prevX, 'y': prevY })
            var nextX = math.evaluate('prevX-tmpX', { 'prevX': prevX, 'tmpX': tmpX })
            var nextY = math.evaluate('prevY-tmpY', { 'prevY': prevY, 'tmpY': tmpY })
            var z = math.evaluate(f, { 'x': nextX, 'y': nextY })

            // console.log('prevX=', prevX, ' prevY=', prevY, ' tmpX=', tmpX, ' tmpY=', tmpY, ' nextX=', nextX, ' nextY=', nextY )
            points.x.push(nextX)
            points.y.push(nextY)
            points.z.push(z)

            prevX = nextX
            prevY = nextY
        }

        // console.log("points = ", points)
        return points

    }
    catch (e) {
        console.log('error at getPoints2D(f, startX, startY, steps_count, alpha) => \n', e)
        return '0'
    }
}

function getGraph2D(data, points) {
    try {
        // console.log('getGraph2D - \n')
        // console.log('data = ', data, '\n')
        // console.log('points = ', points, '\n')

        var z = []

        for (let y = -10; y < 11; y += 1) {
            var new_y = []
            for (let x = -10; x < 11; x += 1) {
                new_y.push(x)
            };
            z.push(new_y)
        }
        const data_z1 = {
            type: 'surface',
            x: data.x,
            y: data.y,
            z: data.z,
            colorscale: 'Viridis',
            lighting: {
                roughness: 0.2
            }
        };
        const data_z2 = {
            type: 'scatter3d',
            mode: 'points',
            x: points.x,
            y: points.y,
            z: points.z,
            marker: { color: 'red' }
        };
        const layout = {
            xaxis: {
                range: [-5, 5]
            },
            yaxis: {
                range: [-5, 5]
            }
        }
        var config = { responsive: true }
        Plotly.newPlot('graph2-board', [data_z1, data_z2], layout, config);
    }
    catch (e) {
        console.log('error at getGraph2D(data, points) => \n', e)
        return '0'
    }
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