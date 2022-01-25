// ------------------------ IMPORTS ------------------------  
import * as React from 'react';
import AlgorithmsDashboard from 'pages/algorithms/dashboard/AlgorithmsDashboard';
import GDStepper from 'pages/algorithms/gradient_descent/slides/GDStepper';
import GradientDescent2D from "pages/algorithms/gradient_descent/slides/GradientDescent2D";
import { Typography, Box } from '@mui/material';
import {languageAlign, languageDirection, LeftItem} from 'pages/algorithms/dashboard/utils';
import {useTranslation} from "react-i18next";

export default function GD7() {
    const [t] = useTranslation('translation')
    return (
        <AlgorithmsDashboard
            stepper={<GDStepper activeStep={6} />}
            component={
                <Box>
                    <LeftItem>
                        <Typography  sx={{ color: 'black', fontSize: '1rem', textAlign: languageAlign(), direction: languageDirection() }}>
                            {t("gd.challenge")}
                        </Typography>
                    </LeftItem>
                    <GradientDescent2D
                        alphaType='input'
                        buttonsType='stepByStep'
                        generateQuestionTable={true}
                    />
                </Box>
            }
            previous="/algorithms/gd6"
            isPreviousDisabled={false}
            next="/algorithms/gd8"
            isNextDisabled={false}
        />
    );
}
