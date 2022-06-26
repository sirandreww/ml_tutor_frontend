// ------------------------ IMPORTS ------------------------  
import React from 'react';
import AlgorithmsDashboard from 'components/AlgorithmsDashboard';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { mathJaxConfig, mathJaxStyle } from 'components/LanguageAndButtonUtility';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { useTranslation } from "react-i18next";
import { TextField } from '@mui/material';
import LogisticRegressionPlot from 'components/logistic_regression/LogisticRegressionPlot';
import { sigmoid } from 'components/logistic_regression/LogisticRegressionCore';
import AnswerField from 'components/AnswerField';
import NNGraph2d from 'components/NNGraph2D';
import nn1 from "assets/images/nn1.png";
import NNEx1 from 'components/NNEx1';

export default function NN3() {
    const tab = <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    const headers_style = { fontFamily: 'Arial, Helvetica, sans-serif' }
    const [t] = useTranslation('translation');

    return (
        <AlgorithmsDashboard
            currentAlgorithmName="nn"
            currentStep={3}
            component={
                <Box sx={{ width: '100%' }}>
                    <MathJaxContext version={3} config={mathJaxConfig}>
                        <Typography component={'span'}>
                            <Typography sx={{ width: "100%", textAlign: 'center', direction: 'ltr' }}>
                                <h1 style={headers_style}>{t("nn.pages.tfp_title")}</h1>
                            </Typography>
                            <br />
                            <br />
                            <br />
                            {t("nn.pages.tfp.tfp_1")} <br />
                            <br />
                            {t("nn.pages.tfp.tfp_2")} <br />
                            <br />
                            {t("nn.pages.tfp.tfp_3")} 
                            {t("nn.pages.tfp.tfp_4")} <a href="https://playground.tensorflow.org/">{t("nn.pages.tfp.link")}</a> {t("nn.pages.tfp.tfp_5")} 
                            {t("nn.pages.tfp.tfp_6")}
                            <br />
                            <br />
                        </Typography>
                    </MathJaxContext>
                </Box>
            }
        />
    );
}
