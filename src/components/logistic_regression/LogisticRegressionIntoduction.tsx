import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { mathJaxConfig, mathJaxStyle } from 'components/LanguageAndButtonUtility';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import {useTranslation} from "react-i18next";
import { TextField } from '@mui/material';
import LogisticRegressionPlot from 'components/logistic_regression/LogisticRegressionPlot';
import { sigmoid } from 'components/logistic_regression/LogisticRegression';


export default function LogisticRegressionIntoduction() {
    const tab = <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    const headers_style = {fontFamily: 'Arial, Helvetica, sans-serif'}
    const [t] = useTranslation('translation');

    const [w_1, setW1] = React.useState(0);
    const [x_1, setX1] = React.useState(0);
    const [b, setB] = React.useState(0);

    return (
        <Box sx={{ width: '100%' }}>
            <MathJaxContext version={3} config={mathJaxConfig}>
                <Typography component={'span'}>
                    <Typography sx={{ width: "100%", textAlign: 'center', direction: 'ltr'}}>
                        <h1 style={headers_style}>Logistic Regression</h1>
                    </Typography>
                    <br/>
                    {t("logreg.description")}
                    <br/>
                    <br/>
                    Logistic regression is a classification algorithm. The parameters for this classifier are the weights 
                    (<MathJax style={mathJaxStyle} inline>{"\\( w_1, w_2, w_3, ..., w_n \\)"}</MathJax>)
                     and a number 
                    (<MathJax style={mathJaxStyle} inline>{"\\( b \\)"}</MathJax>).
                    <br/>
                    The input for the classifier is an object with a vector of features 
                    (<MathJax style={mathJaxStyle} inline>{"\\( x_1, x_2, x_3, ..., x_n \\)"}</MathJax>)
                    <br/>
                    <br/>
                    The classifier calculates <MathJax style={mathJaxStyle} inline>{"\\( y \\)"}</MathJax>, which is the probability that the object belongs to the class "1" using the following calcultaion:
                    <br/>
                    <br/>
                    {tab}{tab}<MathJax style={mathJaxStyle} inline>{"\\(y = \\sigma(w_1 * x_1 + w_2 * x_2 + w_3 * x_3 + ... + w_n * x_n + b)\\)"}</MathJax>
                    <br/>
                    {tab}{tab}Where the Sigmoid function <MathJax style={mathJaxStyle} inline>{"\\(\\sigma\\)"}</MathJax> is defined as :
                    <br/>
                    {tab}{tab}<MathJax style={mathJaxStyle} inline>{"\\(\\sigma(z) = \\frac{1}{1 + e^{-z}}\\)"}</MathJax>
                    <br/>
                    <br/>
                    The classifier will then predict that the class of the object is "1" if <MathJax style={mathJaxStyle} inline>{"\\( y > 0.5 \\)"}</MathJax>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    Let's try to understand this even more with a demo, choose your weight and bias and test different values for x :
                    <br/>
                    <br/>
                    <MathJax style={{fontSize:"30px"}} inline>{"\\(\\sigma (\\)"}</MathJax>
                    <TextField label="w1" type="number" onChange={event => setW1(Number(event.target.value))} sx={{width: 100}}/> * 
                    <TextField label="x1" type="number" onChange={event => setX1(Number(event.target.value))} sx={{width: 100}}/> + 
                    <TextField label="b"  type="number" onChange={event => setB(Number(event.target.value))}  sx={{width: 100}}/>
                    <MathJax style={{fontSize:"30px"}} inline >{"\\() = \\)"}</MathJax>
                    <MathJax style={{fontSize:"30px"}} inline >{sigmoid(w_1 * x_1 + b).toString()}</MathJax>
                    <br/>
                    <br/>
                    Now let's see the function of the classifier as defined by the weight and bias :
                    <br/>
                    <br/>
                    <LogisticRegressionPlot w1={w_1} x1={x_1} b={b} />
                </Typography>
                {/* <Typography component={'span'}>
                    <br/>
                    <h4 style={headers_style}>{}</h4><br/>
                    {}
                    <br/><br/>
                    {tab}<h4 style={headers_style}>{}</h4><br/>
                    {tab}{tab}<MathJax style={mathJaxStyle} inline>{"\\(x\\)"}</MathJax> - {t("gd.point_vals.x_val")}<br/><br/>
                    {tab}{tab}<MathJax style={mathJaxStyle} inline>{"\\(f(x)\\)"}</MathJax> - {t("gd.point_vals.y_val")}<br/><br/>
                    {tab}{tab}<MathJax style={mathJaxStyle} inline>{"\\(\\frac{df}{dx}\\)"}</MathJax> - {t("gd.derivatives.description")}<br/><br/>
                    {tab}{tab}<MathJax style={mathJaxStyle} inline>{"\\(\\frac{df}{dx}(x)\\)"}</MathJax> - {t("gd.derivatives.derivative_val_x")}<br/><br/>
                    {tab}{tab}<MathJax style={mathJaxStyle} inline>{"\\(\\alpha\\)"}</MathJax> - {t("gd.hyperparameter")}<br/><br/>
                    {tab}{tab}<MathJax style={mathJaxStyle} inline>{"\\(x_{new}\\)"}</MathJax>  - {t("gd.point_vals.x_val_new")}<br/><br/>
                    <br/><br/>
                    {tab}<h4 style={headers_style}>{t("gd.foreach_step")}</h4><br/>
                    {tab}{tab}1. {t("gd.calc")} <MathJax style={mathJaxStyle} inline>{"\\(\\frac{df}{dx}(x)\\)"}</MathJax><br/><br/>
                    {tab}{tab}2. {t("gd.apply")} <MathJax style={mathJaxStyle} inline>{"\\(x_{new} = x - (\\alpha * \\frac{df}{dx}(x))\\)"}</MathJax><br/><br/>
                    {tab}{tab}3. {t("gd.apply")} <MathJax style={mathJaxStyle} inline>{"\\(x = x_{new}\\)"}</MathJax><br/><br/>
                </Typography> */}
            </MathJaxContext>
        </Box>
    );
}
