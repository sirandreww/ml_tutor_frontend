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
                            Now that we understand what a neural network is and how it calculates its output,
                            there's one last thing we need to do... Train one! <br />
                            <br />
                            Training a neural network means to find the best weights for each connection for 
                            each two neurons, as well as finding the best bias for each neuron. This is done
                            using gradient descent! <br />
                            <br />
                            Your next assignment is simple. 
                            Follow <a href="https://playground.tensorflow.org/">this</a> link to a website 
                            called TenserFlow playground, and find a good model for each one of the four datasets.
                            <br />
                            <br />
                        </Typography>
                    </MathJaxContext>
                </Box>
            }
        />
    );
}
