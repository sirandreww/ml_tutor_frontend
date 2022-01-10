import functionPlot from "function-plot";
import { create, all } from 'mathjs';
import Plotly from 'plotly.js-dist-min'
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

const math = create(all, {})
const DIGITS = 3

export const HEADERS_1D = [
    ['step', 'Step'],
    ['x', 'x'],
    ['dx', "f'(x)"],
    ['tmpX', "alpha * f'(x)"],
    ['newX', "x'"],
]

export const HEADERS_2D = [
    ['step', 'Step'],
    ['x', 'x'],
    ['y', 'y'],
    ['dx', "dfx(x, y)"],
    ['dy', "dfy(x, y)"],
    ['tmpX', "alpha * dfx(x, y)"],
    ['tmpY', "alpha * dfy(x, y)"],
    ['newX', "x'"],
    ['newY', "y'"],
]

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

export function getDev(f, v) {
    try {
        return math.derivative(f, v).toString()
    }
    catch (e) {
        console.log('error at getDev(f,v) => \n', e)
        return '0'
    }
}

export function getPoints1D(f, startX, steps_count, alpha) {
    var points = [[startX, math.evaluate(f, { 'x': startX })]]
    var df = getDev(f, 'x')

    console.log(startX)
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

    // console.log('points=', points)
    return points
}

export function getGraph1D(f, points) {
    var width = 800;
    var height = 500;
    // console.log("points= \n", points)
    // console.log("f= \n", f)

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

export function getPoints2D(f, startX, startY, steps_count, alpha) {
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

export function getGraph2D(data, points) {
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

export function getExample(f, vars, alpha) {
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

export function getAnswers1D(header, rows, f, startX, alpha) {
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

export function getAnswers2D(header, rows, f, startX, startY, alpha) {
    try {
        let keys = header.map((ele) => ele[0]);
        let res = {}
        keys.forEach(key => res[key] = [])

        var dfx = getDev(f, 'x')
        var dfy = getDev(f, 'y')
        startX = parseFloat(startX).toFixed(DIGITS)
        startY = parseFloat(startY).toFixed(DIGITS)
        alpha = parseFloat(alpha)

        var prevX = startX
        var prevY = startY

        for (let i = 0; i < rows; i++) {
            var ans = {
                step: i,
                x: prevX,
                y: prevY,
                dx: parseFloat(math.evaluate(dfx, { 'x': prevX, 'y': prevY })).toFixed(DIGITS),
                dy: parseFloat(math.evaluate(dfy, { 'x': prevX, 'y': prevY })).toFixed(DIGITS),
                tmpX: null,
                tmpY: null,
                newX: null,
                newY: null,
            }
            ans.tmpX = parseFloat(math.evaluate('alpha*('.concat(dfx).concat(')'), { 'alpha': alpha, 'x': prevX, 'y': prevY })).toFixed(DIGITS)
            ans.newX = parseFloat(math.evaluate('prevX-tmpX', { 'prevX': prevX, 'tmpX': ans.tmpX })).toFixed(DIGITS)
            ans.tmpY = parseFloat(math.evaluate('alpha*('.concat(dfy).concat(')'), { 'alpha': alpha, 'x': prevX, 'y': prevY })).toFixed(DIGITS)
            ans.newY = parseFloat(math.evaluate('prevY-tmpY', { 'prevY': prevY, 'tmpY': ans.tmpY })).toFixed(DIGITS)

            for (const [key, value] of Object.entries(ans)) {
                res[key].push(value)
            }

            prevX = ans.newX
            prevY = ans.newY

        }
        // ['', x, math.evaluate(df, {'x': x}), dfx, math.evaluate('x-tmp', {'x': x, 'tmp': dfx})]
        console.log('res=', res)
        return res
    }
    catch (e) {
        console.log('error at getAnswers2D(header, rows, f, startX, startY, alpha) => \n', e)
    }

}

export function getData2D(f) {
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