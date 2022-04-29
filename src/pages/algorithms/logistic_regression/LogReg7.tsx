// ------------------------ IMPORTS ------------------------  
import React from 'react';
import AlgorithmsDashboard from 'components/AlgorithmsDashboard';
import Grid from "@mui/material/Grid";
import { languageAlign, languageDirection, LeftItem } from "../../../components/LanguageAndButtonUtility";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import LogisticRegressionHyperParameter from "../../../components/logistic_regression/LogisticRegressionHyperParameter";

const translation_path = "logreg.pages.hp."
export default function LogReg7() {
    // header style
    const headers_style = { fontFamily: 'Arial, Helvetica, sans-serif' }

    const [t] = useTranslation('translation');

    return (
        <AlgorithmsDashboard
            currentAlgorithmName="logreg"
            currentStep={7}
            component={
                <Box>
                    <Typography sx={{ width: "100%", textAlign: 'center', direction: 'ltr' }}>
                        <h1 style={headers_style}>{t("logreg.pages.hp_title")}</h1>
                    </Typography>
                    <br />
                    <br />
                    <br />
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, }}>
                        <Grid item xs={12}>
                            <LeftItem>
                                <Typography sx={{ color: 'black', fontSize: '1rem', textAlign: languageAlign(), direction: languageDirection() }}>
                                    {t(translation_path.concat("intro"))}.<br />
                                    1. {t(translation_path.concat("sp_length"))}.<br />
                                    2. {t(translation_path.concat("sp_width"))}.<br />
                                    3. {t(translation_path.concat("pe_length"))}.<br />
                                    3. {t(translation_path.concat("pe_width"))}.<br />
                                    <br />
                                    {t(translation_path.concat("dataset"))}:<br />
                                    1. {t(translation_path.concat("setosa"))}.<br />
                                    2. {t(translation_path.concat("versicolor"))}.<br />
                                    3. {t(translation_path.concat("virginica"))}.<br />
                                    <br />
                                    {t(translation_path.concat("task"))}<br />
                                </Typography>
                            </LeftItem>
                        </Grid>
                        <Grid item xs={12}>
                            <LogisticRegressionHyperParameter />
                        </Grid>
                    </Grid>
                </Box>
            }
        />
    );
}