// ------------------------ IMPORTS ------------------------  
import * as React from 'react';
import AlgorithmsDashboard from 'pages/algorithms/dashboard/AlgorithmsDashboard';
import GDStepper from 'pages/algorithms/gradient_descent/slides/GDStepper';
import { Box, Typography } from '@mui/material';
import { LeftItem } from 'pages/algorithms/dashboard/utils';
import GradientDescent1D from 'pages/algorithms/gradient_descent/slides/GradientDescent1D';

export default function GD3() {
    return (
        <AlgorithmsDashboard
            stepper={<GDStepper activeStep={2} />}
            component={
                <Box>
                    <LeftItem>
                        <Typography>
                            Try to calculate the value of each variable as the algorithm does (2 decimal points).<br />
                            Each click on the arrow will draw the next/previous step<br />
                        </Typography>
                    </LeftItem>
                    <GradientDescent1D
                        alphaType='input'
                        buttonsType='stepByStep'
                        generateQuestionTable={true}
                    />
                </Box>
            }
            previous="/algorithms/gd2"
            isPreviousDisabled={false}
            next="/algorithms/gd4"
            isNextDisabled={false}
        />
    );
}
