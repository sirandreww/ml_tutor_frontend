import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { mathJaxConfig, mathJaxStyle } from 'components/LanguageAndButtonUtility';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import {useTranslation} from "react-i18next";
import LogisticRegressionPlot from 'components/LogisticRegressionPlot';


export default function LogisticRegressionIntoduction() {
    const tab = <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    const headers_style = {fontFamily: 'Arial, Helvetica, sans-serif'}
    const [t] = useTranslation('translation');

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
                    {}<br/>
                    {}<br/>
                    <br/>
                </Typography>
                <LogisticRegressionPlot />
                <Typography component={'span'}>
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
                </Typography>
            </MathJaxContext>
        </Box>
    );
}
