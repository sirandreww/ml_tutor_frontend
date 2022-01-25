// ------------------------ IMPORTS ------------------------  
import * as React from 'react';
import AlgorithmsDashboard from 'pages/algorithms/dashboard/AlgorithmsDashboard';
import GDStepper from 'pages/algorithms/gradient_descent/slides/GDStepper';
import { Box, Typography } from '@mui/material';
import {languageAlign, languageDirection, LeftItem} from 'pages/algorithms/dashboard/utils';
import GradientDescent1D from 'pages/algorithms/gradient_descent/slides/GradientDescent1D';
import {useTranslation} from "react-i18next";

export default function GD3() {
    const [t] = useTranslation('translation');
    return (
        <AlgorithmsDashboard
            stepper={<GDStepper activeStep={2} />}
            component={
                <Box>
                    <LeftItem>
                        <Typography  sx={{ color: 'black', fontSize: '1rem', textAlign: languageAlign(), direction: languageDirection() }}>
                        {t("gd.try_calc")}
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
