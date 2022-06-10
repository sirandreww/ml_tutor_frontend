import React from 'react';
import Box from '@mui/material/Box';
import functionPlot from "function-plot";
import Typography from '@mui/material/Typography';
import { mathJaxConfig, mathJaxStyle } from 'components/LanguageAndButtonUtility';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { useTranslation } from "react-i18next";

function getGraph1D(f: string, points: number[][]) {
    var width = 800;
    var height = 500;
    // console.log("points= \n", points)
    // console.log("f= \n", f)

    functionPlot({
        target: '#graph-board',
        width,
        height,
        xAxis: { domain: [-0.5, 5.5], label: 'x' },
        yAxis: { domain: [-1, 13], label: 'y' },
        grid: true,
        disableZoom: true,
        data: [
            {
                fn: f,
            },
            {
                points: points,
                fnType: 'points',
                graphType: 'scatter',
            },
            {
                points: [[1,3],[1,2.7]],
                fnType: 'points',
                graphType: 'polyline',
                color: 'black'
            },
            {
                points: [[2,4],[2,4.9]],
                fnType: 'points',
                graphType: 'polyline',
                color: 'black'
            },
            {
                points: [[3,8],[3,7.1]],
                fnType: 'points',
                graphType: 'polyline',
                color: 'black'
            },
            {
                points: [[4,9],[4,9.3]],
                fnType: 'points',
                graphType: 'polyline',
                color: 'black'
            },
        ]
    });
}

export default function Introduction1D() {
    const [t] = useTranslation('translation');
    let points = [[1,3],[2,4],[3,8],[4,9]];
    
    React.useEffect(() => {
        getGraph1D('2.2*x+0.5', points);
    });

    const tab = <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    const headers_style = {fontFamily: 'Arial, Helvetica, sans-serif'}
    return (
        <Box sx={{ width: '100%' }}>
            <MathJaxContext version={3} config={mathJaxConfig}>
                <Typography component={'span'}>
                    <h1 style={headers_style}> {t("lr.title")} </h1>
                    <br/>
                    
                    {t("lr.examples_set")} <MathJax style={mathJaxStyle} inline>{"\\((x^{(i)},y^{(i)})\\)"}</MathJax>,<br/>
                    <MathJax style={mathJaxStyle} inline>{"\\(x\\)"}</MathJax> - {t("lr.x_vals")},<br/>
                    <MathJax style={mathJaxStyle} inline>{"\\(y\\)"}</MathJax> - {t("lr.y_vals")}.<br/>
                    <br/>
                    {t("lr.description")} <MathJax style={mathJaxStyle} inline>{"\\(\\hat{y} = w \\cdot x + b\\)"}</MathJax>.<br/>
                    <br/>
                </Typography>
                <div id='graph-board' style={{pointerEvents: 'none'}}></div>
                <Typography component={'span'}>
                    <br/>
                    <h4 style={headers_style}>{t("lr.opt_params")}</h4><br/>
                    {t("lr.min_params")}:<br/>
                    <MathJax style={mathJaxStyle} inline>{"\\(J=\\frac{1}{m} \\sum_{i=1}^{m}\\left(w\\cdot x^{(i)}+b-y^{(i)}\\right)^{2}\\)"}</MathJax><br/>
                    <br/><br/>
                    {tab}<h4 style={headers_style}>{t("lr.defs")}:</h4><br/>
                    {tab}{tab}<MathJax style={mathJaxStyle} inline>{"\\(\\overline{x}=\\frac{1}{m}\\sum_{i=1}^{m}x^{(i)}\\)"}</MathJax> - {t("lr.x_mean_val")}.<br/><br/>
                    {tab}{tab}<MathJax style={mathJaxStyle} inline>{"\\(\\overline{y}=\\frac{1}{m}\\sum_{i=1}^{m}y^{(i)}\\)"}</MathJax> - {t("lr.y_mean_val")}.<br/><br/>
                    {tab}{tab}<MathJax style={mathJaxStyle} inline>{"\\(\\overline{x\\cdot x} =\\frac{1}{m}\\sum_{i=1}^{m}x^{(i)}x^{(i)}\\)"}</MathJax><br/><br/>
                    {tab}{tab}<MathJax style={mathJaxStyle} inline>{"\\(\\overline{x\\cdot y} =\\frac{1}{m}\\sum_{i=1}^{m}x^{(i)}y^{(i)}\\)"}</MathJax><br/><br/>
                    <br/><br/>
                    {tab}<h4 style={headers_style}>{t("lr.analytic_sol")}:</h4><br/>
                    {tab}{tab}<MathJax style={mathJaxStyle} inline>{"\\(w = \\frac{\\overline{x\\cdot y}-\\bar{x}\\cdot \\bar{y}}{\\overline{x\\cdot x}-\\bar{x}\\cdot \\bar{x}}\\)"}</MathJax><br/><br/>
                    {tab}{tab}<MathJax style={mathJaxStyle} inline>{"\\(b = \\overline{y} - w \\bar{x}\\)"}</MathJax><br/><br/>
                </Typography>
            </MathJaxContext>
        </Box>
    )
}
