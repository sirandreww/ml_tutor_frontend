// @ts-nocheck 
import { create, all } from 'mathjs';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import functionPlot from "function-plot";
import Plotly from 'plotly.js-gl3d-dist-min';

export type XYZ = {
    x: Number[],
    y: Number[],
    z: Number[]
}

export type XYZdata = {
    x: Number[][],
    y: Number[],
    z: Number[][]
}

export const math = create(all, {})
export const DIGITS = 2

export const PrettoSlider = styled(Slider)({
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

export function getDev(f: string, v: string) {
    try {
        return math.derivative(f, v).toString()
    }
    catch (e) {
        console.log('error at getDev(f,v) => \n', e)
        return 'error'
    }
}


export function getExample(f: string, vars: { 'v': string, 'val': number }[], alpha: number) {
    try {
        alpha = Number(alpha)
        var prevs: { [id: string] : number; } = {}
        vars.forEach(ele => prevs[ele.v] = Number(Number(ele.val).toFixed(DIGITS)))

        var vs: string[] = []
        var devs: string[] = []
        var tmps: string[] = []
        var nexts: string[] = []

        for (let index = 0; index < vars.length; index++) {
            let { v, val } = vars[index];
            let val_str = Number(val).toFixed(DIGITS)
            let df = getDev(f, v)
            let dev = Number(math.evaluate(df, prevs)).toFixed(DIGITS)
            let tmp = Number(math.evaluate('alpha*dev', { 'alpha': alpha, 'dev': dev })).toFixed(DIGITS)
            let next = Number(math.evaluate('v-tmp', { 'v': val, 'tmp': tmp })).toFixed(DIGITS)

            vs.push(val_str)
            devs.push(dev)
            tmps.push(tmp)
            nexts.push(next)
        }
        // console.log('getExample=', ['', ...vs, ...devs, ...tmps, ...nexts])
        return ['', ...vs, ...devs, ...tmps, ...nexts]
    }
    catch (e) {
        console.log('error at getExample(f, vars, alpha) => \n', e)
        return ["error", "error", "error"]
    }
}

export function getPoints1D(f: string, startX: number, steps_count: number, alpha: number) {
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

export function getGraph1D(f: string, points: number[][]) {
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

export function getPoints2D(f: string, startX: Number, startY: Number, steps_count: Number, alpha: Number) {
    var prevX = startX
    var prevY = startY
    var points: XYZ = {
        x: [prevX],
        y: [prevY],
        z: [math.evaluate(f, { 'x': startX, 'y': startY })]
    }

    try {
        var dfx = getDev(f, 'x')
        var dfy = getDev(f, 'y')

        console.log("f=", f, "dfx=", dfx, "dfy=", dfy, " startX=", startX, " startY=", startY, " steps_count=", steps_count, " alpha=", alpha)

        for (let i = 0; i < steps_count; i++) {
            console.log("i=", i)

            var tmpX = math.evaluate('alpha*('.concat(dfx).concat(')'), { 'alpha': alpha, 'x': prevX, 'y': prevY })
            var tmpY = math.evaluate('alpha*('.concat(dfy).concat(')'), { 'alpha': alpha, 'x': prevX, 'y': prevY })
            var nextX = math.evaluate('prevX-tmpX', { 'prevX': prevX, 'tmpX': tmpX })
            var nextY = math.evaluate('prevY-tmpY', { 'prevY': prevY, 'tmpY': tmpY })
            var z = math.evaluate(f, { 'x': nextX, 'y': nextY })

            console.log('prevX=', prevX, ' prevY=', prevY, ' tmpX=', tmpX, ' tmpY=', tmpY, ' nextX=', nextX, ' nextY=', nextY )
            points.x.push(nextX)
            points.y.push(nextY)
            points.z.push(z)

            prevX = nextX
            prevY = nextY
        }

        console.log("points = ", points)
        return points

    }
    catch (e) {
        console.log('error at getPoints2D(f, startX, startY, steps_count, alpha) => \n', e)
        return {x: [], y: [], z: []}
    }
}

export function getData2D(f: string) {
    var data: {x: Number[][], y: Number[], z: Number[][]} = {x: [], y: [], z: []}
    console.log('aseel data= ', data)
    try {    
        for (let y = -10; y < 11; y += 1) {
            var xs = new Array<Number>()
            var zs = new Array<Number>()

            for (let x = -10; x < 11; x += 1) {
                zs.push(math.evaluate(f, { 'x': x, 'y': y }))
                xs.push(x)
            };

            data.x.push(xs)
            data.y.push(y)
            data.z.push(zs)
        }

        return data
    }
    catch (e) {
        console.log('error at getData2D(f) => \n', e)
        return {x: [], y: [], z: []}
    }
}

export function getGraph2D(data: XYZdata, points: XYZ) {
    try {
        console.log('getGraph2D - \n')
        console.log('data = ', data, '\n')
        console.log('points = ', points, '\n')

        var z = new Array<Array<Number>>()

        for (let y = -10; y < 11; y += 1) {
            var new_y = new Array<Number>()
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
        return
    }
}