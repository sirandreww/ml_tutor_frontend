// ------------------------ IMPORTS ------------------------  
import React from 'react';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import { button, LeftItem, CenterItem } from 'components/LanguageAndButtonUtility';
import Typography from '@mui/material/Typography';
import QuestionTable from 'components/QuestionTable';
import { getDev, getCorrectAnswers, PrettoSlider, getData2D, getGraph2D, getPoints2D } from 'components/gradient_descent/GradientDescentHelper';
import { mathJaxConfig, mathJaxStyle } from 'components/LanguageAndButtonUtility';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { getTwoDimensionalColumnNames } from 'components/QuestionTableDefinitions';
import FunctionTextField from '../FunctionTextField';
import NumberTextField from 'components/NumberTextField';
import {TextField} from "@mui/material";
// --------------------------------------------------------

type Props = {
    alphaType: string,
    buttonsType: string,
    generateQuestionTable: boolean
}

export default function GradientDescentGenericPage2D(props: Props) {
    const { alphaType, buttonsType, generateQuestionTable } = props

    const getAlphaInput = (type: string) => {
        switch (type) {
            case 'slider':
                return (
                    <span>
                        <PrettoSlider
                            data-testid="alphaInput"
                            valueLabelDisplay="auto"
                            aria-label="pretto slider"
                            defaultValue={alpha}
                            step={0.05}
                            min={0}
                            max={2}
                            onChange={(_, value) => handleStates({ fn: myfun, al: Number(value), sx: startX, sy: startY, tck: false, cnt: count, d2D: data2D, dr: false })}
                        />
                    </span>
                );
            case 'input':
                return <NumberTextField InputProps={{"data-testid": "alphaInput"}} value={alpha} onChange={event => handleStates({ fn: myfun, al: Number(event.target.value), sx: startX, sy: startY, tck: false, cnt: 0, d2D: data2D, dr: false })} />
            default:
                return null
        }
    }

    const getButtonsInput = (type: string) => {
        switch (type) {
            case 'playGround':
            case 'hyperParameter':
                return (
                    <CenterItem>
                        <Box sx={{ width: "100%", textAlign: 'center', direction: 'ltr' }}>
                            {button({ eventHandler: () => handleStates({ fn: myfun, al: alpha, sx: startX, sy: startY, tck: ticking, cnt: count, d2D: data2D, dr: true }), type: 'brush' })}
                            {button({ eventHandler: () => handleStates({ fn: myfun, al: alpha, sx: startX, sy: startY, tck: false, cnt: 0, d2D: data2D, dr: true }), type: 'stop' })}
                            {button({ eventHandler: () => handleStates({ fn: myfun, al: alpha, sx: startX, sy: startY, tck: false, cnt: count, d2D: data2D, dr: draw }), type: 'pause' })}
                            {button({ eventHandler: () => handleStates({ fn: myfun, al: alpha, sx: startX, sy: startY, tck: true, cnt: count, d2D: data2D, dr: true }), type: 'play' })}
                            <p>{count}</p>
                        </Box>
                    </CenterItem>
                );
            case 'stepByStep':
                return (
                    <CenterItem>
                        <Box sx={{ width: "100%", textAlign: 'center', direction: 'ltr' }}>
                            {button({ eventHandler: () => handleStates({ fn: myfun, al: alpha, sx: startX, sy: startY, tck: false, cnt: count, d2D: data2D, dr: true, sps: stepsPerSecond }), type: 'brush' })}
                            {button({ eventHandler: () => handleStates({ fn: myfun, al: alpha, sx: startX, sy: startY, tck: false, cnt: (count <= 0) ? 0 : count - 1, d2D: data2D, dr: false, sps: stepsPerSecond }), type: 'prev' })}
                            {button({ eventHandler: () => handleStates({ fn: myfun, al: alpha, sx: startX, sy: startY, tck: false, cnt: 0, d2D: data2D, dr: true, sps: stepsPerSecond }), type: 'stop' })}
                            {button({ eventHandler: () => handleStates({ fn: myfun, al: alpha, sx: startX, sy: startY, tck: false, cnt: count + 1, d2D: data2D, dr: true, sps: stepsPerSecond }), type: 'next' })}
                        </Box>
                    </CenterItem>
                );
            default:
                return null
        }
    }

    const [myfun, setFun] = React.useState('x^2+y^2')
    const [alpha, setAlpha] = React.useState(0.05)
    const [startX, setStartX] = React.useState(-10)
    const [startY, setStartY] = React.useState(-10)
    const [ticking, setTicking] = React.useState(false)
    const [count, setCount] = React.useState(0)
    const [data2D, setData2D] = React.useState({ x: new Array<Array<Number>>(), y: new Array<Number>(), z: new Array<Array<Number>>() })
    const [draw, setDraw] = React.useState(false)
    const [stepsPerSecond, setStepsPerSecond] = React.useState(1)

    function handleStates({ fn = myfun, al = alpha, sx = startX, sy = startY, tck = ticking, cnt = count, d2D = data2D, dr = draw, sps = stepsPerSecond }) {
        setFun(fn)
        setStartX(sx)
        setStartY(sy)
        setAlpha(al)
        setDraw(dr)
        setCount(cnt)
        setTicking(tck)
        setStepsPerSecond(sps)

        if (dr) {
            (myfun !== '') ? setData2D(getData2D(myfun)) : setData2D(d2D)
        }
    }

    React.useEffect(() => {
        if (draw) {
            let points = getPoints2D(myfun, startX, startY, count, alpha);
            getGraph2D(data2D, points);
        }
    }, [myfun, alpha, startX, startY, count, draw, data2D]);

    // For Initial plot when the page loads for the first time
    React.useEffect(() => {
        const timer = setTimeout(() => ticking && setCount(count + stepsPerSecond), 1e3)
        return () => clearTimeout(timer)
    });

    return (
        <div>
            <Box sx={{ width: "100%" }}>
                <MathJaxContext version={3} config={mathJaxConfig}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, }}>
                        <Grid item xs={12}>
                            <LeftItem>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, }} alignItems="center">
                                    <Grid item xs={2}>
                                        <Typography style={{ color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(f(x, y)\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <FunctionTextField InputProps={{"data-testid":"funInput"}} value={myfun} vars="xy" onChange={event => handleStates({ fn: event.target.value, tck: false, cnt: 0, dr: false})} />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography style={{ width: '100%', height: '2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(\\alpha\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={10}>
                                        {getAlphaInput(alphaType)}
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography style={{ width: '100%', height: '2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(x_{0}\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <NumberTextField InputProps={{"data-testid":"xInput"}} value={startX} onChange={event => handleStates({ tck: false, dr: false, cnt: 0, sx: Number(event.target.value)})} />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography style={{ width: '100%', height: '2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(y_{0}\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <NumberTextField InputProps={{"data-testid":"yInput"}} value={startY} onChange={event => handleStates({ tck: false, dr: false, cnt: 0, sy: Number(event.target.value)})} />
                                    </Grid>
                                    {(buttonsType === "stepByStep") ? null :
                                        <Grid item xs={2}>
                                            <Typography style={{ width: '100%', height: '2rem', color: 'black' }}>
                                                <MathJax style={mathJaxStyle} inline>{"\\(steps_{perSecond}\\)"}</MathJax>
                                            </Typography>
                                        </Grid>
                                    }
                                    {(buttonsType === "stepByStep") ? null :
                                        <Grid item xs={10}>
                                            <PrettoSlider
                                                data-testId="stepPerSecondInput"
                                                valueLabelDisplay="auto"
                                                aria-label="pretto slider"
                                                defaultValue={stepsPerSecond}
                                                step={1}
                                                min={1}
                                                max={50}
                                                onChange={(_, value) => handleStates({ sps: Number(value) })}
                                            />
                                        </Grid>
                                    }
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
                                        {/* FunctionTextField doesn't work properly, it doesn't change the value*/}
                                        <TextField data-testId="dfxResult" autoFocus fullWidth InputProps={{ readOnly: true, }} value={getDev(myfun, 'x')} />
                                    </Grid>

                                    <Grid item xs={2}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(\\frac{df}{dy}\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={10}>
                                        {/* FunctionTextField doesn't work properly, it doesn't change the value*/}
                                        <TextField data-testId="dfyResult" autoFocus fullWidth InputProps={{ readOnly: true, }} value={getDev(myfun, 'y')} />
                                    </Grid>
                                </Grid>
                            </LeftItem>
                        </Grid>

                        <Grid item xs={12}>
                            <CenterItem>
                                <Box sx={{ width: "100%", textAlign: 'center', direction: 'ltr' }}>
                                    {generateQuestionTable ? <QuestionTable
                                        headers={getTwoDimensionalColumnNames()}
                                        exampleEnabled={true}
                                        correctAnswers={getCorrectAnswers(myfun, [{ 'v': 'x', 'val': startX }, { 'v': 'y', 'val': startY }], alpha, 5)}
                                        comparator={(res, ans) => Number(ans) === Number(res)}
                                    /> : <div></div>}
                                    <Box sx={{ width: "100%", textAlign: 'center', direction: 'ltr' }} id='graph2-board' />
                                </Box>
                            </CenterItem>
                            {getButtonsInput(buttonsType)}
                        </Grid>
                    </Grid>
                </MathJaxContext>
            </Box>
        </div>
    );
}