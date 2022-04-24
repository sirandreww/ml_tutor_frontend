// ------------------------ IMPORTS ------------------------  
import AlgorithmsDashboard from 'components/AlgorithmsDashboard';
import { Box, Typography } from '@mui/material';
import { languageAlign, languageDirection, LeftItem } from 'components/LanguageAndButtonUtility';
import Grid from "@mui/material/Grid";
import LinearRegressionP4 from 'components/linear_regression/LinearRegressionPage4';


export default function LR4() {
    return (
        <AlgorithmsDashboard
            currentAlgorithmName="lr"
            currentStep={4}
            component={
            <Box>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, }}>
                    <Grid item xs={12}>
                        <LeftItem>
                            <Typography sx={{ color: 'black', fontSize: '1rem', textAlign: languageAlign(), direction: languageDirection() }}>
                            Now it's your turn! you're given a partial table from the Iris Database, where X is the Sepal length, and Y is the Sepal width of the flower.
                            Your mission is to calculate the parameters in order to form the correct model.
                            Below, you will see the correct model representation in blue, and your model will
                            appear in red.
                            Good Luck!
                            </Typography>
                        </LeftItem>
                    </Grid>
                    <Grid item xs={12}>
                        <LinearRegressionP4/>
                    </Grid>
                </Grid>
            </Box>
            }
        />
    );
}
