// ------------------------ IMPORTS ------------------------
import React from 'react';
import AlgorithmsDashboard from 'components/AlgorithmsDashboard';
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { languageAlign, languageDirection, LeftItem } from "../../../components/LanguageAndButtonUtility";
import LogisticRegressionStepByStep from "../../../components/logistic_regression/LogisticRegressionStepByStep";

export default function LogReg6() {
    // header style
    const headers_style = { fontFamily: 'Arial, Helvetica, sans-serif' }

    return (
        <AlgorithmsDashboard
            currentAlgorithmName="logreg"
            currentStep={6}
            component={
                <Box>
                    <Typography sx={{ width: "100%", textAlign: 'center', direction: 'ltr' }}>
                        <h1 style={headers_style}>Step By Step Training</h1>
                    </Typography>
                    <br />
                    <br />
                    <br />
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, }}>
                        <Grid item xs={12}>
                            <LeftItem>
                                <Typography sx={{ color: 'black', fontSize: '1rem', textAlign: languageAlign(), direction: languageDirection() }}>
                                    In this task will learn calculate how we train a module step by step.<br />

                                </Typography>
                            </LeftItem>
                        </Grid>
                        <Grid item xs={12}>
                            <LogisticRegressionStepByStep />
                        </Grid>
                    </Grid>
                </Box>
            }
        />
    );
}
