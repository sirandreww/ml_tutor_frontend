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
                             It's time to see the model in action. 
                             Add points and edit the values as you want, you'll see the parameters being calculated on the go
                             and the Linear line which represents the model's predictions forms on the graph below.
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
