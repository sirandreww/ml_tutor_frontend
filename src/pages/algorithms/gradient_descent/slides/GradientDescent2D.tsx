// ------------------------ IMPORTS ------------------------  
import React from 'react';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Plotly from 'plotly.js-gl3d-dist-min';
import { button, LeftItem, CenterItem } from 'pages/algorithms/dashboard/utils'
import Typography from '@mui/material/Typography';
import QuestionTable from 'pages/algorithms/dashboard/QuestionTable';
import { getDev, getExample, PrettoSlider, math, DIGITS } from '../helper';
import { mathJaxConfig, mathJaxStyle } from 'pages/algorithms/dashboard/utils';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { TextField } from "@mui/material";
// --------------------------------------------------------

export const HEADERS_2D : [string, any ,number][] = [
    ['step',    <MathJax style={mathJaxStyle} inline>{"\\(Step\\)"}</MathJax>,                      1],
    ['x',       <MathJax style={mathJaxStyle} inline>{"\\(x\\)"}</MathJax>,                         1],
    ['y',       <MathJax style={mathJaxStyle} inline>{"\\(y\\)"}</MathJax>,                         1],
    ['dx',      <MathJax style={mathJaxStyle} inline>{"\\(\\frac{df}{dx}\\)"}</MathJax>,            1],
    ['dy',      <MathJax style={mathJaxStyle} inline>{"\\(\\frac{df}{dy}\\)"}</MathJax>,            1],
    ['tmpX',    <MathJax style={mathJaxStyle} inline>{"\\(\\alpha*\\frac{df}{dx}\\)"}</MathJax>,    2],
    ['tmpY',    <MathJax style={mathJaxStyle} inline>{"\\(\\alpha*\\frac{df}{dy}\\)"}</MathJax>,    2],
    ['newX',    <MathJax style={mathJaxStyle} inline>{"\\(x_{new}\\)"}</MathJax>,                   1],
    ['newY',    <MathJax style={mathJaxStyle} inline>{"\\(y_{new}\\)"}</MathJax>,                   1],
]


function getPoints2D(f: string, startX: number, startY: number, steps_count: number, alpha: number) {
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
        return {
            x: [],
            y: [],
            z: []
        }
    }
}

function getGraph2D(data: { [id: string] : number[]; }, points: { [id: string] : number[]; }) {
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
    }
}

function getAnswers2D(header: [string, any ,number][], rows: number, f: string, startX: number, startY: number, alpha: number) {
    let res: { [id: string] : number[]; } = {}
    try {
        let keys = header.map((ele) => ele[0]);
        keys.forEach(key => res[key] = [])

        var dfx = getDev(f, 'x')
        var dfy = getDev(f, 'y')
        startX = Number(Number(startX).toFixed(DIGITS))
        startY = Number(Number(startY).toFixed(DIGITS))
        alpha = Number(alpha)

        var prevX = startX
        var prevY = startY

        for (let i = 0; i < rows; i++) {
            var ans: { [id: string] : number; } = {
                step: i,
                x: prevX,
                y: prevY,
                dx: Number(Number(math.evaluate(dfx, { 'x': prevX, 'y': prevY })).toFixed(DIGITS)),
                dy: Number(Number(math.evaluate(dfy, { 'x': prevX, 'y': prevY })).toFixed(DIGITS)),
                tmpX: Number(Number(math.evaluate('alpha*('.concat(dfx).concat(')'), { 'alpha': alpha, 'x': prevX, 'y': prevY })).toFixed(DIGITS)),
                tmpY: Number(Number(math.evaluate('alpha*('.concat(dfy).concat(')'), { 'alpha': alpha, 'x': prevX, 'y': prevY })).toFixed(DIGITS)),
                newX: 0,
                newY: 0,
            }

            ans.newX = Number(Number(math.evaluate('prevX-tmpX', { 'prevX': prevX, 'tmpX': ans.tmpX })).toFixed(DIGITS))
            ans.newY = Number(Number(math.evaluate('prevY-tmpY', { 'prevY': prevY, 'tmpY': ans.tmpY })).toFixed(DIGITS))

            for (const [key, value] of Object.entries(ans)) {
                res[key].push(value)
            }

            prevX = ans.newX
            prevY = ans.newY

        }
    }
    catch (e) {
        console.log('error at getAnswers2D(header, rows, f, startX, startY, alpha) => \n', e)
    }
    return res

}

function getData2D(f: string) {
    var data: { [id: string] : number[]; } = {
        x: [],
        y: [],
        z: []
    }
    // try
    try {
        for (let y = -10; y < 11; y += 1) {
            for (let x = -10; x < 11; x += 1) {
                data.z.push(math.evaluate(f, { 'x': x, 'y': y }))
                data.x.push(x)
                data.y.push(y)
            };
        }
    }
    catch (e) {
        console.log('error at getData2D(f) => \n', e)
    }
    // end of try-catch
    return data
}

