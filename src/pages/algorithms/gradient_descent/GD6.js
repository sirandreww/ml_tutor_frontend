// ------------------------ IMPORTS ------------------------  
import * as React from 'react';
import AlgorithmsDashboard from 'pages/algorithms/dashboard/AlgorithmsDashboard';
import GDStepper from 'pages/algorithms/gradient_descent/slides/GDStepper';
import GradientDescent2D from "pages/algorithms/gradient_descent/slides/GradientDescent2D";
import { Typography, Box } from '@mui/material';
import { LeftItem } from 'pages/algorithms/dashboard/utils';

export default function GD6() {
    return (
        <AlgorithmsDashboard
            stepper={<GDStepper activeStep={5} />}
            component={
                <Box>
                    <LeftItem>
                        <Typography>
                            Try it yourself! Just like before the variables must be x and y.<br />
                        </Typography>
                    </LeftItem>
                    <GradientDescent2D
                        alphaType='input'
                        buttonsType='playGround'
                        generateQuestionTable={false}
                    />
                </Box>
            }
            previous="/algorithms/gd5"
            isPreviousDisabled={false}
            next="/algorithms/gd7"
            isNextDisabled={false}
        />
    );
}
