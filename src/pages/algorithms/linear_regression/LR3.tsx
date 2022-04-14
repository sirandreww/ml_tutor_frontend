// ------------------------ IMPORTS ------------------------  
import React from 'react';
import AlgorithmsDashboard from 'components/AlgorithmsDashboard';
import { Box, Typography } from '@mui/material';
import { languageAlign, languageDirection, LeftItem } from 'components/LanguageAndButtonUtility';
import GradientDescent1D from 'components/GradientDescentGenericPage1D';
import { useTranslation } from "react-i18next";
import Grid from "@mui/material/Grid";
import LinearRegressionP3 from 'components/LinearRegressionPage3';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { randomInt } from '@mui/x-data-grid-generator';

export default function LR3() {
    return (
        <AlgorithmsDashboard
            currentAlgorithmName="lr"
            currentStep={3}
            component={
            <Box>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, }}>
                    <Grid item xs={12}>
                        <LeftItem>
                            <Typography sx={{ color: 'black', fontSize: '1rem', textAlign: languageAlign(), direction: languageDirection() }}>
                            In this example we will try to predict the housing prices (in millions) according to the number of rooms.
                            The table contains data of housing prices. below, there are the parameters needed in order to evaluate the prediction of the model, the Regression function, and finally, the graph with the regression line.
                            </Typography>
                        </LeftItem>
                    </Grid>
                    <Grid item xs={12}>
                        <LinearRegressionP3/>
                    </Grid>
                </Grid>
            </Box>
            }
        />
    );
}
