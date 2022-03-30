// ------------------------ IMPORTS ------------------------  
import React from 'react';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import { button, LeftItem, CenterItem, mathJaxConfig, mathJaxStyle } from 'components/LanguageAndButtonUtility';
import Typography from '@mui/material/Typography';
import QuestionTable from 'components/QuestionTable';
import { PrettoSlider, getDev, getCorrectAnswers, getPoints1D, getGraph1D } from 'components/GradientDescentHelper';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { getOneDimensionalColumnNames } from 'components/QuestionTableDefinitions';
import FunctionTextField from './FunctionTextField';
import NumberTextField from 'components/NumberTextField';
// --------------------------------------------------------

type Props = {
    alphaType: string,
    buttonsType: string,
    generateQuestionTable: boolean
}

export default function GradientDescentGenericPage1D(props: Props) {
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
                            onChange={(_, value) => handleStates({ fn: myfun, al: Number(value), sx: startX, tck: false, cnt: count })}
                        />
                    </span>
                );
            case 'input':
                return <NumberTextField value={alpha} onChange={event => handleStates({ fn: myfun, al: Number(event.target.value), sx: startX, tck: false, cnt: 0 })} />
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
                            {button({ eventHandler: () => handleStates({ fn: myfun, al: alpha, sx: startX, tck: false, cnt: 0 }), type: 'stop' })}
                            {button({ eventHandler: () => handleStates({ fn: myfun, al: alpha, sx: startX, tck: false, cnt: count }), type: 'pause' })}
                            {button({ eventHandler: () => handleStates({ fn: myfun, al: alpha, sx: startX, tck: true, cnt: count }), type: 'play' })}
                            <p>{count}</p>
                        </Box>
                    </CenterItem>
                );
            case 'stepByStep':
                return (
                    <CenterItem>
                        <Box sx={{ width: "100%", textAlign: 'center', direction: 'ltr' }}>
                            {button({ eventHandler: () => handleStates({ fn: myfun, al: alpha, sx: startX, tck: false, cnt: (count <= 0) ? 0 : count - 1 }), type: 'prev' })}
                            {button({ eventHandler: () => handleStates({ fn: myfun, al: alpha, sx: startX, tck: false, cnt: 0 }), type: 'stop' })}
                            {button({ eventHandler: () => handleStates({ fn: myfun, al: alpha, sx: startX, tck: false, cnt: count + 1 }), type: 'next' })}
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

    function handleStates({ fn = myfun, al = alpha, sx = startX, tck = ticking, cnt = count }) {
        setFun(fn)
        setStartX(sx)
        setAlpha(al)
        setCount(cnt)
        setTicking(tck)
    }

    React.useEffect(() => {
        let points = getPoints1D(myfun, startX, count, alpha)
        getGraph1D(myfun, points)
    }, [myfun, alpha, startX, count]);

    // For Initial plot when the page loads for the first time
    React.useEffect(() => {
        const timer = setTimeout(() => ticking && setCount(count + 1), 1e3)
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
                                    <Grid item xs={1}>
                                        <Typography style={{ color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(f(x)\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        <FunctionTextField value={myfun} vars="x" onChange={
                                            event => handleStates({ fn: event.target.value, al: alpha, sx: startX, tck: false, cnt: 0 })
                                        } />
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(\\alpha\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        {getAlphaInput(alphaType)}
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(x_{0}\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        <NumberTextField value={startX} onChange={
                                            event => handleStates({ fn: myfun, al: alpha, sx: Number(event.target.value), tck: false, cnt: 0 })
                                        } />
                                    </Grid>
                                </Grid>
                            </LeftItem>
                        </Grid>

                        <Grid item xs={12}>
                            <LeftItem>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, }} alignItems="center">
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(\\frac{df}{dx}\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        <FunctionTextField InputProps={{ readOnly: true, }} vars="x" value={getDev(myfun, 'x')} onChange={(_)=>(_)}/>
                                    </Grid>
                                </Grid>
                            </LeftItem>
                        </Grid>

                        <Grid item xs={12}>
                            <CenterItem>
                                <Box sx={{ width: "100%", textAlign: 'center', direction: 'ltr' }}>
                                    {generateQuestionTable ? (<QuestionTable
                                        rowsNum={5}
                                        headers={getOneDimensionalColumnNames()}
                                        exampleEnabled={true}
                                        correctAnswers={getCorrectAnswers(myfun, [{ 'v': 'x', 'val': startX }], alpha, 5)}
                                        comparator={(res, ans) => Number(ans) === Number(res)}
                                    />) : <div></div>
                                    }
                                    <Box sx={{ width: "100%", textAlign: 'center', direction: 'ltr' }} id='graph-board' />
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