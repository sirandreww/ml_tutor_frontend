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
import ColoredSquare from 'components/ColoredSquare';

const translation_path = "nn.pages.intro"
export default function NN1() {
    const tab = <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    const headers_style = { fontFamily: 'Arial, Helvetica, sans-serif' }
    const [t] = useTranslation('translation');

    const red = "#ff5e5e";
    const blue = "#469be2";
    const green = "#70ad47";

    return (
        <AlgorithmsDashboard
            currentAlgorithmName="nn"
            currentStep={1}
            component={
                <Box sx={{ width: '100%' }}>
                    <MathJaxContext version={3} config={mathJaxConfig}>
                        <Typography component={'span'}>
                            <Typography sx={{ width: "100%", textAlign: 'center', direction: 'ltr' }}>
                                <h1 style={headers_style}>{t("nn.pages.intro_title")}</h1>
                            </Typography>
                            <br />
                            <br />
                            <br />
                            {t("nn.pages.intro.nn_description")}<br />
                            {t("nn.pages.intro.nn_description2")}<br />
                            <ol>
                                <li>
                                {t("nn.pages.intro.nn_description3")}
                                </li>
                                <li>
                                {t("nn.pages.intro.nn_description4")}
                                </li>
                                <li>
                                {t("nn.pages.intro.nn_description5")}
                                </li>
                            </ol>
                            {t("nn.pages.intro.nn_description6")}<br />
                            <br />
                            <NNGraph2d layers={[2, 3, 2, 3, 3]} colors={[green, blue, blue, blue, red]} style={{ height: "400px" }} />
                            <br />
                            {t("nn.pages.intro.nn_description7")} <br />
                            <ColoredSquare color={green} />  {t("nn.pages.intro.nn_description8")} <br />
                            <ColoredSquare color={blue} /> {t("nn.pages.intro.nn_description9")} <br />
                            <ColoredSquare color={red} /> {t("nn.pages.intro.nn_description10")} <br />
                            <br />
                            <br />
                            {t("nn.pages.intro.nn_description11")} <br />
                            <br />
                            {t("nn.pages.intro.nn_description12")}<br />
                            <br />
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Box
                                    component="img"
                                    src={nn1}
                                    alt="Neural network with 2 neurons in the input layer, on hidden layer with 3 neurons and 1 neuron in the output layer"
                                />
                            </Box>
                            <br />
                            {t("nn.pages.intro.nn_description13")}
                            <MathJax style={mathJaxStyle} inline>{"\\( \\: a_{1}^{[1]} \\)"}</MathJax>
                            {t("nn.pages.intro.nn_description14")}<br />
                            <MathJax style={mathJaxStyle} inline>{"\\( a_{1}^{[1]} = \\sigma ( w_{1}^{[1]} \\cdot a^{[0]} + b[1]) \\)"}</MathJax><br />
                            {t("nn.pages.intro.nn_description15")}
                            <MathJax style={mathJaxStyle} inline>{"\\( \\: w_{1}^{[1]} \\cdot a^{[0]} \\: \\)"}</MathJax>
                            {t("nn.pages.intro.nn_description16")}
                            <MathJax style={mathJaxStyle} inline>{"\\( \\: b[1] \\: \\)"}</MathJax>
                            {t("nn.pages.intro.nn_description17")}
                            <MathJax style={mathJaxStyle} inline>{"\\( \\: \\sigma \\: \\)"}</MathJax>
                            {t("nn.pages.intro.nn_description18")}
                            <br />
                            <br />
                        </Typography>
                    </MathJaxContext>
                </Box>
            }
        />
    );
}
