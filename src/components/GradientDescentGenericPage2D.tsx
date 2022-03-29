// ------------------------ IMPORTS ------------------------  
import React from 'react';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import { button, LeftItem, CenterItem } from 'components/LanguageAndButtonUtility';
import Typography from '@mui/material/Typography';
import QuestionTable from 'components/QuestionTable';
import { getDev, getCorrectAnswers, PrettoSlider, math, DIGITS, getData2D, getGraph2D, getPoints2D, XYZdata } from 'components/GradientDescentHelper';
import { mathJaxConfig, mathJaxStyle } from 'components/LanguageAndButtonUtility';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { TextField } from "@mui/material";
import { getTwoDimensionalColumnNames } from 'components/QuestionTableDefinitions';
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
                return <TextField autoFocus fullWidth value={alpha} onChange={event => handleStates({ fn: myfun, al: Number(event.target.value), sx: startX, sy: startY, tck: false, cnt: 0, d2D: data2D, dr: false })} />
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
                            {button({ eventHandler: () => handleStates({ fn: myfun, al: alpha, sx: startX, sy: startY, tck: false, cnt: count, d2D: data2D, dr: true }), type: 'brush' })}
                            {button({ eventHandler: () => handleStates({ fn: myfun, al: alpha, sx: startX, sy: startY, tck: false, cnt: (count <= 0) ? 0 : count - 1, d2D: data2D, dr: false }), type: 'prev' })}
                            {button({ eventHandler: () => handleStates({ fn: myfun, al: alpha, sx: startX, sy: startY, tck: false, cnt: 0, d2D: data2D, dr: true }), type: 'stop' })}
                            {button({ eventHandler: () => handleStates({ fn: myfun, al: alpha, sx: startX, sy: startY, tck: false, cnt: count + 1, d2D: data2D, dr: true }), type: 'next' })}
                        </Box>
                    </CenterItem>
                );
            default:
                return null
        }
    }

    const [myfun, setFun] = React.useState('x^2')
    const [alpha, setAlpha] = React.useState(0.05)
    const [startX, setStartX] = React.useState(-10)
    const [startY, setStartY] = React.useState(0)
    const [ticking, setTicking] = React.useState(false)
    const [count, setCount] = React.useState(0)
    const [data2D, setData2D] = React.useState({ x: new Array<Array<Number>>(), y: new Array<Number>(), z: new Array<Array<Number>>() })
    const [draw, setDraw] = React.useState(false)

    function handleStates({fn= myfun, al = alpha, sx = startX, sy = startY, tck = ticking, cnt = count, d2D = data2D, dr = draw}) {
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
            if (draw) {
                let points = getPoints2D(myfun, startX, startY, count, alpha);
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
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, }} alignItems="center">
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
                                        {getAlphaInput(alphaType)}
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography style={{ width: '100%', height: '2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(x_{0}\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <TextField autoFocus fullWidth value={startX} onChange={event => handleStates({ tck: false, dr: false, cnt: 0, sx: Number(event.target.value) })} />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography style={{ width: '100%', height: '2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(y_{0}\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <TextField autoFocus fullWidth value={startY} onChange={event => handleStates({ tck: false, dr: false, cnt: 0, sy: Number(event.target.value) })} />
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
                                        <TextField autoFocus fullWidth InputProps={{ readOnly: true, }} value={getDev(myfun, 'x')} />
                                    </Grid>

                                    <Grid item xs={2}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(\\frac{df}{dy}\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <TextField autoFocus fullWidth InputProps={{ readOnly: true, }} value={getDev(myfun, 'y')} />
                                    </Grid>
                                </Grid>
                            </LeftItem>
                        </Grid>

                        <Grid item xs={12}>
                            <CenterItem>
                                <Box sx={{ width: "100%", textAlign: 'center', direction: 'ltr' }}>
                                    {generateQuestionTable ? <QuestionTable
                                        rowsNum={5}
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