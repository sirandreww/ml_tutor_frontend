// ------------------------ IMPORTS ------------------------  
import React from 'react';
import AlgorithmsDashboard from 'components/AlgorithmsDashboard';
import GradientDescent1D from "components/gradient_descent/GradientDescentGenericPage1D";
import { Typography, Box } from '@mui/material';
import { languageAlign, languageDirection, LeftItem } from 'components/LanguageAndButtonUtility';
import { useTranslation } from "react-i18next";
import Grid from "@mui/material/Grid";

export default function GD4() {
    const [t] = useTranslation('translation');
    return (
        <AlgorithmsDashboard
            currentAlgorithmName="gd"
            currentStep={4}
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
                            <GradientDescent1D
                                alphaType='slider'
                                buttonsType='hyperParameter'
                                generateQuestionTable={false}
                            />
                        </Grid>
                    </Grid>
                </Box>
            }
        />
    );
}
