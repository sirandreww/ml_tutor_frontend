import React from 'react';
import Typography from '@mui/material/Typography';
import { PrettoSlider } from "../gradient_descent/GradientDescentHelper";
import NumberTextField from "../NumberTextField";
import { TextField } from "@mui/material";
import { button, CenterItem, LeftItem, BlackAlignedItem, mathJaxConfig, mathJaxStyle } from "../LanguageAndButtonUtility";
import Box from "@mui/material/Box";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import Grid from "@mui/material/Grid";
import { LogisticRegressionModule, Matrix, math } from "./LogisticRegressionCore";
import {useTranslation} from "react-i18next";

const iris_setosa: number[][] = [
    [5.1, 3.5, 1.4, 0.2],
    [4.9, 3.0, 1.4, 0.2],
    [4.7, 3.2, 1.3, 0.2],
    [4.6, 3.1, 1.5, 0.2],
    [5.0, 3.6, 1.4, 0.2],
    [5.4, 3.9, 1.7, 0.4],
    [4.6, 3.4, 1.4, 0.3],
    [5.0, 3.4, 1.5, 0.2],
    [4.4, 2.9, 1.4, 0.2],
    [4.9, 3.1, 1.5, 0.1],
    [5.4, 3.7, 1.5, 0.2],
    [4.8, 3.4, 1.6, 0.2],
    [4.8, 3.0, 1.4, 0.1],
    [4.3, 3.0, 1.1, 0.1],
    [5.8, 4.0, 1.2, 0.2],
    [5.7, 4.4, 1.5, 0.4],
    [5.4, 3.9, 1.3, 0.4],
    [5.1, 3.5, 1.4, 0.3],
    [5.7, 3.8, 1.7, 0.3],
    [5.1, 3.8, 1.5, 0.3],
    [5.4, 3.4, 1.7, 0.2],
    [5.1, 3.7, 1.5, 0.4],
    [4.6, 3.6, 1.0, 0.2],
    [5.1, 3.3, 1.7, 0.5],
    [4.8, 3.4, 1.9, 0.2],
    [5.0, 3.0, 1.6, 0.2],
    [5.0, 3.4, 1.6, 0.4],
    [5.2, 3.5, 1.5, 0.2],
    [5.2, 3.4, 1.4, 0.2],
    [4.7, 3.2, 1.6, 0.2],
    [4.8, 3.1, 1.6, 0.2],
    [5.4, 3.4, 1.5, 0.4],
    [5.2, 4.1, 1.5, 0.1],
    [5.5, 4.2, 1.4, 0.2],
    [4.9, 3.1, 1.5, 0.1],
    [5.0, 3.2, 1.2, 0.2],
    [5.5, 3.5, 1.3, 0.2],
    [4.9, 3.1, 1.5, 0.1],
    [4.4, 3.0, 1.3, 0.2],
    [5.1, 3.4, 1.5, 0.2],
    [5.0, 3.5, 1.3, 0.3],
    [4.5, 2.3, 1.3, 0.3],
    [4.4, 3.2, 1.3, 0.2],
    [5.0, 3.5, 1.6, 0.6],
    [5.1, 3.8, 1.9, 0.4],
    [4.8, 3.0, 1.4, 0.3],
    [5.1, 3.8, 1.6, 0.2],
    [4.6, 3.2, 1.4, 0.2],
    [5.3, 3.7, 1.5, 0.2],
    [5.0, 3.3, 1.4, 0.2]
]
const iris_setosa_train: number[] = [
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1
]

