// ------------------------ IMPORTS ------------------------  
import React from 'react';
import AlgorithmsDashboard from 'components/AlgorithmsDashboard';
import { Box, Typography } from '@mui/material';
import { languageAlign, languageDirection, LeftItem } from 'components/LanguageAndButtonUtility';
import GradientDescent1D from 'components/GradientDescentGenericPage1D';
import { useTranslation } from "react-i18next";
import Grid from "@mui/material/Grid";

export default function GD3() {
    const [t] = useTranslation('translation');
    return (
        <AlgorithmsDashboard
            currentAlgorithmName="gd"
            currentStep={3}
            component={
                <Box>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, }}>
                        <Grid item xs={12}>
                            <LeftItem>
                                <Typography sx={{ color: 'black', fontSize: '1rem', textAlign: languageAlign(), direction: languageDirection() }}>
                                    {t("gd.try_calc")}
                                </Typography>
                            </LeftItem>
                        </Grid>
                        <Grid item xs={12}>
                            <GradientDescent1D
                                alphaType='input'
                                buttonsType='stepByStep'
                                generateQuestionTable={true}
                            />
                        </Grid>
                    </Grid>
                </Box>
            }
        />
    );
}
