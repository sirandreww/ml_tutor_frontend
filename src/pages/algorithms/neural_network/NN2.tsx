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

export default function NN2() {
    const tab = <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    const headers_style = { fontFamily: 'Arial, Helvetica, sans-serif' }
    const [t] = useTranslation('translation');

    const red = "#ff5e5e";
    const blue = "#469be2";
    const green = "#70ad47";

    return (
        <AlgorithmsDashboard
            currentAlgorithmName="nn"
            currentStep={2}
            component={
                <Box sx={{ width: '100%' }}>
                    <MathJaxContext version={3} config={mathJaxConfig}>
                        <Typography component={'span'}>
                            <Typography sx={{ width: "100%", textAlign: 'center', direction: 'ltr' }}>
                                <h1 style={headers_style}>{t("nn.pages.ex1_title")}</h1>
                            </Typography>
                            <br />
                            <br />
                            <br />
                            Let's try to solve an exercise together, take a look at the following neural network:<br />
                            <br />
                            <NNGraph2d layers={[2, 2, 1]} colors={[green, blue, red]} style={{height: "300px"}} />
                            <br />
                            The exercise will be to take some possibilites for inputs, weights 
                            and biases and to calculate the value of each neuron. 
                            <br />
                            <br />
                            <NNEx1 />
                            <br />
                            <br />
                        </Typography>
                    </MathJaxContext>
                </Box>
            }
        />
    );
}
