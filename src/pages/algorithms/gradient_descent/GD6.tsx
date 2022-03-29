// ------------------------ IMPORTS ------------------------  
import React from 'react';
import AlgorithmsDashboard from 'pages/algorithms/dashboard/AlgorithmsDashboard';
import GradientDescent2D from "pages/algorithms/gradient_descent/slides/GradientDescent2D";
import { Typography, Box } from '@mui/material';
import { languageAlign, languageDirection, LeftItem } from 'pages/algorithms/dashboard/utils';
import { useTranslation } from "react-i18next";
import Grid from "@mui/material/Grid";

export default function GD6() {
    const [t] = useTranslation('translation')
    return (
        <AlgorithmsDashboard
            currentAlgorithmName="gd"
            currentStep={5}
            component={
                <Box>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, }}>
                        <Grid item xs={12}>
                            <LeftItem>
                                <Typography sx={{ color: 'black', fontSize: '1rem', textAlign: languageAlign(), direction: languageDirection() }}>
                                    {t("gd.you_try")}
                                </Typography>
                            </LeftItem>
                        </Grid>
                        <Grid item xs={12}>
                            <GradientDescent2D
                                alphaType='input'
                                buttonsType='playGround'
                                generateQuestionTable={false}
                            />
                        </Grid>
                    </Grid>
                </Box>
            }
            previous="/algorithms/gd5"
            isPreviousDisabled={false}
            next="/algorithms/gd7"
            isNextDisabled={false}
        />
    );
}
