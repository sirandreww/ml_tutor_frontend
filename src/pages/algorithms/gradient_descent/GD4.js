// ------------------------ IMPORTS ------------------------  
import * as React from 'react';
import AlgorithmsDashboard from 'pages/algorithms/dashboard/AlgorithmsDashboard';
import GDStepper from 'pages/algorithms/gradient_descent/slides/GDStepper';
import GradientDescent1D from "pages/algorithms/gradient_descent/slides/GradientDescent1D";
import { Typography, Box } from '@mui/material';
import {languageAlign, languageDirection, LeftItem} from 'pages/algorithms/dashboard/utils';
import {useTranslation} from "react-i18next";

export default function GD4() {
    const [t] = useTranslation('translation');
    return (
        <AlgorithmsDashboard
            stepper={<GDStepper activeStep={3} />}
            component={
                <Box>
                    <LeftItem>
                        <Typography  sx={{ color: 'black', fontSize: '1rem', textAlign: languageAlign(), direction: languageDirection() }}>
                            {t("gd.search_alpha")}
                        </Typography>
                    </LeftItem>
                    <GradientDescent1D
                        alphaType='slider'
                        buttonsType='hyperParameter'
                        generateQuestionTable={false}
                    />
                </Box>
            }
            previous="/algorithms/gd3"
            isPreviousDisabled={false}
            next="/algorithms/gd5"
            isNextDisabled={false}
        />
    );
}
