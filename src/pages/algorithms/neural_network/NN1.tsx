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
                                    One or more hidden layers of neurons. Each one of these layers is a
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
                            <NNGraph2d layers={[2, 3, 2, 3, 3]} colors={[green, blue, blue, blue, red]} style={{ height: "400px" }} />
                            <br />
                            In the graph above: <br />
                            <ColoredSquare color={green} />  The green neurons are the input neurons <br />
                            <ColoredSquare color={blue} /> The blue neurons are in the hidden layers <br />
                            <ColoredSquare color={red} /> The red neurons are the output neurons <br />
                            <br />
                            <br />
                            Now that we have a basic understanding of how a neural network looks like, we
                            can start talking about how it calculates the output. Each neuron in each layer
                            is a logistic regression of all the neurons of the layers before it. <br />
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
                            The value of
                            <MathJax style={mathJaxStyle} inline>{"\\( \\: a_{1}^{[1]} \\)"}</MathJax>
                            (The value of the top-most neuron in the first hidden layer) is
                            calculated using the following formula:<br />
                            <MathJax style={mathJaxStyle} inline>{"\\( a_{1}^{[1]} = \\sigma ( w_{1}^{[1]} \\cdot a^{[0]} + b[1]) \\)"}</MathJax><br />
                            Where
                            <MathJax style={mathJaxStyle} inline>{"\\( \\: w_{1}^{[1]} \\cdot a^{[0]} \\: \\)"}</MathJax>
                            is a dot multiplication of 2 vectors, one has the values from the input layer
                            and the othe vector has the weight for each connection with a neuron from a
                            previous layer.
                            <MathJax style={mathJaxStyle} inline>{"\\( \\: b[1] \\: \\)"}</MathJax>
                            is the bias that that neuron has, and
                            <MathJax style={mathJaxStyle} inline>{"\\( \\: \\sigma \\: \\)"}</MathJax>
                            is the a non linear function such as sigmoid, ReLU or Tanh.
                            <br />
                            <br />
                        </Typography>
                    </MathJaxContext>
                </Box>
            }
        />
    );
}
