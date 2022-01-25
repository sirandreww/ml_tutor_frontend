// ------------------------ IMPORTS ------------------------  
import * as React from 'react';
import AlgorithmsDashboard from 'pages/algorithms/dashboard/AlgorithmsDashboard';
import GDStepper from 'pages/algorithms/gradient_descent/slides/GDStepper';
import { Box, Typography } from '@mui/material';
import { LeftItem } from 'pages/algorithms/dashboard/utils';
import GradientDescent1D from 'pages/algorithms/gradient_descent/slides/GradientDescent1D';
import {useTranslation} from "react-i18next";

export default function GD2() {
    const [t] = useTranslation('translation');
    return (
        <AlgorithmsDashboard
            stepper={<GDStepper activeStep={1} />}
            component={
                <Box>
                    <LeftItem>
                        <Typography>
                        {t("gd.enter_func")}
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
