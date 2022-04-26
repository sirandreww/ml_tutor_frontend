import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { mathJaxConfig, mathJaxStyle } from 'components/LanguageAndButtonUtility';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { useTranslation } from "react-i18next";
import { TextField } from '@mui/material';
import Grid from "@mui/material/Grid";
import { sigmoid } from 'components/logistic_regression/LogisticRegressionCore';


export default function LogisticRegressionMultiInputs() {
    function getPrediction(x: number): number {
        if (x > 0.5)
            return 1;
        else
            return 0;
    }

    function calculateOneOutput(input_number: number): number {
        switch (input_number) {
            case 1:
                return (w_1 * x_11 + w_2 * x_12 + w_3 * x_13)
            case 2:
                return (w_1 * x_21 + w_2 * x_22 + w_3 * x_23)
            case 3:
                return (w_1 * x_31 + w_2 * x_32 + w_3 * x_33)
            default:
                return 0
        }
    }

    function addConstant(input_number: number, c: number): number {
        return calculateOneOutput(input_number) + c
    }
    const tab = <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    const headers_style = { fontFamily: 'Arial, Helvetica, sans-serif' }
    const [t] = useTranslation('translation');

    const [w_1, setW1] = React.useState(0);
    const [w_2, setW2] = React.useState(0);
    const [w_3, setW3] = React.useState(0);
    const [x_11, setX11] = React.useState(0);
    const [x_12, setX12] = React.useState(0);
    const [x_13, setX13] = React.useState(0);
    const [x_21, setX21] = React.useState(0);
    const [x_22, setX22] = React.useState(0);
    const [x_23, setX23] = React.useState(0);
    const [x_31, setX31] = React.useState(0);
    const [x_32, setX32] = React.useState(0);
    const [x_33, setX33] = React.useState(0);
    const [b, setB] = React.useState(0);

    return (
        <Box sx={{ width: '100%' }}>
            <MathJaxContext version={3} config={mathJaxConfig}>
                <Typography component={'div'}>
                    <Typography sx={{ width: "100%", textAlign: 'center', direction: 'ltr' }}>
                        <h1 style={headers_style}>Logistic Regression With Multiple Inputs</h1>
                    </Typography>
                    <br />
                    <br />
                    <br />
                    So far we have learned how the logistic regression classifies an input (with either with 1 feature or more),
                    In this page we will now learn how we can classifies multiple inputs in one time! <br />
                    In other words we can transform multiple input vectors <MathJax style={mathJaxStyle} inline>{"\\(\\vec{x_i} \\)"}</MathJax> to
                    one huge matrix <MathJax style={mathJaxStyle} inline>{"\\(X_{mxn}\\)"}</MathJax> which holds all the data (rows are the samples and columns are the feature for each sample),
                    then apply the sigmoid function on it and returns a vector <MathJax style={mathJaxStyle} inline>{"\\(\\vec{Y_{1xm}}\\)"}</MathJax>  of predictions for each input.<br />
                    {tab}<MathJax style={{ fontSize: "13px" }} inline>{"\\( m \\)"}</MathJax> = the number of samples.<br />
                    {tab}<MathJax style={{ fontSize: "13px" }} inline>{"\\( n \\)"}</MathJax> = the number of features.<br />
                    <br />
                    <br />
                    In this page we will have 3 samples which represents a color's RGB values, <br />
                    and we want to predict if the color is blue or not ( m = 3, n = 3) - <br />
                </Typography>
                <br />
                <Typography component={'div'}>
                    {tab}Vector of weights (weight for each feature):
                    <br />
                    <Typography component={'div'} sx={{ fontSize: "13px" }}>
                        {tab}{tab}<MathJax style={{ fontSize: "20px" }} inline>{"\\(\\vec{w} = \\)"}</MathJax>
                        <MathJax style={{ fontSize: "20px" }} inline>{"\\([ w_1, w_2, w_3 ] = \\)"}</MathJax>
                        <TextField label="red" type="number" size="small" onChange={event => setW1(Number(event.target.value))} sx={{ width: 100 }} />
                        <TextField label="green" type="number" size="small" onChange={event => setW2(Number(event.target.value))} sx={{ width: 100 }} />
                        <TextField label="blue" type="number" size="small" onChange={event => setW3(Number(event.target.value))} sx={{ width: 100 }} />
                    </Typography>
                    <br />
                    {tab}The Constant value:
                    <br />
                    <Typography component={'div'} sx={{ fontSize: "13px" }}>
                        {tab}{tab}<MathJax style={{ fontSize: "20px" }} inline>{"\\(b = \\)"}</MathJax>
                        <TextField label="b" type="number" size="small" onChange={event => setB(Number(event.target.value))} sx={{ width: 100 }} />
                    </Typography>
                    <br />
                    {tab}The data will be present in a matrix like this:
                    <br />
                    <Grid container>
                        <Grid item xs={6} my={`auto`}>
                            <MathJax style={{ fontSize: "20px" }} inline>
                                {`$$ 
                                        X_{3x3} = 
                                        \\begin{bmatrix}
                                            x_{11} & x_{12} & x_{13} & \\\\
                                            x_{21} & x_{22} & x_{23} & \\\\
                                            x_{31} & x_{32} & x_{33} & \\\\
                                        \\end{bmatrix} 
                                        =
                                    $$`}
                            </MathJax>
                        </Grid>
                        <Grid item xs={2} my={`auto`}>
                            <TextField label="x1_red" type="number" size="small" onChange={event => setX11(Number(event.target.value))} sx={{ width: "100%" }} />
                            <TextField label="x1_green" type="number" size="small" onChange={event => setX12(Number(event.target.value))} sx={{ width: "100%" }} />
                            <TextField label="x1_blue" type="number" size="small" onChange={event => setX13(Number(event.target.value))} sx={{ width: "100%" }} />
                        </Grid>
                        <Grid item xs={2} my={`auto`}>
                            <TextField label="x2_red" type="number" size="small" onChange={event => setX21(Number(event.target.value))} sx={{ width: "100%" }} />
                            <TextField label="x2_green" type="number" size="small" onChange={event => setX22(Number(event.target.value))} sx={{ width: "100%" }} />
                            <TextField label="x2_blue" type="number" size="small" onChange={event => setX23(Number(event.target.value))} sx={{ width: "100%" }} />
                        </Grid>
                        <Grid item xs={2} my={`auto`}>
                            <TextField label="x3_red" type="number" size="small" onChange={event => setX31(Number(event.target.value))} sx={{ width: "100%" }} />
                            <TextField label="x3_green" type="number" size="small" onChange={event => setX32(Number(event.target.value))} sx={{ width: "100%" }} />
                            <TextField label="x3_blue" type="number" size="small" onChange={event => setX33(Number(event.target.value))} sx={{ width: "100%" }} />
                        </Grid>
                    </Grid>
                </Typography>
                <br />
                <Typography component={'div'}>
                    The calculation of the sigmoid on this huge matrix is done as follows:<br />
                    1. Calculate <MathJax style={{ fontSize: "13px" }} inline>{"\\(X^t\\)"}</MathJax> - <br />
                    <Grid container>
                        <Grid item xs={6} my={`auto`}>
                            <MathJax style={{ fontSize: "20px" }} inline>
                                {`$$ 
                                X^{t}_{3x3} = 
                                \\begin{bmatrix}
                                    x_{11} & x_{21} & x_{31} & \\\\
                                    x_{12} & x_{22} & x_{32} & \\\\
                                    x_{13} & x_{23} & x_{33} & \\\\
                                \\end{bmatrix} 
                                =
                            $$`}
                            </MathJax>
                        </Grid>
                        <Grid item xs={2} my={`auto`}>
                            <TextField value={x_11} type="number" size="small" inputProps={{ readOnly: true, }} />
                            <TextField value={x_21} type="number" size="small" inputProps={{ readOnly: true, }} />
                            <TextField value={x_31} type="number" size="small" inputProps={{ readOnly: true, }} />
                        </Grid>
                        <Grid item xs={2} my={`auto`}>
                            <TextField value={x_12} type="number" size="small" inputProps={{ readOnly: true, }} />
                            <TextField value={x_22} type="number" size="small" inputProps={{ readOnly: true, }} />
                            <TextField value={x_32} type="number" size="small" inputProps={{ readOnly: true, }} />
                        </Grid>
                        <Grid item xs={2} my={`auto`}>
                            <TextField value={x_13} type="number" size="small" inputProps={{ readOnly: true, }} />
                            <TextField value={x_23} type="number" size="small" inputProps={{ readOnly: true, }} />
                            <TextField value={x_33} type="number" size="small" inputProps={{ readOnly: true, }} />
                        </Grid>
                    </Grid>
                    2. Calculate <MathJax style={{ fontSize: "13px" }} inline>{"\\(\\vec{yt} = \\vec{w} \\cdot X^t\\)"}</MathJax> -
                    <Grid container>
                        <Grid item xs={6} my={`auto`}>
                            <MathJax style={{ fontSize: "20px" }} inline>
                                {`$$ 
                                \\vec{yt} = \\vec{w} \\cdot X^{t}_{3x3} = 
                                \\begin{bmatrix}
                                    yt_{11} & yt_{12} & yt_{13} & \\\\
                                \\end{bmatrix} 
                                =
                            $$`}
                            </MathJax>
                        </Grid>
                        <Grid item xs={2} my={`auto`}>
                            <TextField value={calculateOneOutput(1)} type="number" size="small" inputProps={{ readOnly: true, }} />
                        </Grid>
                        <Grid item xs={2} my={`auto`}>
                            <TextField value={calculateOneOutput(2)} type="number" size="small" inputProps={{ readOnly: true, }} />
                        </Grid>
                        <Grid item xs={2} my={`auto`}>
                            <TextField value={calculateOneOutput(3)} type="number" size="small" inputProps={{ readOnly: true, }} />
                        </Grid>
                    </Grid>
                    3. Add the constant <MathJax style={{ fontSize: "13px" }} inline>{"\\(b\\)"}</MathJax> to each entry of the result vector - <br />
                    <Grid container>
                        <Grid item xs={6} my={`auto`}>
                            <MathJax style={{ fontSize: "20px" }} inline>
                                {`$$ 
                                \\vec{yt} + b = 
                                \\begin{bmatrix}
                                    yt_{11}+b & yt_{12}+b & yt_{13}+b & \\\\
                                \\end{bmatrix} 
                                =
                            $$`}
                            </MathJax>
                        </Grid>
                        <Grid item xs={2} my={`auto`}>
                            <TextField value={addConstant(1, b)} type="number" size="small" inputProps={{ readOnly: true, }} />
                        </Grid>
                        <Grid item xs={2} my={`auto`}>
                            <TextField value={addConstant(2, b)} type="number" size="small" inputProps={{ readOnly: true, }} />
                        </Grid>
                        <Grid item xs={2} my={`auto`}>
                            <TextField value={addConstant(3, b)} type="number" size="small" inputProps={{ readOnly: true, }} />
                        </Grid>
                    </Grid>
                    4. Apply the <MathJax style={{ fontSize: "13px" }} inline>{"\\(\\sigma\\)"}</MathJax> function on each entry of the previous vector - <br />
                    <Grid container>
                        <Grid item xs={3} my={`auto`}>
                            <MathJax style={mathJaxStyle} inline>{"\\(\\sigma(\\vec{yt} + b)\\)"}</MathJax>
                        </Grid>
                        <Grid item xs={3} my={`auto`}>
                            <TextField value={sigmoid(addConstant(1, b))} type="number" size="small" inputProps={{ readOnly: true, }} />
                        </Grid>
                        <Grid item xs={3} my={`auto`}>
                            <TextField value={sigmoid(addConstant(2, b))} type="number" size="small" inputProps={{ readOnly: true, }} />
                        </Grid>
                        <Grid item xs={3} my={`auto`}>
                            <TextField value={sigmoid(addConstant(3, b))} type="number" size="small" inputProps={{ readOnly: true, }} />
                        </Grid>
                    </Grid>
                    5. Get <MathJax style={{ fontSize: "13px" }} inline>{"\\(\\vec{Y_{1x3}}\\)"}</MathJax> by checking if <MathJax style={{ fontSize: "13px" }} inline>{"\\(y_i > 0.5\\)"}</MathJax> or not- <br />
                    <Grid container>
                        <Grid item xs={3}>
                            <MathJax style={mathJaxStyle} inline>{"\\(\\vec{Y_{1x3}} = \\)"}</MathJax>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField value={getPrediction(sigmoid(addConstant(1, b)))} type="number" size="small" inputProps={{ readOnly: true, }} />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField value={getPrediction(sigmoid(addConstant(2, b)))} type="number" size="small" inputProps={{ readOnly: true, }} />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField value={getPrediction(sigmoid(addConstant(3, b)))} type="number" size="small" inputProps={{ readOnly: true, }} />
                        </Grid>
                    </Grid>
                </Typography>
                <br />
                <br />
            </MathJaxContext>
        </Box>
    );
}
