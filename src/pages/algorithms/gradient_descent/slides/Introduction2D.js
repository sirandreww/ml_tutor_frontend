
import * as React from 'react';
import Box from '@mui/material/Box';
import Plotly from 'plotly.js-dist-min';
import Typography from '@mui/material/Typography';
import { getDev, math } from '../helper';

function getPoints2D(f, startX, startY, steps_count, alpha) {
    try {
        var dfx = getDev(f, 'x')
        var dfy = getDev(f, 'y')
        var prevX = Number(startX)
        var prevY = Number(startY)
        steps_count = Number(steps_count)
        alpha = Number(alpha)

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
            autosize: true,
            xaxis: {
                range: [-5, 5],
                uirevision: 'time',
            },
            yaxis: {
                range: [-5, 5],
                uirevision: 'time',
            }
        }
        var config = { 
            responsive: true,
            displayModeBar: false,
            scrollZoom: false,
        }
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

const fun = 'x^2 + y^2';
const data = getData2D(fun)

export default function Introduction2D() {
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        try {
            console.log(count)
            let points = null;
            points = getPoints2D(fun, '10', '-10', count, '0.05');
            getGraph2D(data, points);
        }
        catch (e) {
            console.log("error at useEffect on parameters changes => \n", e)
        }
    }, [count]);

    // For Initial plot when the page loads for the first time
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
                Now let us see how Gradient Descent handle functions with 2 variables!<br/>
                <br/>
                Let us take for example f(x, y) = x^2 + y^2 as function and (x = 10, y = -10) will be the starting point.<br/>
                The first 10 steps the algorithm takes are shown the following animation.<br/>
                <br/>
            </Typography>
            <div id='graph2-board' style={{pointerEvents: 'none'}}></div>
            <Typography>
                <br/>
                How the algorithm achives this?<br/>
                Almost the same as before, Some definitions:<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;x - the x value of the point.<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;y - the y value of the point.<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;f(x, y) - the z value of the point.<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fx' - is the derivative of f by x variable (consider y as number).<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fx'(x, y) - the z value of the derivative at (x, y).<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fy' - is the derivative of f by y variable (consider x as number).<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fy'(x, y) - the z value of the derivative at (x, y).<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;alpha - is the Hyper-parameter.<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;new_x - will be the x value of the new point.<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;new_y - will be the y value of the new point.<br/>
                <br/>
                So in each step the algorithm do the following:<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. calculate fx'(x, y)<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. calculate fy'(x, y)<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. new_x = x - (alpha * fx'(x, y))<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. new_y = y - (alpha * fy'(x, y))<br/>
                <br/>
                Thats how the algorithm calculate the next point as you can see almost the same calculations!.<br/>
            </Typography>
        </Box>
    )
}
