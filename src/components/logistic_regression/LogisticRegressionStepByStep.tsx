import React from 'react';
import Typography from '@mui/material/Typography';
import NumberTextField from "../NumberTextField";
import {TextField} from "@mui/material";
import { CenterItem, LeftItem, mathJaxConfig } from "../LanguageAndButtonUtility";
import Box from "@mui/material/Box";
import {MathJax, MathJaxContext} from "better-react-mathjax";
import Grid from "@mui/material/Grid";
import {LogisticRegressionModule, math} from "./LogisticRegressionCore";
import QuestionTable from "../QuestionTable";
import {
    getLogisticRegressionDataColumnNames,
    getLogisticRegressionModuleInfoColumns,
} from "../QuestionTableDefinitions";

const TOTAL_ITERATIONS = 2
const DIGITS = 4

function getDataAnswers(xs: number[][], cs: number[], algo: LogisticRegressionModule): { [id: string]: string }[] {
    let moduleInfo = algo.getModuleInfo()
    let answers: { [id: string]: string }[] = []
    let step = 0
    for (let epoch = 1; epoch < TOTAL_ITERATIONS + 1 ; epoch++) {
        xs.forEach((xi, id) => {
            let yi = Number(Number(moduleInfo.ys[epoch - 1].subset(math.index(id))).toFixed(DIGITS))

            // console.log("moduleInfo.ys = \n", moduleInfo.ys)
            // console.log("typeOf moduleInfo.ys = \n", (typeof moduleInfo.ys))
            // console.log("moduleInfo.ys[epoch - 1] = \n", moduleInfo.ys[epoch - 1])
            // console.log("typeOf moduleInfo.ys[epoch - 1] = \n", (typeof moduleInfo.ys[epoch - 1]))
            // console.log("moduleInfo.ys[epoch - 1].subset(math.index(id)) = \n", moduleInfo.ys[epoch - 1].subset(math.index(id)))
            // console.log("typeOf moduleInfo.ys[epoch - 1].subset(math.index(id)) = \n", (typeof moduleInfo.ys[epoch - 1].subset(math.index(id))))
            // console.log("yi = \n", yi)
            // console.log("typeOf yi = \n", (typeof yi))
            // console.log("Number(yi) = \n", Number(yi))

            let tmp = {
                "step": step.toString(),
                "epoch": epoch.toFixed(DIGITS).toString(),
                "sid": (id + 1).toFixed(DIGITS).toString(),
                "xOne": xi[0].toFixed(DIGITS).toString(),
                "xTwo": xi[1].toFixed(DIGITS).toString(),
                "yi": yi.toFixed(DIGITS).toString(),
                "dbi": (yi - cs[id]).toFixed(DIGITS).toString()
            }

            // console.log("tmp = \n", tmp)
            answers.push(tmp)
            step++
        })
    }

    // console.log("Data Answers = \n", answers)
    return answers
    // return []
}

function getModuleAnswers(alpha: number, algo: LogisticRegressionModule): { [id: string]: string }[] {
    let moduleInfo = algo.getModuleInfo()
    let answers: { [id: string]: string }[] = []
    let step = 0
    let ws = moduleInfo.ws
    let bs = moduleInfo.bs
    let bPrev = 0
    let w1Prev = 0
    let w2Prev = 0

    for (let epoch = 0; epoch < TOTAL_ITERATIONS ; epoch++) {
        let bNew = bs[epoch]
        let w1New = Number(ws[epoch].subset(math.index(0)))
        let w2New = Number(ws[epoch].subset(math.index(1)))

        console.log("bNew ", bNew)
        console.log("w2New ", w2New)
        console.log("w2New ", w2New)
        answers.push({
            "step": step.toString(),
            "epoch": epoch.toFixed(DIGITS).toString(),
            "wOne": w1Prev.toFixed(DIGITS).toString(),
            "wTwo": w2Prev.toFixed(DIGITS).toString(),
            "b": bPrev.toFixed(DIGITS).toString(),
            "dwOne": ((w1Prev - w1New) / alpha).toFixed(DIGITS).toString(),
            "dwTwo": ((w2Prev - w2New) / alpha).toFixed(DIGITS).toString(),
            "dB": ((bPrev - bNew) / alpha).toFixed(DIGITS).toString(),
            "wOneNew": w1New.toFixed(DIGITS).toString(),
            "wTwoNew": w2New.toFixed(DIGITS).toString(),
            "bNew": bNew.toFixed(DIGITS).toString()
        })
        step++
    }

    // console.log("Module Answers = \n", answers)
    return answers
    // return []
}

