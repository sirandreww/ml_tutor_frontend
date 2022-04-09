// ------------------------ IMPORTS ------------------------  
import React from 'react';
import AlgorithmsDashboard from 'components/AlgorithmsDashboard';
import { Box, Typography } from '@mui/material';
import { languageAlign, languageDirection, LeftItem } from 'components/LanguageAndButtonUtility';
import GradientDescent1D from 'components/GradientDescentGenericPage1D';
import { useTranslation } from "react-i18next";
import Grid from "@mui/material/Grid";
import LinearRegression1D from 'components/LinearRegressionGenericPage1D';

export default function LR2() {
    return (
        <AlgorithmsDashboard
            currentAlgorithmName="lr"
            currentStep={2}
            component={
                <Box>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, }}>
                    <Grid item xs={12}>
                        <LinearRegression1D
                            // alphaType='input'
                            // buttonsType='playGround'
                            // generateQuestionTable={false}
                        />
                    </Grid>
                </Grid>
            </Box>
            }
        />
    );
}
