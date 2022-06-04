import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getPoints1D, getGraph1D } from 'components/gradient_descent/GradientDescentHelper';
import { mathJaxConfig, mathJaxStyle } from 'components/LanguageAndButtonUtility';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import {useTranslation} from "react-i18next";


export default function GradientDescentIntroduction1D() {
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        let points = getPoints1D('x^2', 5, count, 0.2);
        getGraph1D('x^2', points);
    }, [count]);

    React.useEffect(() => {
        let new_count = 0;
        (count < 10) ? new_count = count + 1 : new_count = 0
        const timer = setTimeout(() => setCount(new_count), 1e3)
        return () => clearTimeout(timer)
    });

    const tab = <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    const headers_style = {fontFamily: 'Arial, Helvetica, sans-serif'}
    const [t] = useTranslation('translation');
    
    return (
        <Box sx={{ width: '100%' }}>
            <MathJaxContext version={3} config={mathJaxConfig}>
                <Typography component={'span'}>
                    <Typography sx={{ width: "100%", textAlign: 'center', direction: 'ltr'}}>
                        <h1 style={headers_style}>Gradient descent 1D</h1>
                    </Typography>
                    <br/>
                    {t("gd.description")}
                    <br/>
                    {t("gd.example_1")} <MathJax style={mathJaxStyle} inline>{"\\(f(x) = x^{2}\\)"}</MathJax> {t("gd.example_2")} <MathJax style={mathJaxStyle} inline>{"\\(x = 5\\)"}</MathJax> {t("gd.example_3")}<br/>
                    {t("gd.steps")}<br/>
                    <br/>
                </Typography>
                <div id='graph-board' style={{pointerEvents: 'none'}}></div>
                <Typography component={'span'}>
                    <br/>
                    <h4 style={headers_style}>{t("gd.how")}</h4><br/>
                    {t("gd.idea")}
                    <br/><br/>
                    {tab}<h4 style={headers_style}>{t("gd.defs")}</h4><br/>
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
                </Typography>
            </MathJaxContext>
        </Box>
    )
}
