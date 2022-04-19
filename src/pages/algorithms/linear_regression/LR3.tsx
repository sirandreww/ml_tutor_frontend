// ------------------------ IMPORTS ------------------------  
import AlgorithmsDashboard from 'components/AlgorithmsDashboard';
import { Box, Typography } from '@mui/material';
import { languageAlign, languageDirection, LeftItem } from 'components/LanguageAndButtonUtility';
import Grid from "@mui/material/Grid";
import LinearRegressionP3 from 'components/linear_regression/LinearRegressionPage3';


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
