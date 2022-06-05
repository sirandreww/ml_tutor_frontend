import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
    BlackAlignedItem, BlackCenterAlignedLeftTextItem, BlackLeftItem,
    languageDirection,
    mathJaxConfig,
    mathJaxStyle
} from 'components/LanguageAndButtonUtility';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { useTranslation } from "react-i18next";
import { TextField } from '@mui/material';
import { LogisticRegressionModule } from 'components/logistic_regression/LogisticRegressionCore';
import Grid from "@mui/material/Grid";


const translation_path = "logreg.pages.training."
export default function LogisticRegressionTraining() {
    const tab = <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    const headers_style = { fontFamily: 'Arial, Helvetica, sans-serif' }
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
            [[x_11, x_12], [x_21, x_22]],
            [c_1, c_2],
            a,
            1
        )
    );

    function updateModule() {
        setModule(new LogisticRegressionModule([[x_11, x_12], [x_21, x_22]], [c_1, c_2], a, 1))
    }
    return (
        <Box sx={{ width: '100%' }}>
            <MathJaxContext version={3} config={mathJaxConfig}>
                <Typography component={'span'}>
                    <Typography sx={{ width: "100%", textAlign: 'center', direction: 'ltr' }}>
                        <h1 style={headers_style}>{t("logreg.pages.training_title")}</h1>
                    </Typography>
                    <br />
                    <br />
                    <br />
                    {t(translation_path.concat("intro"))}
                </Typography>
                <br />
                <br />
                <Typography component={'div'}>
                    <br />
                    <h3 style={headers_style}>
                        {t(translation_path.concat("logReg_q"))}? <br />
                    </h3>
                    <Typography component={'span'} sx={{ width: "100%", direction: 'ltr' }}>
                        {t(translation_path.concat("logReg_ans_p1"))} <MathJax style={mathJaxStyle} inline>{"\\(M({\\vec{w}}_{1xn}, b) \\)"}</MathJax> {t(translation_path.concat("logReg_ans_p2"))}:<br />
                        <MathJax style={mathJaxStyle} inline>{"\\(\\vec{w}_{1xn}\\)"}</MathJax> - {t(translation_path.concat("logReg_ans_w"))}.<br />
                        <MathJax style={mathJaxStyle} inline>{"\\(b\\)"}</MathJax> - {t(translation_path.concat("logReg_ans_b"))}.<br />
                    </Typography>
                    <br />

                    <h3 style={headers_style}>
                        {t(translation_path.concat("acc_q"))}?<br />
                    </h3>
                    <Typography component={'span'} sx={{ width: "100%", direction: 'ltr' }}>
                        {t(translation_path.concat("acc_ans"))}.<br />
                        <br />
                        <h4 style={headers_style} dir={languageDirection()}>
                            {t(translation_path.concat("consider"))}:<br />
                        </h4>
                        <BlackAlignedItem>
                            {tab}{tab}1. <MathJax style={mathJaxStyle} inline>{"\\(X_{mxn}\\)"}</MathJax> - {t(translation_path.concat("consider_x"))}. <br />
                            {tab}{tab}2. <MathJax style={mathJaxStyle} inline>{"\\(\\vec{w_{1xn}}\\)"}</MathJax> - {t(translation_path.concat("consider_w"))}.<br />
                            {tab}{tab}3. <MathJax style={mathJaxStyle} inline>{"\\( b \\)"}</MathJax> - {t(translation_path.concat("consider_b"))}.<br />
                            {tab}{tab}4. <MathJax style={mathJaxStyle} inline>{"\\(\\vec{C_{1xm}}\\)"}</MathJax> - {t(translation_path.concat("consider_c"))}<br />
                            <br />
                            {t(translation_path.concat("calc_y"))} <MathJax style={mathJaxStyle} inline>{"\\(\\vec{Y_{1xm}}\\)"}</MathJax>.<br />
                            {tab}{tab}<MathJax style={mathJaxStyle} inline>{"\\(\\vec{Y_{1xm}} = \\sigma(\\vec{w} \\cdot X^{t} + b)\\)"}</MathJax> '{t(translation_path.concat("prev"))}'<br />
                            <br />
                            {t(translation_path.concat("after"))}<br />
                            {tab}{tab}<MathJax style={mathJaxStyle} inline>{"\\(Loss = \\frac{-1}{m} * \\sum_{i=1}^{m} ( c_i*log(y_i) + (1-c_i)*log(1-y_i) )\\)"}</MathJax><br />
                            {tab}{tab}<MathJax style={mathJaxStyle} inline>{"\\(c_i\\)"}</MathJax> - {t(translation_path.concat("ci"))}.<br />
                            {tab}{tab}<MathJax style={mathJaxStyle} inline>{"\\(y_i\\)"}</MathJax> - {t(translation_path.concat("yi"))}.<br />
                            {t(translation_path.concat("ret_type"))}!<br />
                        </BlackAlignedItem>
                    </Typography>
                    <br />

                    <h3 style={headers_style}>
                        {t(translation_path.concat("trainModel_q"))}?<br />
                    </h3>
                    <Typography component={'span'} sx={{ width: "100%", direction: 'ltr' }}>
                        {t(translation_path.concat("trainModel_ans"))}
                        <br />
                        {t(translation_path.concat("above_inputs"))} <MathJax style={mathJaxStyle} inline>{"\\(X_{mxn}\\)"}</MathJax> & <MathJax style={mathJaxStyle} inline>{"\\(\\vec{C_{1xm}}\\)"}</MathJax>:<br />
                        {t(translation_path.concat("additional_inputs"))} <MathJax style={mathJaxStyle} inline>{"\\(\\alpha\\)"}</MathJax><br />
                        <br />
                        <h4 style={headers_style} dir={languageDirection()}>
                            {t(translation_path.concat("defs"))}:<br />
                        </h4>
                        <BlackAlignedItem>
                            <MathJax style={mathJaxStyle} inline>{"\\(Loss\\)"}</MathJax> - {t(translation_path.concat("loss_def"))}.<br />
                            <MathJax style={mathJaxStyle} inline>{"\\(dw_i = \\frac{dLoss}{dw_i} = (\\vec{Y}_{1xm} - \\vec{C}_{1xm}) \\cdot \\vec{X_i}\\)"}</MathJax> - {t(translation_path.concat("dwi_def"))}<br />
                            <MathJax style={mathJaxStyle} inline>{"\\(dW = \\frac{dLoss}{d\\vec{w}} = (\\vec{Y}_{1xm} - \\vec{C}_{1xm}) \\cdot X_{mxn}\\)"}</MathJax> - {t(translation_path.concat("dW_def"))}<br />
                            <MathJax style={mathJaxStyle} inline>{"\\(db_i = \\frac{dLoss}{db_i} = y_i - c_i\\)"}</MathJax> - {t(translation_path.concat("dbi_def"))}.<br />
                            <MathJax style={mathJaxStyle} inline>{"\\(dB = \\frac{1}{m} * \\sum_{i=1}^{m}\\frac{dLoss}{db_i} = \\sum_{i=1}^{m}(y_i - c_i)\\)"}</MathJax> - {t(translation_path.concat("dB_def"))}.<br />
                            <MathJax style={mathJaxStyle} inline>
                                {`$$
                                    dW = \\frac{dLoss}{d\\vec{w}} =
                                    \\begin{bmatrix}
                                        \\frac{dLoss}{dw_1} \\cdots & \\frac{dLoss}{dw_n}     \\\\
                                    \\end{bmatrix} 
                                    \\ = 
                                    \\begin{bmatrix}
                                        (\\vec{Y}_{1xm} - \\vec{C}_{1xm}) \\cdot \\vec{X_1} \\cdots & (\\vec{Y}_{1xm} - \\vec{C}_{1xm}) \\cdot \\vec{X_n}  \\\\
                                    \\end{bmatrix} 
                                    $$`}
                            </MathJax>
                            <MathJax style={mathJaxStyle} inline>
                                {`$$
                                    dW = \\frac{dLoss}{d\\vec{w}} =
                                    (\\vec{Y}_{1xm} - \\vec{C}_{1xm}) \\cdot X_{mxn}
                                    $$`}
                            </MathJax>
                            <br />
                            <h4 style={headers_style} dir={languageDirection()}>
                                {t(translation_path.concat("init"))}:<br />
                            </h4>
                            {tab}{tab}1. <MathJax style={mathJaxStyle} inline>{"\\(\\vec{w} = [0, 0, ..., 0]_{1xn}\\)"}</MathJax> - {t(translation_path.concat("init_w"))}.<br />
                            {tab}{tab}2. <MathJax style={mathJaxStyle} inline>{"\\(b = 0\\)"}</MathJax> - {t(translation_path.concat("init_b"))}.<br />
                            <h4 style={headers_style} dir={languageDirection()}>
                                {t(translation_path.concat("step"))}:<br />
                            </h4>
                            {tab}{tab}1. {t(translation_path.concat("step_calculate"))} <MathJax style={mathJaxStyle} inline>{"\\(\\vec{Y}_{1xm}\\)"}</MathJax>.<br />
                            {tab}{tab}2. {t(translation_path.concat("step_calculate"))} <MathJax style={mathJaxStyle} inline>{"\\(dW\\)"}</MathJax>.<br />
                            {tab}{tab}3. {t(translation_path.concat("step_calculate"))} <MathJax style={mathJaxStyle} inline>{"\\(dB\\)"}</MathJax>.<br />
                            {tab}{tab}4. {t(translation_path.concat("step_apply"))} <MathJax style={mathJaxStyle} inline>{"\\(\\vec{w}_{new} = \\vec{w} - \\alpha * dW^{t}\\)"}</MathJax>.<br />
                            {tab}{tab}5. {t(translation_path.concat("step_apply"))} <MathJax style={mathJaxStyle} inline>{"\\(b_{new} = b - \\alpha*dB\\)"}</MathJax>.<br />
                        </BlackAlignedItem>
                    </Typography>
                    <br />
                </Typography>

                <Typography component={'div'}>
                    <h3 style={headers_style}>
                        {t(translation_path.concat("demo"))}:<br />
                    </h3>
                    <br />
                    <BlackCenterAlignedLeftTextItem>
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
                                <TextField data-testid="x11Input" label="x11" type="number" size="small" onChange={event => {
                                    setX11(Number(event.target.value)); updateModule()
                                }} sx={{ width: "100%" }} />
                                <TextField data-testid="x21Input" label="x21" type="number" size="small" onChange={event => {
                                    setX21(Number(event.target.value)); updateModule()
                                }} sx={{ width: "100%" }} />
                            </Grid>
                            <Grid item xs={2} my={`auto`}>
                                <TextField data-testid="x12Input" label="x12" type="number" size="small" onChange={event => {
                                    setX12(Number(event.target.value)); updateModule()
                                }} sx={{ width: "100%" }} />
                                <TextField data-testid="x22Input" label="x22" type="number" size="small" onChange={event => {
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
                                <TextField data-testid="c1Input" label="classification 1" type="number" size="small" onChange={event => {
                                    setC1(Number(event.target.value)); updateModule()
                                }} sx={{ width: "100%" }} />
                            </Grid>
                            <Grid item xs={2} my={`auto`}>
                                <TextField data-testid="c2Input" label="classification 2" type="number" size="small" onChange={event => {
                                    setC2(Number(event.target.value)); updateModule()
                                }} sx={{ width: "100%" }} />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={1} my={`auto`} />
                            <Grid item xs={3} my={`auto`}>
                                <MathJax style={mathJaxStyle} inline>{"\\(\\alpha = \\)"}</MathJax>
                            </Grid>
                            <Grid item xs={4} my={`auto`} />
                            <Grid item xs={2} my={`auto`}>
                                <TextField data-testid="alphaInput" value={a} type="number" size="small" onChange={event => {
                                    setAlpha(Number(event.target.value)); updateModule()
                                }} sx={{ width: "100%" }} />
                            </Grid>
                            <Grid item xs={2} my={`auto`} />
                        </Grid>
                    </BlackCenterAlignedLeftTextItem>
                    <br />
                </Typography>
                <br />
                <Typography component={'span'} sx={{ width: "100%", direction: 'ltr' }}>
                    <h4 style={headers_style} dir={languageDirection()}>
                        {t(translation_path.concat("demo_init"))}:<br />
                    </h4>
                    <BlackLeftItem>
                        <MathJax style={mathJaxStyle} inline>{"\\(\\vec{w}_{1x2} = [ 0, 0 ]\\)"}</MathJax><br />
                        <MathJax style={mathJaxStyle} inline>{"\\(b = 0\\)"}</MathJax><br />
                    </BlackLeftItem>
                </Typography>
                <br />
                <Typography component={'span'} sx={{ width: "100%", direction: 'ltr' }}>
                    <h4 style={headers_style} dir={languageDirection()}>
                        {t(translation_path.concat("demo_itr_res"))}:<br />
                    </h4>
                    <BlackLeftItem>
                        <MathJax style={mathJaxStyle} inline>{"\\(\\vec{Y}_{1x2} = \\)"}</MathJax><span data-testid="ysResult">{"[" + module.predict([x_11, x_12]).toString() + ", " + module.predict([x_21, x_22]).toString() + " ]"}</span><br />
                        <MathJax style={mathJaxStyle} inline>{"\\(\\vec{w}_{new} = \\)"}</MathJax><span data-testid="wsResult">{module.getWs()[0].toString()}</span><br />
                        <MathJax style={mathJaxStyle} inline>{"\\(b_{new} = \\)"}</MathJax><span data-testid="bResult">{module.getBs()[0].toString()}</span><br />
                        <MathJax style={mathJaxStyle} inline>{"\\(Loss = \\)"}</MathJax><span data-testid="lossResult">{module.getCosts()[0].toString()}</span><br />
                    </BlackLeftItem>
                </Typography>
                <br />
                <Typography component={'span'} sx={{ width: "100%", direction: 'ltr' }}>
                    <h4 style={headers_style} dir={languageDirection()}>
                        {t(translation_path.concat("demo_final_res"))}:<br />
                    </h4>
                    <BlackLeftItem>
                        <MathJax style={mathJaxStyle} inline>{"\\(\\vec{w}_{1x2} = \\)"}</MathJax><span>{module.getModule().W.toString()}</span><br />
                        <MathJax style={mathJaxStyle} inline>{"\\(b = \\)"}</MathJax><span>{module.getModule().B.toString()}</span><br />
                    </BlackLeftItem>
                </Typography>
                <br />
                <br />
            </MathJaxContext>
        </Box>
    );
}
