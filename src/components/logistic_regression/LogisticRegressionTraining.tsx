import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { mathJaxConfig, mathJaxStyle } from 'components/LanguageAndButtonUtility';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { useTranslation } from "react-i18next";
import { TextField } from '@mui/material';
import {LogisticRegressionModule, sigmoid} from 'components/logistic_regression/LogisticRegressionCore';
import Grid from "@mui/material/Grid";


export default function LogisticRegressionTraining() {
    const tab = <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    const headers_style = {fontFamily: 'Arial, Helvetica, sans-serif'}
    const [t] = useTranslation('translation');

    const [c_1, setC1] = React.useState(0);
    const [c_2, setC2] = React.useState(0);
    const [x_11, setX11] = React.useState(0);
    const [x_12, setX12] = React.useState(0);
    const [x_21, setX21] = React.useState(0);
    const [x_22, setX22] = React.useState(0);
    const [a, setAlpha] = React.useState(0.01);
    const [module, setModule] = React.useState(
        new LogisticRegressionModule(
            [[x_11, x_12],[x_21, x_22]],
            [c_1, c_2],
            a,
            1
        )
    );

    function updateModule() {
        setModule(new LogisticRegressionModule([[x_11, x_12],[x_21, x_22]], [c_1, c_2], a, 1))
    }
    return (
        <Box sx={{ width: '100%' }}>
            <MathJaxContext version={3} config={mathJaxConfig}>
                <Typography component={'span'}>
                    <Typography sx={{ width: "100%", textAlign: 'center', direction: 'ltr'}}>
                        <h1 style={headers_style}>Logistic Regression Training</h1>
                    </Typography>
                    So far we have learned how the logistic regression classifies an input (with either with 1 feature or more),
                    In this page we will now learn how we build such model, in other words we will learn how we find the best weights and b to have the highest accuracy!
                </Typography>
                <br/>
                <br/>
                <Typography component={'div'}>
                    <br/>
                    <h3 style={headers_style}>
                        First what is a Logistic Regression Model? <br/>
                    </h3>
                    <Typography component={'span'} sx={{ width: "100%", direction: 'ltr'}}>
                        A logistic regression model donated by <MathJax style={mathJaxStyle} inline>{"\\(M({\\vec{w}}_{1xn}, b) \\)"}</MathJax> where:<br/>
                        <MathJax style={mathJaxStyle} inline>{"\\(\\vec{w}_{1xn}\\)"}</MathJax> - is the vector of weights.<br/>
                        <MathJax style={mathJaxStyle} inline>{"\\(b\\)"}</MathJax> - is the constant.<br/>
                    </Typography>
                    <br/>
                    <h3 style={headers_style}>
                        First of all how we can measure an accuracy of such model?<br/>
                    </h3>
                    <Typography component={'span'} sx={{ width: "100%", direction: 'ltr'}}>
                        Answer: Cost Function (or Loss Function)<br/>
                        Which is a function that represents the error of our calculations.<br/>
                        If the returned value of this function is closer to 0 then the model is better and it predicts more correctly.<br/>
                        If the returned value of this function is more distant from 0 then the model is worst and it doesn't predict correctly.<br/>
                        <br/>
                        <h4 style={headers_style}>
                            Consider having:<br/>
                        </h4>
                        1. <MathJax style={mathJaxStyle} inline>{"\\(X_{mxn}\\)"}</MathJax> - Matrix with multiple samples (m). <br/>
                        2. <MathJax style={mathJaxStyle} inline>{"\\(\\vec{w_{1xn}}\\)"}</MathJax> - Vector of weights (n).<br/>
                        3. <MathJax style={mathJaxStyle} inline>{"\\( b \\)"}</MathJax> - Constant.<br/>
                        4. <MathJax style={mathJaxStyle} inline>{"\\(\\vec{C_{1xm}}\\)"}</MathJax> - The actual classifications for each sample (test batch)<br/>
                        <br/>
                        Then we calculate the vector of predictions <MathJax style={mathJaxStyle} inline>{"\\(\\vec{Y_{1xm}}\\)"}</MathJax>.<br/>
                        <MathJax style={mathJaxStyle} inline>{"\\(\\vec{Y_{1xm}} = \\sigma(\\vec{w}*X^{t} + b)\\)"}</MathJax> (like Previously)<br/>
                        <br/>
                        After it we calculate the following Loss Function<br/>
                        <MathJax style={mathJaxStyle} inline>{"\\(Loss = \\frac{-1}{m} * \\sum_{i=1}^{m} ( c_i*log(y_i) + (1-c_i)*log(1-y_i) )\\)"}</MathJax><br/>
                        <MathJax style={mathJaxStyle} inline>{"\\(c_i\\)"}</MathJax> - is the actual classification of the i'th sample.<br/>
                        <MathJax style={mathJaxStyle} inline>{"\\(y_i\\)"}</MathJax> - is the prediction of the i'th sample.<br/>
                        This function returns a number which indicates how good is our model!<br/>
                    </Typography>
                    <br/>
                    <h3 style={headers_style}>
                        What do we mean by train a model?<br/>
                    </h3>
                    <Typography component={'span'} sx={{ width: "100%", direction: 'ltr'}}>
                        When we say train a model we mean that we get a lot of samples which are in form of a table like we have explained above<br/>
                        and we want to search for the best ws and b!<br/>
                        In other words we want to minimize the Loss Function --- Gradiant Descent!!!<br/>
                        <br/>
                        Consider having the same input as above <MathJax style={mathJaxStyle} inline>{"\\(X_{mxn}\\)"}</MathJax> & <MathJax style={mathJaxStyle} inline>{"\\(\\vec{C_{1xm}}\\)"}</MathJax>:<br/>
                        Also we have the hyper-parameter of the Gradiant Descent <MathJax style={mathJaxStyle} inline>{"\\(\\alpha\\)"}</MathJax><br/>
                        <br/>
                        <h4 style={headers_style}>
                            Some Definitions:<br/>
                        </h4>
                        <MathJax style={mathJaxStyle} inline>{"\\(Loss\\)"}</MathJax> - The loss function mentioned above.<br/>
                        <MathJax style={mathJaxStyle} inline>{"\\(dw_i = \\frac{dLoss}{dw_i} = (\\vec{Y}_{1xm} - \\vec{C}_{1xm})*\\vec{X_i}\\)"}</MathJax> -The derivative of the Loss function by i'th weight, X_i is the i'th column of X<br/>
                        <MathJax style={mathJaxStyle} inline>{"\\(dW = \\frac{dLoss}{d\\vec{w}} = (\\vec{Y}_{1xm} - \\vec{C}_{1xm})*X_{mxn}\\)"}</MathJax> -The derivative of the Loss function by the weights<br/>
                        <MathJax style={mathJaxStyle} inline>{"\\(db_i = \\frac{dLoss}{db_i} = y_i - c_i\\)"}</MathJax> -The derivative of the Loss function by the constant b for the i'th sample.<br/>
                        <MathJax style={mathJaxStyle} inline>{"\\(dB = \\sum_{i=1}^{m}\\frac{dLoss}{db_i} = \\sum_{i=1}^{m}(y_i - c_i)\\)"}</MathJax> - The derivative of the Loss function by the constant B on all samples.<br/>
                        <MathJax style={mathJaxStyle} inline>
                                    {`$$
                                    dW = \\frac{dLoss}{d\\vec{w}} =
                                    \\begin{bmatrix}
                                        \\frac{dLoss}{dw_1} \\cdots & \\frac{dLoss}{dw_n}     \\\\
                                    \\end{bmatrix} 
                                    \\ = 
                                    \\begin{bmatrix}
                                        (\\vec{Y}_{1xm} - \\vec{C}_{1xm})*\\vec{X_1} \\cdots & (\\vec{Y}_{1xm} - \\vec{C}_{1xm})*\\vec{X_n}  \\\\
                                    \\end{bmatrix} 
                                    = (\\vec{Y}_{1xm} - \\vec{C}_{1xm})*X_{mxn}
                                    $$`}
                        </MathJax>
                        <br/>
                        <h4 style={headers_style}>
                            Initiate the following variables:<br/>
                        </h4>
                        1. <MathJax style={mathJaxStyle} inline>{"\\(\\vec{w} = [0, 0, ..., 0]_{1xn}\\)"}</MathJax> - vector of weights (entry for each weight).<br/>
                        2. <MathJax style={mathJaxStyle} inline>{"\\(b = 0\\)"}</MathJax> - The constant.<br/>
                        <h4 style={headers_style}>
                            In each step the Gradiant Descent does the following:<br/>
                        </h4>
                        1. Calculate <MathJax style={mathJaxStyle} inline>{"\\(\\vec{Y}_{1xm}\\)"}</MathJax>.<br/>
                        2. Calculate <MathJax style={mathJaxStyle} inline>{"\\(dW\\)"}</MathJax>.<br/>
                        3. Calculate <MathJax style={mathJaxStyle} inline>{"\\(dB\\)"}</MathJax>.<br/>
                        4. Apply <MathJax style={mathJaxStyle} inline>{"\\(\\vec{w}_{new} = \\vec{w} - \\alpha*\\vec{w}^{t}\\)"}</MathJax>.<br/>
                        5. Apply <MathJax style={mathJaxStyle} inline>{"\\(b_{new} = b - \\alpha*dB\\)"}</MathJax>.<br/>
                    </Typography>
                    <br/>
                </Typography>
                <Typography component={'div'}>
                    <h3 style={headers_style}>
                        Let's try with a demo, insert following given data and their classifications:<br/>
                    </h3>
                    <br/>
                    <Grid container>
                        <Grid item xs={1} my={`auto`} />
                        <Grid item xs={3} my={`auto`}>
                            <MathJax style={{ fontSize: "20px" }} inline>
                                {`$$ 
                                    X_{2x2} = 
                                    \\begin{bmatrix}
                                        x_{11} & x_{21} \\\\
                                        x_{12} & x_{22} \\\\
                                    \\end{bmatrix} 
                                    =
                                $$`}
                            </MathJax>
                        </Grid>
                        <Grid item xs={4} my={`auto`} />
                        <Grid item xs={2} my={`auto`}>
                            <TextField label="x11" type="number" size="small" onChange={event => {
                                setX11(Number(event.target.value)); updateModule()
                            }} sx={{ width: "100%" }} />
                            <TextField label="x21" type="number" size="small" onChange={event => {
                                setX21(Number(event.target.value)); updateModule()
                            }} sx={{ width: "100%" }} />
                        </Grid>
                        <Grid item xs={2} my={`auto`}>
                            <TextField label="x12" type="number" size="small" onChange={event => {
                                setX12(Number(event.target.value)); updateModule()
                            }} sx={{ width: "100%" }} />
                            <TextField label="x22" type="number" size="small" onChange={event => {
                                setX22(Number(event.target.value)); updateModule()
                            }} sx={{ width: "100%" }} />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={8} my={`auto`}>
                            <MathJax style={{ fontSize: "20px" }} inline>
                                {`$$ 
                                    C_{1x2} = 
                                    \\begin{bmatrix}
                                        classification_1 & classification_2 \\\\
                                    \\end{bmatrix} 
                                    =
                                $$`}
                            </MathJax>
                        </Grid>
                        <Grid item xs={2} my={`auto`}>
                            <TextField label="classification 1" type="number" size="small" onChange={event => {
                                setC1(Number(event.target.value)); updateModule()
                            }} sx={{ width: "100%" }} />
                        </Grid>
                        <Grid item xs={2} my={`auto`}>
                            <TextField label="classification 2" type="number" size="small" onChange={event => {
                                setC2(Number(event.target.value)); updateModule()
                            }} sx={{ width: "100%" }} />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={1} my={`auto`}/>
                        <Grid item xs={3} my={`auto`}>
                            <MathJax style={mathJaxStyle} inline>{"\\(\\alpha = \\)"}</MathJax>
                        </Grid>
                        <Grid item xs={4} my={`auto`}/>
                        <Grid item xs={2} my={`auto`}>
                            <TextField value={a} type="number" size="small" onChange={event => {
                                setAlpha(Number(event.target.value)); updateModule()
                            }} sx={{ width: "100%" }} />
                        </Grid>
                        <Grid item xs={2} my={`auto`}/>
                    </Grid>
                    <br/>
                </Typography>
                <br/>
                <Typography component={'span'} sx={{ width: "100%", direction: 'ltr'}}>
                    <h4 style={headers_style}>
                        The Algorithm will initiate the following data:<br/>
                    </h4>
                    <MathJax style={mathJaxStyle} inline>{"\\(\\vec{w}_{1x2} = [ 0, 0 ]\\)"}</MathJax><br/>
                    <MathJax style={mathJaxStyle} inline>{"\\(b = 0\\)"}</MathJax><br/>
                </Typography>
                <br/>
                <Typography component={'span'} sx={{ width: "100%", direction: 'ltr'}}>
                    <h4 style={headers_style}>
                        The results of the 1st iteration are:<br/>
                    </h4>
                    <MathJax style={mathJaxStyle} inline>{"\\(\\vec{Y}_{1x2} = \\)"}</MathJax>{"[" + module.predict([x_11, x_12]).toString() + ", " + module.predict([x_21, x_22]).toString() + " ]"}<br/>
                    <MathJax style={mathJaxStyle} inline>{"\\(\\vec{w}_{new} = \\)"}</MathJax>{module.getWs()[0].toString()}<br/>
                    <MathJax style={mathJaxStyle} inline>{"\\(b_{new} = \\)"}</MathJax>{module.getBs()[0].toString()}<br/>
                    <MathJax style={mathJaxStyle} inline>{"\\(Loss = \\)"}</MathJax>{module.getCosts()[0].toString()}<br/>
                </Typography>
                <br/>
                <Typography component={'span'} sx={{ width: "100%", direction: 'ltr'}}>
                    <h4 style={headers_style}>
                        The final results:<br/>
                    </h4>
                    <MathJax style={mathJaxStyle} inline>{"\\(\\vec{w}_{1x2} = \\)"}</MathJax>{module.getModule().W.toString()}<br/>
                    <MathJax style={mathJaxStyle} inline>{"\\(b = \\)"}</MathJax>{module.getModule().B.toString()}<br/>
                </Typography>
            </MathJaxContext>
        </Box>
    );
}