const iris_versicolor: number[][] = [
    [7.0, 3.2, 4.7, 1.4],
    [6.4, 3.2, 4.5, 1.5],
    [6.9, 3.1, 4.9, 1.5],
    [5.5, 2.3, 4.0, 1.3],
    [6.5, 2.8, 4.6, 1.5],
    [5.7, 2.8, 4.5, 1.3],
    [6.3, 3.3, 4.7, 1.6],
    [4.9, 2.4, 3.3, 1.0],
    [6.6, 2.9, 4.6, 1.3],
    [5.2, 2.7, 3.9, 1.4],
    [5.0, 2.0, 3.5, 1.0],
    [5.9, 3.0, 4.2, 1.5],
    [6.0, 2.2, 4.0, 1.0],
    [6.1, 2.9, 4.7, 1.4],
    [5.6, 2.9, 3.6, 1.3],
    [6.7, 3.1, 4.4, 1.4],
    [5.6, 3.0, 4.5, 1.5],
    [5.8, 2.7, 4.1, 1.0],
    [6.2, 2.2, 4.5, 1.5],
    [5.6, 2.5, 3.9, 1.1],
    [5.9, 3.2, 4.8, 1.8],
    [6.1, 2.8, 4.0, 1.3],
    [6.3, 2.5, 4.9, 1.5],
    [6.1, 2.8, 4.7, 1.2],
    [6.4, 2.9, 4.3, 1.3],
    [6.6, 3.0, 4.4, 1.4],
    [6.8, 2.8, 4.8, 1.4],
    [6.7, 3.0, 5.0, 1.7],
    [6.0, 2.9, 4.5, 1.5],
    [5.7, 2.6, 3.5, 1.0],
    [5.5, 2.4, 3.8, 1.1],
    [5.5, 2.4, 3.7, 1.0],
    [5.8, 2.7, 3.9, 1.2],
    [6.0, 2.7, 5.1, 1.6],
    [5.4, 3.0, 4.5, 1.5],
    [6.0, 3.4, 4.5, 1.6],
    [6.7, 3.1, 4.7, 1.5],
    [6.3, 2.3, 4.4, 1.3],
    [5.6, 3.0, 4.1, 1.3],
    [5.5, 2.5, 4.0, 1.3],
    [5.5, 2.6, 4.4, 1.2],
    [6.1, 3.0, 4.6, 1.4],
    [5.8, 2.6, 4.0, 1.2],
    [5.0, 2.3, 3.3, 1.0],
    [5.6, 2.7, 4.2, 1.3],
    [5.7, 3.0, 4.2, 1.2],
    [5.7, 2.9, 4.2, 1.3],
    [6.2, 2.9, 4.3, 1.3],
    [5.1, 2.5, 3.0, 1.1],
    [5.7, 2.8, 4.1, 1.3]
]
const iris_versicolor_train: number[] = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
]

const iris_virginica: number[][] = [
    [5.7, 2.8, 4.1, 1.3],
    [6.3, 3.3, 6.0, 2.5],
    [5.8, 2.7, 5.1, 1.9],
    [7.1, 3.0, 5.9, 2.1],
    [6.3, 2.9, 5.6, 1.8],
    [6.5, 3.0, 5.8, 2.2],
    [7.6, 3.0, 6.6, 2.1],
    [4.9, 2.5, 4.5, 1.7],
    [7.3, 2.9, 6.3, 1.8],
    [6.7, 2.5, 5.8, 1.8],
    [7.2, 3.6, 6.1, 2.5],
    [6.5, 3.2, 5.1, 2.0],
    [6.4, 2.7, 5.3, 1.9],
    [6.8, 3.0, 5.5, 2.1],
    [5.7, 2.5, 5.0, 2.0],
    [5.8, 2.8, 5.1, 2.4],
    [6.4, 3.2, 5.3, 2.3],
    [6.5, 3.0, 5.5, 1.8],
    [7.7, 3.8, 6.7, 2.2],
    [7.7, 2.6, 6.9, 2.3],
    [6.0, 2.2, 5.0, 1.5],
    [6.9, 3.2, 5.7, 2.3],
    [5.6, 2.8, 4.9, 2.0],
    [7.7, 2.8, 6.7, 2.0],
    [6.3, 2.7, 4.9, 1.8],
    [6.7, 3.3, 5.7, 2.1],
    [7.2, 3.2, 6.0, 1.8],
    [6.2, 2.8, 4.8, 1.8],
    [6.1, 3.0, 4.9, 1.8],
    [6.4, 2.8, 5.6, 2.1],
    [7.2, 3.0, 5.8, 1.6],
    [7.4, 2.8, 6.1, 1.9],
    [7.9, 3.8, 6.4, 2.0],
    [6.4, 2.8, 5.6, 2.2],
    [6.3, 2.8, 5.1, 1.5],
    [6.1, 2.6, 5.6, 1.4],
    [7.7, 3.0, 6.1, 2.3],
    [6.3, 3.4, 5.6, 2.4],
    [6.4, 3.1, 5.5, 1.8],
    [6.0, 3.0, 4.8, 1.8],
    [6.9, 3.1, 5.4, 2.1],
    [6.7, 3.1, 5.6, 2.4],
    [6.9, 3.1, 5.1, 2.3],
    [5.8, 2.7, 5.1, 1.9],
    [6.8, 3.2, 5.9, 2.3],
    [6.7, 3.3, 5.7, 2.5],
    [6.7, 3.0, 5.2, 2.3],
    [6.3, 2.5, 5.0, 1.9],
    [6.5, 3.0, 5.2, 2.0],
    [6.2, 3.4, 5.4, 2.3],
    [5.9, 3.0, 5.1, 1.8]
]
const iris_virginica_train: number[] = iris_versicolor_train

