import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { mathJaxConfig, mathJaxStyle } from 'components/LanguageAndButtonUtility';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { useTranslation } from "react-i18next";
import { TextField } from '@mui/material';
import LogisticRegressionPlot from 'components/logistic_regression/LogisticRegressionPlot';
import { sigmoid } from 'components/logistic_regression/LogisticRegression';


export default function LogisticRegressionVectorRepresentation() {
    const tab = <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    const headers_style = { fontFamily: 'Arial, Helvetica, sans-serif' }
    const [t] = useTranslation('translation');

    const [w_1, setW1] = React.useState(0);
    const [w_2, setW2] = React.useState(0);
    const [w_3, setW3] = React.useState(0);
    const [x_1, setX1] = React.useState(0);
    const [x_2, setX2] = React.useState(0);
    const [x_3, setX3] = React.useState(0);
    const [b, setB] = React.useState(0);

    React.useEffect(() => {
        <LogisticRegressionPlot w1={w_1} x1={x_1} b={b} />
    }, [w_1, x_1, b]);

    return (
        <Box sx={{ width: '100%' }}>
            <MathJaxContext version={3} config={mathJaxConfig}>
                <Typography component={'span'}>
                    <Typography sx={{ width: "100%", textAlign: 'center', direction: 'ltr' }}>
                        <h1 style={headers_style}>Logistic Regression Using Vectors</h1>
                    </Typography>
                    <br />
                    <br />
                    <br />
                    The expression
                    (<MathJax style={mathJaxStyle} inline>{"\\(w_1 * x_1 + w_2 * x_2 + w_3 * x_3 + ... + w_n * x_n\\)"}</MathJax>)
                    can be simplified as the multiplication of 2 vectors <MathJax style={mathJaxStyle} inline>{"\\(\\vec{x}, \\vec{w}\\)"}</MathJax> :
                    <br />
                    <br />
                    <MathJax style={mathJaxStyle} inline>
                        {`$$
                        \\vec{w} \\times \\vec{x} = 
                        \\begin{bmatrix}
                            w_1 & w_2 & w_3 & \\cdots & w_n     \\\\
                        \\end{bmatrix} 
                        \\times
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
                    Thus the calculation done by the linear regression algorithm can be expressed as:
                    <br />
                    {tab}{tab}<MathJax style={mathJaxStyle} inline>{"\\(y = \\sigma(\\vec{w} \\times \\vec{x} + b)\\)"}</MathJax>
                    <br />
                    {tab}{tab}Where the Sigmoid function <MathJax style={mathJaxStyle} inline>{"\\(\\sigma\\)"}</MathJax> is defined as :
                    <br />
                    {tab}{tab}<MathJax style={mathJaxStyle} inline>{"\\(\\sigma(z) = \\frac{1}{1 + e^{-z}}\\)"}</MathJax>
                    <br />
                    The classifier will then predict that the class of the object is "1" if <MathJax style={mathJaxStyle} inline>{"\\( y > 0.5 \\)"}</MathJax>
                    <br />
                    <br />
                    <br />
                    Let's try to understand this even more with a demo, choose your weights and bias and test different values for x :
                    <br />
                    <br />
                    <MathJax style={{ fontSize: "30px" }} inline>{"\\(\\sigma \\Biggl( \\Biggl(\\)"}</MathJax>
                    <TextField label="w1" type="number" onChange={event => setW1(Number(event.target.value))} sx={{ width: 100 }} />
                    <TextField label="w2" type="number" onChange={event => setW2(Number(event.target.value))} sx={{ width: 100 }} />
                    <TextField label="w3" type="number" onChange={event => setW3(Number(event.target.value))} sx={{ width: 100 }} />
                    <MathJax style={{ fontSize: "30px" }} inline>{`
                    $$
                        \\( \\Biggr) \\times \\Biggl(\\) 
                        \\begin{bmatrix}
                            x_1             \\\\ 
                            x_2             \\\\ 
                            x_3             \\\\ 
                            \\vdots         \\\\ 
                            x_n             \\\\ 
                        \\end{bmatrix} 
                    $$`}</MathJax>
                    <TextField label="x1" type="number" onChange={event => setX1(Number(event.target.value))} sx={{ width: 100 }} />
                    <MathJax style={{ fontSize: "30px" }} inline>{"\\( \\Biggr) + \\)"}</MathJax>
                    <TextField label="b" type="number" onChange={event => setB(Number(event.target.value))} sx={{ width: 100 }} />
                    <MathJax style={{ fontSize: "30px" }} inline >{"\\(\\Biggr) = \\)"}</MathJax>
                    <MathJax style={{ fontSize: "30px" }} inline >{sigmoid(w_1 * x_1 + b).toString()}</MathJax>
                    <br />
                    <br />
                    Now let's see the function of the classifier as defined by the weight and bias :
                    <br />
                    <br />
                </Typography>
            </MathJaxContext>
        </Box>
    );
}