export default function LogisticRegressionStepByStep() {

    const [alpha, setAlpha] = React.useState(0.001)
    // XS (vector of features) = [[x1_1, x1_2], [x2_1, x2_2], ...]
    const [xs, setXS] = React.useState([[0, 0], [0, 0], [0, 0]])
    // CS (vector of classifications) = [c1, c2, c3, c4]
    const [cs, setCS] = React.useState([0, 0, 0])
    // Logistic Regression model
    const [algo, setAlgo] = React.useState(new LogisticRegressionModule(xs, cs, alpha, TOTAL_ITERATIONS))

    function handleXS(sampleId: number, feature1: number, feature2: number) {
        let tmp = xs
        tmp[sampleId] = [feature1, feature2]
        setXS(tmp)
        setAlgo(new LogisticRegressionModule(xs, cs, alpha, TOTAL_ITERATIONS))
    }

    function handleCS(sampleId: number, classification: number) {
        let tmp = cs
        tmp[sampleId] = classification
        setCS(tmp)
        setAlgo(new LogisticRegressionModule(xs, cs, alpha, TOTAL_ITERATIONS))
    }

    function handleAlpha(newAlpha: number) {
        setAlpha(newAlpha)
        setAlgo(new LogisticRegressionModule(xs, cs, alpha, TOTAL_ITERATIONS))
    }

    return (
        <div>
            <Box sx={{ width: "100%" }}>
                <MathJaxContext version={3} config={mathJaxConfig}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, }}>
                        <Grid item xs={12}>
                            <LeftItem>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, }} alignItems={"center"} alignContent={"center"}>
                                    <Grid item xs={4}>
                                        <Typography style={{ width: '100%', color: 'black' }}>
                                            <MathJax style={{ fontSize: "20px" }} inline>
                                                {`$$ 
                                                    \\alpha = 
                                                $$`}
                                            </MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <NumberTextField value={alpha} onChange={event => handleAlpha(Number(event.target.value))} />
                                    </Grid>
                                    <Grid item xs={6} />
                                </Grid>
                            </LeftItem>

                            <LeftItem>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, }} alignItems={"center"} alignContent={"center"}>
                                    <Grid item xs={4}>
                                        <Typography style={{ width: '100%', color: 'black' }}>
                                            <MathJax style={{ fontSize: "20px" }} inline>
                                                {`$$ 
                                                    X_{3x2} = 
                                                    \\begin{bmatrix}
                                                        x_{11} & x_{12} \\\\
                                                        x_{21} & x_{22} \\\\
                                                        x_{31} & x_{32} \\\\
                                                    \\end{bmatrix} 
                                                    =
                                                $$`}
                                            </MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Grid item xs={12}>
                                            <TextField value={xs[0][0]} label="x11" type="number" size="small" onChange={event => handleXS(0, Number(event.target.value), xs[0][1])} sx={{ width: "100%" }} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField value={xs[1][0]} label="x21" type="number" size="small" onChange={event => handleXS(1, Number(event.target.value), xs[1][1])} sx={{ width: "100%" }} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField value={xs[2][0]} label="x31" type="number" size="small" onChange={event => handleXS(2, Number(event.target.value), xs[2][1])} sx={{ width: "100%" }} />
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={2}>
                                        <Grid item xs={12}>
                                            <TextField value={xs[0][1]} label="x12" type="number" size="small" onChange={event => handleXS(0, xs[0][0], Number(event.target.value))} sx={{ width: "100%" }} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField value={xs[1][1]} label="x22" type="number" size="small" onChange={event => handleXS(1, xs[1][0], Number(event.target.value))} sx={{ width: "100%" }} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField value={xs[2][1]} label="x32" type="number" size="small" onChange={event => handleXS(2, xs[2][0], Number(event.target.value))} sx={{ width: "100%" }} />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={4} />
                                </Grid>
                            </LeftItem>

                            <LeftItem>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, }} alignItems={"center"} alignContent={"center"}>
                                    <Grid item xs={4}>
                                        <Typography style={{ width: '100%', color: 'black' }}>
                                            <MathJax style={{ fontSize: "20px" }} inline>
                                                {`$$ 
                                                    C_{1x3} = 
                                                    \\begin{bmatrix}
                                                        c_{11} & c_{12} & c_{13} \\\\
                                                    \\end{bmatrix} 
                                                    =
                                                $$`}
                                            </MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <TextField value={cs[0]} label="1st Classification" type="number" size="small" onChange={event => handleCS(0, Number(event.target.value))} />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <TextField value={cs[1]} label="2nd Classification" type="number" size="small" onChange={event => handleCS(1, Number(event.target.value))} />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <TextField value={cs[2]} label="3rd Classification" type="number" size="small" onChange={event => handleCS(2, Number(event.target.value))} />
                                    </Grid>
                                    <Grid item xs={2} />
                                </Grid>
                            </LeftItem>
                        </Grid>

                        <Grid item xs={12}>
                            <CenterItem>
                                <Box sx={{ width: "100%", textAlign: 'center', direction: 'ltr' }}>
                                    <QuestionTable
                                        headers={getLogisticRegressionDataColumnNames()}
                                        exampleEnabled={true}
                                        correctAnswers={getDataAnswers(xs, cs, algo)}
                                        comparator={(res, ans) => Number(ans) === Number(res)}
                                    />
                                    <Box sx={{ width: "100%", textAlign: 'center', direction: 'ltr' }} id='graph-board' />
                                </Box>
                            </CenterItem>
                        </Grid>
                        <Grid item xs={12}>
                            <CenterItem>
                                <Box sx={{ width: "100%", textAlign: 'center', direction: 'ltr' }}>
                                    <QuestionTable
                                        headers={getLogisticRegressionModuleInfoColumns()}
                                        exampleEnabled={true}
                                        correctAnswers={getModuleAnswers(alpha, algo)}
                                        comparator={(res, ans) => Number(ans) === Number(res)}
                                    />
                                    <Box sx={{ width: "100%", textAlign: 'center', direction: 'ltr' }} id='graph-board' />
                                </Box>
                            </CenterItem>
                        </Grid>
                    </Grid>
                </MathJaxContext>
            </Box>
        </div>
    );
}
