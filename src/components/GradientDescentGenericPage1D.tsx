// Andrew Please check - Need to fix getAnswers1D & QuestionTable & some react componenets (Remove the 2 lines and see errors)

// ------------------------ IMPORTS ------------------------  
import React from 'react';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import { button, LeftItem, CenterItem, mathJaxConfig, mathJaxStyle } from 'components/LanguageAndButtonUtility';
import Typography from '@mui/material/Typography';
import QuestionTable from 'components/QuestionTable';
import { PrettoSlider, getDev, getExample, math, DIGITS, getPoints1D, getGraph1D } from 'components/GradientDescentHelper';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import {TextField} from "@mui/material";
// --------------------------------------------------------

export const HEADERS_1D: (string | number | JSX.Element)[][] = [
    ['step', <MathJax style={mathJaxStyle} inline>{"\\(Step\\)"}</MathJax>, 1],
    ['x', <MathJax style={mathJaxStyle} inline>{"\\(x\\)"}</MathJax>, 1],
    ['dx', <MathJax style={mathJaxStyle} inline>{"\\(\\frac{df}{dx}(x)\\)"}</MathJax>, 1],
    ['tmpX', <MathJax style={mathJaxStyle} inline>{"\\(\\alpha * \\frac{df}{dx}(x)\\)"}</MathJax>, 1],
    ['newX', <MathJax style={mathJaxStyle} inline>{"\\(x_{new}\\)"}</MathJax>, 1],
]

function getAnswers1D(header, rows, f, startX, alpha) {
    try {
        let keys = header.map((ele) => ele[0]);
        let res = {}
        keys.forEach(key => res[key] = [])

        var df = getDev(f, 'x')
        startX = Number(startX)
        alpha = Number(alpha)

        var prev = startX
        for (let i = 0; i < rows; i++) {
            var ans = {
                step: i,
                x: prev,
                dx: Number(math.evaluate(df, { 'x': prev })).toFixed(DIGITS),
                tmpX: null,
                newX: null,
            }
            ans.tmpX = Number(math.evaluate('alpha*('.concat(df).concat(')'), { 'alpha': alpha, 'x': prev })).toFixed(DIGITS)
            ans.newX = Number(math.evaluate('prev-tmp', { 'prev': prev, 'tmp': ans.tmpX })).toFixed(DIGITS)

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

type Props = {
    alphaType: string, 
    buttonsType: string, 
    generateQuestionTable: boolean
}

export default function GradientDescentGenericPage1D(props: Props) {
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
                            onChange={(_, value) => handleStates({fn: myfun, al: Number(value), sx: startX, tck: false, cnt: count})}
                        />
                    </span>
                );
            case 'input':
                return <TextField autoFocus fullWidth value={alpha} onChange={event => handleStates({fn: myfun, al: Number(event.target.value), sx: startX, tck: false, cnt: 0})} />
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
                            {button({ eventHandler: () => handleStates({fn: myfun, al: alpha, sx: startX, tck: false, cnt: 0}), type: 'stop' })}
                            {button({ eventHandler: () => handleStates({fn: myfun, al: alpha, sx: startX, tck: false, cnt: count}), type: 'pause' })}
                            {button({ eventHandler: () => handleStates({fn: myfun, al: alpha, sx: startX, tck: true, cnt: count }), type: 'play' })}
                            <p>{count}</p>
                        </Box>
                    </CenterItem>
                );
            case 'stepByStep':
                return (
                    <CenterItem>
                        <Box sx={{ width: "100%", textAlign: 'center', direction: 'ltr' }}>
                            {button({ eventHandler: () => handleStates({fn: myfun, al: alpha, sx: startX, tck: false, cnt: (count <= 0) ? 0 : count - 1 }), type: 'prev'})}
                            {button({ eventHandler: () => handleStates({fn: myfun, al: alpha, sx: startX, tck: false, cnt: 0}), type: 'stop' })}
                            {button({ eventHandler: () => handleStates({fn: myfun, al: alpha, sx: startX, tck: false, cnt: count + 1}), type: 'next' })}
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

    const handleStates = ({ fn = myfun, al = alpha, sx = startX, tck = ticking, cnt = count }: {fn: string, al: number, sx: number, tck: boolean, cnt: number }) => {
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
            return
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