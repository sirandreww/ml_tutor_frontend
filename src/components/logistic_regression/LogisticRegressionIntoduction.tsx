import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { mathJaxConfig, mathJaxStyle } from 'components/LanguageAndButtonUtility';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { useTranslation } from "react-i18next";
import { TextField } from '@mui/material';
import LogisticRegressionPlot from 'components/logistic_regression/LogisticRegressionPlot';
import { sigmoid } from 'components/logistic_regression/LogisticRegressionCore';

const translation_path = "logreg.pages.intro"
export default function LogisticRegressionIntoduction() {
    const tab = <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    const headers_style = { fontFamily: 'Arial, Helvetica, sans-serif' }
    const [t] = useTranslation('translation');

    const [w_1, setW1] = React.useState(0);
    const [x_1, setX1] = React.useState(0);
    const [b, setB] = React.useState(0);

    return (
        <Box sx={{ width: '100%' }}>
            <MathJaxContext version={3} config={mathJaxConfig}>
                <Typography component={'span'}>
                    <Typography sx={{ width: "100%", textAlign: 'center', direction: 'ltr' }}>
                        <h1 style={headers_style}>{t("logreg.pages.intro_title")}</h1>
                    </Typography>
                    <br />
                    <br />
                    <br />
                    {t( translation_path.concat(".description"))}<br />
                    <br />
                    {t(translation_path.concat(".weights"))}
                    (<MathJax style={mathJaxStyle} inline>{"\\( w_1, w_2, w_3, ..., w_n \\)"}</MathJax>)
                    {t(translation_path.concat(".num"))}
                    (<MathJax style={mathJaxStyle} inline>{"\\( b \\)"}</MathJax>).<br />
                    {t(translation_path.concat(".vec"))}
                    (<MathJax style={mathJaxStyle} inline>{"\\( x_1, x_2, x_3, ..., x_n \\)"}</MathJax>)<br />
                    <br />
                    {t(translation_path.concat(".y"))} <MathJax style={mathJaxStyle} inline>{"\\( y \\)"}</MathJax>{t(translation_path.concat(".y_def"))}<br />
                    <br />
                    {tab}{tab}<MathJax style={mathJaxStyle} inline>{"\\(y = \\sigma(w_1 * x_1 + w_2 * x_2 + w_3 * x_3 + ... + w_n * x_n + b)\\)"}</MathJax><br />
                    {tab}{tab} {t(translation_path.concat(".sigmoid_fun_def"))} (<MathJax style={mathJaxStyle} inline>{"\\(\\sigma\\)"}</MathJax>):<br />
                    {tab}{tab}<MathJax style={mathJaxStyle} inline>{"\\(\\sigma(z) = \\frac{1}{1 + e^{-z}}\\)"}</MathJax><br />
                    <br />
                    {t(translation_path.concat(".cal_prob"))}<MathJax style={mathJaxStyle} inline>{"\\( y > 0.5 \\)"}</MathJax><br />
                    <br />
                    <br />
                    <br />
                    {t(translation_path.concat(".demo"))}<br />
                    <br />
                    <MathJax style={{ fontSize: "30px" }} inline>{"\\(\\sigma (\\)"}</MathJax>
                    <TextField label="w1" type="number" onChange={event => setW1(Number(event.target.value))} sx={{ width: 100 }} /> *
                    <TextField label="x1" type="number" onChange={event => setX1(Number(event.target.value))} sx={{ width: 100 }} /> +
                    <TextField label="b" type="number" onChange={event => setB(Number(event.target.value))} sx={{ width: 100 }} />
                    <MathJax style={{ fontSize: "30px" }} inline >{"\\() = \\)"}</MathJax>
                    <MathJax style={{ fontSize: "30px" }} inline >{sigmoid(w_1 * x_1 + b).toString()}</MathJax><br />
                    <br />
                    {t(translation_path.concat(".example"))}<br />
                    <br />
                    <Typography sx={{ width: "100%", textAlign: 'center', direction: 'ltr' }}>
                        <MathJax style={{ fontSize: "2em" }} inline>{"\\( \\frac{1}{1 + e^{-(w * x + b)}} \\)"}</MathJax>
                    </Typography>
                    <LogisticRegressionPlot w1={w_1} x1={x_1} b={b} />
                    <br />
                    <br />
                </Typography>
            </MathJaxContext>
        </Box>
    );
}
