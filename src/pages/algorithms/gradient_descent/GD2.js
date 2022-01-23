// ------------------------ IMPORTS ------------------------  
import * as React from 'react';
import AlgorithmsDashboard from 'pages/algorithms/dashboard/AlgorithmsDashboard';
import GDStepper from 'pages/algorithms/gradient_descent/slides/GDStepper';
import { Box, Typography } from '@mui/material';
import { LeftItem } from 'pages/algorithms/dashboard/utils';
import GradientDescent1D from 'pages/algorithms/gradient_descent/slides/GradientDescent1D';

export default function GD2() {
    return (
        <AlgorithmsDashboard
            stepper={<GDStepper activeStep={1} />}
            component={
                <Box>
                    <LeftItem>
                        <Typography>
                            Enter a function (can be any function you want but the variable must be x), Hyper-Parameter and set the starting point.<br />
                            Hit the play button to start the animation, you can also pause it and zoom in the graph by clicking the pause button or clear everything using the X button.<br />
                        </Typography>
                    </LeftItem>
                    <GradientDescent1D
                        alphaType='input'
                        buttonsType='playGround'
                        generateQuestionTable={false}
                    />
                </Box>
            }
            previous="/algorithms/gd1"
            isPreviousDisabled={false}
            next="/algorithms/gd3"
            isNextDisabled={false}
        />
    );
}
