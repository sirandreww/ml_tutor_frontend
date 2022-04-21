// ------------------------ IMPORTS ------------------------  
import React from 'react';
import AlgorithmsDashboard from 'components/AlgorithmsDashboard';
import LogisticRegression from "../../../components/logistic_regression/LogisticRegression";
import Grid from "@mui/material/Grid";
import {languageAlign, languageDirection, LeftItem} from "../../../components/LanguageAndButtonUtility";
import {Box, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";

export default function LogReg8() {
    const [t] = useTranslation('translation');

    return (
        <AlgorithmsDashboard
            currentAlgorithmName="gd"
            currentStep={8}
            component={
                <Box>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, }}>
                        <Grid item xs={12}>
                            <LeftItem>
                                <Typography sx={{ color: 'black', fontSize: '1rem', textAlign: languageAlign(), direction: languageDirection() }}>
                                    In this task will learn how the alpha, number of iterations and the size of training batch affects the accuracy of our model.<br/>
                                    We will take the Iris datasets which contains the following data of the Iris flower:<br/>
                                    1. Sepal Length (in centimeters).<br/>
                                    2. Sepal Width (in centimeters).<br/>
                                    3. Petal Length (in centimeters).<br/>
                                    3. PetalWidth (in centimeters).<br/>
                                    <br/>
                                    The dataset contains 3 types of Iris flowers (for each type we have 50 samples):<br/>
                                    1. Setosa.<br/>
                                    2. Versicolor.<br/>
                                    3. Virginica.<br/>
                                    <br/>
                                    Please insert the desired alpha, number of iterations and the percentage of the dataset to be our training batch (the rest is the test batch),<br/>
                                    We will calculate the accuracy of the trained model based on the input, try to find the best parameters!<br/>
                                </Typography>
                            </LeftItem>
                        </Grid>
                        <Grid item xs={12}>
                            <LogisticRegression
                                alphaType='slider'
                                percentageType='slider'
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