const TOTAL_NUMBER_OF_SAMPELS = 50

function getClassifications(startAt: number, endAt: number): number[] {
    let classifications = [...iris_setosa_train].slice(startAt, endAt)
    classifications = classifications.concat([...iris_versicolor_train].slice(startAt, endAt))
    classifications = classifications.concat([...iris_virginica_train].slice(startAt, endAt))

    return classifications
}

function getDataBatch(startAt: number, endAt: number): number[][] {
    // console.log("iris_setosa = " + iris_setosa)
    let data = [...iris_setosa].slice(startAt, endAt)
    data = data.concat([...iris_versicolor].slice(startAt, endAt))
    data = data.concat([...iris_virginica].slice(startAt, endAt))
    // console.log("data = ")
    // console.log(data)
    return data
}

function fetchAlgorithms(alpha: number, numOfIterations: number, per: number): [LogisticRegressionModule, number, number] {
    let xs = getDataBatch(0, Math.floor(TOTAL_NUMBER_OF_SAMPELS * per))
    let y = getClassifications(0, Math.floor(TOTAL_NUMBER_OF_SAMPELS * per))
    let txs = getDataBatch(Math.floor(TOTAL_NUMBER_OF_SAMPELS * per) + 1, TOTAL_NUMBER_OF_SAMPELS)
    let ty = getClassifications(Math.floor(TOTAL_NUMBER_OF_SAMPELS * per) + 1, TOTAL_NUMBER_OF_SAMPELS)
    let algo = new LogisticRegressionModule(xs, y, alpha, numOfIterations)
    let acc = algo.getAccuracy(txs, ty)
    let costs = algo.getCosts()
    let loss = costs[costs.length - 1]

    console.log("xs = " + xs)
    console.log("y = " + y)
    console.log("txs = " + txs)
    console.log("ty = " + ty)
    console.log("acc = " + acc)
    console.log("costs = " + costs)
    console.log("loss = " + loss)
    return [algo, acc, loss]
}

function getElement(matrix: Matrix, index: number): string {
    try {
        return matrix.subset((math.index(index))).toString()
    } catch (e) {
        return "0";
    }
}

let alg = new LogisticRegressionModule([], [], 0, 0)
let acc = 0
let loss = 0