export default function GradientDescent2D(props: {alphaType: string, buttonsType: string, generateQuestionTable: boolean}) {
    const { alphaType, buttonsType, generateQuestionTable} = props

    const getAlphaInput = (type: string) => {
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
                            onChange={(_event: any, value: any) => handleStates({ tck: false, dr: false, al: value })}
                        />
                    </span>
                );
            case 'input':
                return  <TextField autoFocus fullWidth value={alpha} onChange={event => handleStates({ tck: false, dr: false, cnt: 0, al: event.target.value })} />
            default:
                return null
        }
    }

    const getButtonsInput = (type: string) => {
        switch(type){
            case 'playGround':
            case 'hyperParameter': 
                return (
                    <CenterItem>
                        <Box sx={{ width: "100%", textAlign: 'center', direction: 'ltr' }}>
                            {button({ eventHandler: () => handleStates({ dr: true }), type: 'brush' })}
                            {button({ eventHandler: () => handleStates({ tck: false, dr: true, cnt: 0 }), type: 'stop' })}
                            {button({ eventHandler: () => handleStates({ tck: false }), type: 'pause' })}
                            {button({ eventHandler: () => handleStates({ tck: true, dr: true }), type: 'play' })}
                            <p>{count}</p>
                        </Box>
                    </CenterItem>
                );
            case 'stepByStep':
                return (
                    <CenterItem>
                        <Box sx={{ width: "100%", textAlign: 'center', direction: 'ltr' }}>
                            {button({ eventHandler: () => handleStates({ tck: false, dr: true }), type: 'brush' })}
                            {button({ eventHandler: () => handleStates({ tck: false, dr: false, cnt: (count <= 0) ? 0 : count - 1 }), type: 'prev' })}
                            {button({ eventHandler: () => handleStates({ tck: false, dr: true, cnt: 0 }), type: 'stop' })}
                            {button({ eventHandler: () => handleStates({ tck: false, dr: true, cnt: count + 1 }), type: 'next' })}
                        </Box>
                    </CenterItem>
                );
            default:
                return null
        }
    }

    const [myfun, setFun] = React.useState('x^2')
    const [alpha, setAlpha] = React.useState(0.1)
    const [startX, setStartX] = React.useState(10)
    const [startY, setStartY] = React.useState(10)
    const [ticking, setTicking] = React.useState(false)
    const [count, setCount] = React.useState(0)
    const [data2D, setData2D] = React.useState({ x: [], y: [], z: [] })
    const [draw, setDraw] = React.useState(true)

    const handleStates = (
        { fn = myfun, al = alpha, sx = startX, sy = startY, tck = ticking, cnt = count, d2D = data2D, dr = draw } =
            { fn: 'x^2', al: 0.1, sx: 10, sy: 10, tck: false, cnt: 0, d2D: { x: [], y: [], z: [] }, dr: true }) => {
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
            if (draw) {
                points = getPoints2D(myfun, startX, startY, count, alpha);
                getGraph2D(data2D, points);
            }
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
                <MathJaxContext version={3} config={mathJaxConfig}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, }}>
                        <Grid item xs={12}>
                            <LeftItem>
                                <Grid  container rowSpacing={1} columnSpacing={{ xs: 1, }} alignItems="center" justify="center">
                                    <Grid item xs={2}>
                                        <Typography style={{ color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(f(x, y)\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <TextField autoFocus fullWidth value={myfun} onChange={event => handleStates({ fn: event.target.value, tck: false, cnt: 0, dr: false })} />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography style={{ width: '100%', height: '2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(\\alpha\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={10}>
                                        { getAlphaInput(alphaType) }
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography style={{ width: '100%', height: '2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(x_{0}\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <TextField autoFocus fullWidth value={startX} onChange={event => handleStates({ tck: false, dr: false, cnt: 0, sx: event.target.value })} />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography style={{ width: '100%', height: '2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(y_{0}\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <TextField autoFocus fullWidth value={startY} onChange={event => handleStates({ tck: false, dr: false, cnt: 0, sy: event.target.value })} />
                                    </Grid>
                                </Grid>
                            </LeftItem>
                        </Grid>


                        <Grid item xs={12}>
                            <LeftItem>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, }}>
                                    <Grid item xs={2}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(\\frac{df}{dx}\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <TextField autoFocus fullWidth readOnly={true} value={getDev(myfun, 'x')} />
                                    </Grid>

                                    <Grid item xs={2}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(\\frac{df}{dy}\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <TextField autoFocus fullWidth readOnly={true} value={getDev(myfun, 'y')} />
                                    </Grid>
                                </Grid>
                            </LeftItem>
                        </Grid>

                        <Grid item xs={12}>
                            <CenterItem>
                                <Box sx={{ width: "100%", textAlign: 'center', direction: 'ltr'}}>
                                    { generateQuestionTable ? <QuestionTable
                                        rowsNum = {5}
                                        headers = {HEADERS_2D}
                                        rowNumbersEnabled = {true}
                                        exampleEnabled = {true}
                                        example = {getExample(myfun, [{ 'v': 'x', 'val': startX }, { 'v': 'y', 'val': startY }], alpha)}
                                        correctAnswers = {getAnswers2D(HEADERS_2D, 6, myfun, startX, startY, alpha)}
                                        comparator = {(res: number, ans: number) => Number(ans) === Number(res)}
                                    /> : null }
                                    <Box sx={{ width: "100%", textAlign: 'center', direction: 'ltr' }} id='graph2-board'/>
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