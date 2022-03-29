import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getPoints2D, getGraph2D, getData2D } from 'components/GradientDescentHelper';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { mathJaxConfig, mathJaxStyle } from 'components/LanguageAndButtonUtility';
import {useTranslation} from "react-i18next";

const fun = 'x^2 + y^2';
const data = getData2D(fun)

export default function GradientDescentIntroduction2D() {
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        try {
            console.log(count)
            let points = null;
            points = getPoints2D(fun, 10, -10, count, 0.05);
            getGraph2D(data, points);
        }
        catch (e) {
            console.log("error at useEffect on parameters changes => \n", e)
        }
    }, [count]);

    // For Initial plot when the page loads for the first time
    React.useEffect(() => {
        try {
            let new_count = 0;
            (count < 10) ? new_count = count + 1 : new_count = 0
            const timer = setTimeout(() => setCount(new_count), 1e3)
            return () => clearTimeout(timer)
        }
        catch (e) {
            console.log("error at useEffect => \n", e)
            return
        }
    });

    const tab = <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    const headers_style = {fontFamily: 'Arial, Helvetica, sans-serif'}
    const [t] = useTranslation('translation');

    return (
        <Box sx={{ width: '100%' }}>
            <MathJaxContext version={3} config={mathJaxConfig}>
                <Typography component={'span'}>
                    <Typography sx={{ width: "100%", textAlign: 'center', direction: 'ltr'}}>
                        <h1 style={headers_style}>Gradient descent 2D</h1>
                    </Typography>
                    {t("gd.gd_two_vars")}<br/>
                    <br/>
                    {t("gd.example_1")} <MathJax style={mathJaxStyle} inline>{"\\(f(x, y) = x^{2} + y^{2}\\)"}</MathJax> {t("gd.example_2")}  <MathJax style={mathJaxStyle} inline>{"\\((x = 10, y = -10)\\)"}</MathJax> {t("gd.example_3")}<br/>
                    {t("gd.steps")} <br/>
                    <br/>
                </Typography>
                <div id='graph2-board' style={{pointerEvents: 'none'}}></div>
                <Typography component={'span'}>
                    <br/>
                    <h4 style={headers_style}>{t("gd.how")}</h4><br/>
                    {t("gd.almost_descr")}<br/>
                    <br/><br/>
                    {tab}<h4 style={headers_style}>{t("gd.defs")}</h4><br/>
                    {tab}{tab}<MathJax style={mathJaxStyle} inline>{"\\(x\\)"}</MathJax> - {t("gd.point_vals.x_val")}<br/><br/>
                    {tab}{tab}<MathJax style={mathJaxStyle} inline>{"\\(y\\)"}</MathJax> - {t("gd.point_vals.y_val")}<br/><br/>
                    {tab}{tab}<MathJax style={mathJaxStyle} inline>{"\\(f(x, y)\\)"}</MathJax> - {t("gd.point_vals.z_val")}<br/><br/>
                    {tab}{tab}<MathJax style={mathJaxStyle} inline>{"\\(\\frac{df}{dx}\\)"}</MathJax> - {t("gd.derivatives.f_by_x")} <br/><br/>
                    {tab}{tab}<MathJax style={mathJaxStyle} inline>{"\\(\\frac{df}{dx}(x, y)\\)"}</MathJax> - {t("gd.derivatives.val_f_by_x")}<br/><br/>
                    {tab}{tab}<MathJax style={mathJaxStyle} inline>{"\\(\\frac{df}{dy}\\)"}</MathJax> - {t("gd.derivatives.f_by_y")}<br/><br/>
                    {tab}{tab}<MathJax style={mathJaxStyle} inline>{"\\(\\frac{df}{dy}(x, y)\\)"}</MathJax> - {t("gd.derivatives.val_f_by_y")}<br/><br/>
                    {tab}{tab}<MathJax style={mathJaxStyle} inline>{"\\(\\alpha\\)"}</MathJax> - {t("gd.hyperparameter")}<br/><br/>
                    {tab}{tab}<MathJax style={mathJaxStyle} inline>{"\\(x_{new}\\)"}</MathJax> - {t("gd.point_vals.x_val_new")}<br/><br/>
                    {tab}{tab}<MathJax style={mathJaxStyle} inline>{"\\(y_{new}\\)"}</MathJax> - {t("gd.point_vals.y_val_new")}<br/><br/>
                    <br/><br/>
                    {tab}<h4 style={headers_style}>{t("gd.foreach_step")}</h4><br/>
                    {tab}{tab}1. {t("gd.calc")}<MathJax style={mathJaxStyle} inline>{"\\(\\frac{df}{dx}(x, y)\\)"}</MathJax><br/><br/>
                    {tab}{tab}2. {t("gd.calc")} <MathJax style={mathJaxStyle} inline>{"\\(\\frac{df}{dy}(x, y)\\)"}</MathJax><br/><br/>
                    {tab}{tab}3. {t("gd.apply")} <MathJax style={mathJaxStyle} inline>{"\\(x_{new} = x - (\\alpha * \\frac{df}{dx}(x, y))\\)"}</MathJax><br/><br/>
                    {tab}{tab}4. {t("gd.apply")} <MathJax style={mathJaxStyle} inline>{"\\(y_{new} = y - (\\alpha * \\frac{df}{dy}(x, y))\\)"}</MathJax><br/><br/>
                    {tab}{tab}5. {t("gd.apply")} <MathJax style={mathJaxStyle} inline>{"\\(x = x_{new}\\)"}</MathJax><br/><br/>
                    {tab}{tab}6. {t("gd.apply")} <MathJax style={mathJaxStyle} inline>{"\\(y = y_{new}\\)"}</MathJax><br/><br/>
                </Typography>
            </MathJaxContext>
        </Box>
    )
}