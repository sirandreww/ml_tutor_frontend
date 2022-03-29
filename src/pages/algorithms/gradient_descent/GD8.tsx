// ------------------------ IMPORTS ------------------------  
import React from 'react';
import AlgorithmsDashboard from 'components/AlgorithmsDashboard';
import GradientDescent2D from "pages/algorithms/gradient_descent/slides/GradientDescent2D";
import { Typography, Box } from '@mui/material';
import { languageAlign, languageDirection, LeftItem } from 'components/LanguageAndButtonUtility';
import { useTranslation } from "react-i18next";
import Grid from "@mui/material/Grid";

export default function GD8() {
    const [t] = useTranslation('translation');
    return (
        <AlgorithmsDashboard
            currentAlgorithmName="gd"
            currentStep={7}
            component={
                <Box>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, }}>
                        <Grid item xs={12}>
                            <LeftItem>
                                <Typography sx={{ color: 'black', fontSize: '1rem', textAlign: languageAlign(), direction: languageDirection() }}>
                                    {t("gd.search_alpha")}
                                </Typography>
                            </LeftItem>
                        </Grid>
                        <Grid item xs={12}>
                            <GradientDescent2D
                                alphaType='slider'
                                buttonsType='hyperParameter'
                                generateQuestionTable={false}
                            />
                        </Grid>
                    </Grid>
                </Box>
            }
            previous="/algorithms/gd7"
            isPreviousDisabled={false}
            next="/algorithms/gd9"
            isNextDisabled={false}
        />
    );
}
