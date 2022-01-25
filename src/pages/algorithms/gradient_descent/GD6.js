// ------------------------ IMPORTS ------------------------  
import * as React from 'react';
import AlgorithmsDashboard from 'pages/algorithms/dashboard/AlgorithmsDashboard';
import GDStepper from 'pages/algorithms/gradient_descent/slides/GDStepper';
import GradientDescent2D from "pages/algorithms/gradient_descent/slides/GradientDescent2D";
import { Typography, Box } from '@mui/material';
import {languageAlign, languageDirection, LeftItem} from 'pages/algorithms/dashboard/utils';
import {useTranslation} from "react-i18next";
import Grid from "@mui/material/Grid";

export default function GD6() {
    const [t] = useTranslation('translation')
    return (
        <AlgorithmsDashboard
            stepper={<GDStepper activeStep={5} />}
            component={
                <Box>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, }}>
                        <Grid item xs={12}>
                            <LeftItem>
                                <Typography  sx={{ color: 'black', fontSize: '1rem', textAlign: languageAlign(), direction: languageDirection() }}>
                                    {t("gd.you_try")}

                                </Typography>
                            </LeftItem>
                        </Grid>
                        <Grid item xs={12}></Grid>
                    </Grid>
                    <GradientDescent2D
                        alphaType='input'
                        buttonsType='playGround'
                        generateQuestionTable={false}
                    />
                </Box>
            }
            previous="/algorithms/gd5"
            isPreviousDisabled={false}
            next="/algorithms/gd7"
            isNextDisabled={false}
        />
    );
}
