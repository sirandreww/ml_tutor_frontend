import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { LeftItem, mathJaxConfig, mathJaxStyle } from 'components/LanguageAndButtonUtility';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { useTranslation } from "react-i18next";
import { TextField } from '@mui/material';
import { sigmoid } from 'components/logistic_regression/LogisticRegressionCore';
import Graph2D from 'components/Graph2D';

const translation_path = "logreg.pages.vec_rep"
export default function LogisticRegressionVectorRepresentation() {
    const tab = <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    const headers_style = { fontFamily: 'Arial, Helvetica, sans-serif' }
    const [t] = useTranslation('translation');

    const [w_1, setW1] = React.useState(0);
    const [w_2, setW2] = React.useState(0);
    // const [w_3, setW3] = React.useState(0);
    const [x_1, setX1] = React.useState(0);
    const [x_2, setX2] = React.useState(0);
    // const [x_3, setX3] = React.useState(0);
    const [b, setB] = React.useState(0);

    return (
        <Box sx={{ width: '100%' }}>
            <MathJaxContext version={3} config={mathJaxConfig}>
                <Typography component={'span'}>
                    <Typography sx={{ width: "100%", textAlign: 'center', direction: 'ltr' }}>
                        <h1 style={headers_style}>{t("logreg.pages.vec_rep_title")}</h1>
                    </Typography>
                    <br />
                    <br />
                    <br />
                    {t(translation_path.concat(".expr"))}
                    (<MathJax style={mathJaxStyle} inline>{"\\(w_1 * x_1 + w_2 * x_2 + w_3 * x_3 + ... + w_n * x_n\\)"}</MathJax>)
                    {t(translation_path.concat(".expr_simple"))} <MathJax style={mathJaxStyle} inline>{"\\(\\vec{x}, \\vec{w}\\)"}</MathJax> :
                    <br />
                    <br />
                    <MathJax style={mathJaxStyle} inline>
                        {`$$
                        \\vec{w} \\cdot \\vec{x} = 
                        \\begin{bmatrix}
                            w_1 & w_2 & w_3 & \\cdots & w_n     \\\\
                        \\end{bmatrix} 
                        \\cdot
                        \\begin{bmatrix}
                            x_1             \\\\ 
                            x_2             \\\\ 
                            x_3             \\\\ 
                            \\vdots         \\\\ 
                            x_n             \\\\ 
                        \\end{bmatrix} 
                        = w_1 * x_1 + w_2 * x_2 + w_3 * x_3 + ... + w_n * x_n
                        $$`}
                    </MathJax>
                    <br />
                    {t(translation_path.concat(".alg_calc"))}<br />
                    {tab}{tab}<MathJax style={mathJaxStyle} inline>{"\\(y = \\sigma(\\vec{w} \\cdot \\vec{x} + b)\\)"}</MathJax><br />
                    {tab}{tab}{t(translation_path.concat(".sig_def"))} (<MathJax style={mathJaxStyle} inline>{"\\(\\sigma\\)"}</MathJax>):<br />
                    {tab}{tab}<MathJax style={mathJaxStyle} inline>{"\\(\\sigma(z) = \\frac{1}{1 + e^{-z}}\\)"}</MathJax><br />
                    {t(translation_path.concat(".y_calc"))} <MathJax style={mathJaxStyle} inline>{"\\( y > 0.5 \\)"}</MathJax><br />
                    <br />
                    <br />
                    {t(translation_path.concat(".demo"))}<br />
                    <br />
                    <LeftItem>
                        <MathJax style={{ fontSize: "30px", color: 'black' }} inline>{"\\(\\vec{w} = \\)"}</MathJax>
                        <TextField label="w1" type="number" onChange={event => setW1(Number(event.target.value))} sx={{ width: 100 }} />
                        <TextField label="w2" type="number" onChange={event => setW2(Number(event.target.value))} sx={{ width: 100 }} />
                        {/* <TextField label="w3" type="number" onChange={event => setW3(Number(event.target.value))} sx={{ width: 100 }} /> */}
                        <br />
                        <br />
                        <MathJax style={{ fontSize: "30px", color: 'black' }} inline>{"\\(b = \\)"}</MathJax>
                        <TextField label="b" type="number" onChange={event => setB(Number(event.target.value))} sx={{ width: 100 }} />
                        <br />
                        <br />
                        <MathJax style={{ fontSize: "30px", color: 'black' }} inline>{"\\(\\vec{x} = \\)"}</MathJax>
                        <TextField label="x1" type="number" onChange={event => setX1(Number(event.target.value))} sx={{ width: 100 }} />
                        <TextField label="x2" type="number" onChange={event => setX2(Number(event.target.value))} sx={{ width: 100 }} />
                        {/* <TextField label="x3" type="number" onChange={event => setX3(Number(event.target.value))} sx={{ width: 100 }} /> */}
                        <br />
                        <br />
                        <MathJax style={{ fontSize: "30px", color: 'black' }} inline>{"\\(y = \\sigma(\\vec{w} \\cdot \\vec{x} + b) = \\)"}</MathJax>
                        <MathJax style={{ fontSize: "30px", color: 'black' }} inline >{sigmoid(w_1 * x_1 + w_2 * x_2 + b).toString()}</MathJax>
                    </LeftItem>
                    <br />
                    {t(translation_path.concat(".graph"))}<br />
                    <br />
                    <Typography sx={{ width: "100%", textAlign: 'center', direction: 'ltr' }}>
                        <MathJax style={{ fontSize: "2em" }} inline>{"\\( \\frac{1}{1 + e^{-(w \\cdot x + b)}} \\)"}</MathJax>
                    </Typography>
                    <Graph2D function={`(1) / (1 + e^(${w_1}*x + ${w_2}*y + ${b}))`} y_i={-20} y_f={20} x_i={-20} x_f={20} />
                    {/* <LogisticRegressionPlot w1={w_1} x1={x_1} b={b} /> */}

                    <br />
                    <br />
                </Typography>
            </MathJaxContext>
        </Box>
    );
}