const translation_path = "logreg.pages.hp."
export default function LogisticRegressionHyperParameter() {
    const [alpha, setAlpha] = React.useState(0.05)
    const [numOfIterations, setNumOfIterations] = React.useState(10)
    const [dataSetPer, setDataSetPer] = React.useState(0.3)
    const [train, setTrain] = React.useState(false)
    const [test, setTest] = React.useState(false)
    const [moduleInfo, setModuleInfo] = React.useState(alg.getModuleInfo())
    const [t] = useTranslation('translation');

    React.useEffect(() => {
    }, []);

    // For Initial plot when the page loads for the first time
    React.useEffect(() => {

    });

    function handleStates({ al = alpha, itrs = numOfIterations, per = dataSetPer, trn = train, tst = test }) {
        setAlpha(al)
        setNumOfIterations(itrs)
        setDataSetPer(per)
        setTrain(trn)
        setTest(tst)

        if (trn) {
            let tmp = fetchAlgorithms(alpha, numOfIterations, dataSetPer)
            alg = tmp[0]
            acc = tmp[1]
            loss = tmp[2]
            setModuleInfo(alg.getModuleInfo())
            setTest(tst)
        }

        if (tst) {
            setTest(false)
        }
    }

    return (
        <div>
            <Box sx={{ width: "100%" }}>
                <MathJaxContext version={3} config={mathJaxConfig}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, }}>
                        <Grid item xs={12}>
                            <BlackAlignedItem>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, }} alignItems="center">
                                        <Grid item xs={4}>
                                            <Typography style={{ width: '100%', height: '2rem', color: 'black' }}>
                                                {t(translation_path.concat("itr_num"))}:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <NumberTextField value={numOfIterations} onChange={event => handleStates({ itrs: Number(event.target.value) })} />
                                        </Grid>
                                        <Grid item xs={6} />
                                        <Grid item xs={4}>
                                            <Typography style={{ width: '100%', height: '2rem', color: 'black' }}>
                                                <MathJax style={mathJaxStyle} inline>{"\\(\\alpha\\)"}</MathJax>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <PrettoSlider
                                                valueLabelDisplay="auto"
                                                aria-label="pretto slider"
                                                defaultValue={alpha}
                                                step={0.0001}
                                                min={0}
                                                max={0.1}
                                                onChange={(_, value) => handleStates({ al: Number(value), trn: false, tst: false })}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography style={{ width: '100%', height: '2rem', color: 'black' }}>
                                                {t(translation_path.concat("trn_per"))}:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <PrettoSlider
                                                valueLabelDisplay="auto"
                                                aria-label="pretto slider"
                                                defaultValue={dataSetPer}
                                                step={0.05}
                                                min={0}
                                                max={0.95}
                                                onChange={(_, value) => handleStates({ per: Number(value), trn: false, tst: false })}
                                            />
                                        </Grid>
                                </Grid>
                            </BlackAlignedItem>
                        </Grid>
                        <Grid item xs={12}>
                            <CenterItem>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, }} alignItems={"center"}>
                                    <Grid item xs={12}>
                                        <Typography style={{ color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(\\vec{w} = \\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={1} />
                                    <Grid item xs={2}>
                                        <Typography style={{ color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(w_1\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <TextField InputProps={{ readOnly: true }} value={getElement(moduleInfo.module.W, 0)} />
                                    </Grid>
                                    <Grid item xs={1} />
                                    <Grid item xs={2}>
                                        <Typography style={{ color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(w_2\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <TextField InputProps={{ readOnly: true }} value={getElement(moduleInfo.module.W, 1)} />
                                    </Grid>
                                    <Grid item xs={1} />
                                    <Grid item xs={2}>
                                        <Typography style={{ color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(w_3\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <TextField InputProps={{ readOnly: true }} value={getElement(moduleInfo.module.W, 2)} />
                                    </Grid>
                                    <Grid item xs={1} />
                                    <Grid item xs={2}>
                                        <Typography style={{ color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(w_4\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <TextField InputProps={{ readOnly: true }} value={getElement(moduleInfo.module.W, 3)} />
                                    </Grid>
                                    <Grid item xs={12} />
                                    <Grid item xs={3}>
                                        <Typography style={{ color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"b"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <TextField InputProps={{ readOnly: true, }} value={moduleInfo.module.B.toString()} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography style={{ color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{t(translation_path.concat("mdl_acc"))}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={9} sx={{}}>
                                        <TextField InputProps={{ readOnly: true }} value={acc} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography style={{ color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{t(translation_path.concat("mdl_loss"))}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={9} sx={{}}>
                                        <TextField InputProps={{ readOnly: true }} value={loss} />
                                    </Grid>
                                </Grid>
                            </CenterItem>
                        </Grid>

                        <Grid item xs={12}>
                            <CenterItem>
                                <Box sx={{ width: "100%", textAlign: 'center', direction: 'ltr' }}>
                                    {button({ eventHandler: () => handleStates({ trn: false, tst: false }), type: 'stop' })}
                                    {button({ eventHandler: () => handleStates({ trn: true, tst: false }), type: 'train' })}
                                </Box>
                            </CenterItem>
                        </Grid>
                    </Grid>
                </MathJaxContext>
            </Box>
        </div>
    );
}
