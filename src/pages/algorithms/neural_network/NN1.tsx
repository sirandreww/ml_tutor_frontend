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
import nn1 from "assets/images/nn1.png"

const translation_path = "nn.pages.intro"
export default function NN1() {
    const tab = <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    const headers_style = { fontFamily: 'Arial, Helvetica, sans-serif' }
    const [t] = useTranslation('translation');

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
                            An artificial neural network, or neural network (NN) for short, is a computing system
                            inspired by the biological neural network of the brain.<br />
                            A NN is made up of mainly 3 elements:<br />
                            <ol>
                                <li>
                                    Input neurons, they have values that correspond to the input in some way.
                                    For example if the input is an image there will be a neuron for each pixel, and
                                    the value of each neuron will be the value (number from 0 to 255) of that pixel.
                                </li>
                                <li>
                                    One or more layers of internal neurons. Each one of these layers is a
                                    generalization of information in the previous layer.
                                </li>
                                <li>
                                    Output neurons, they encode the output of the neural network. For example,
                                    when the problem is to figure out if an image is a cat or a dog, we would
                                    have two ouput neurons (one says cat, and the other says dog), the one that
                                    has the maximum value dictates what the neural network thinks the image
                                    contains.
                                </li>
                            </ol>
                            Let's take a look at an example :<br />
                            <br />
                            <NNGraph2d layers={[2, 3, 2, 3, 2]} colors={["green", "blue", "blue", "blue", "red"]} />
                            <br />
                            In the graph above the green neurons are the input neurons, the blue neurons
                            are in internal layers and the red neurons are the output neurons. <br />
                            <br />
                            <br />
                            Now that we have a basic understanding of how a neural network looks like, we
                            can start talking about how it calculates the output. Each neuron in each layer
                            is a perceptron of all the neurons of the layers before it. <br />
                            <br />
                            For example in this neural network : <br />
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




                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                        </Typography>
                    </MathJaxContext>
                </Box>
            }
        />
    );
}
