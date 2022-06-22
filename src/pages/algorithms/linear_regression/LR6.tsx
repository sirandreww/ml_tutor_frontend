// // ------------------------ IMPORTS ------------------------  
// import React from 'react';
// import AlgorithmsDashboard from 'components/AlgorithmsDashboard';
// import CSVTable from 'components/CSVTable';
// import LinearRegressionP6 from 'components/linear_regression/LinearRegressionPage6';


// export default function LR5() {
//     return (
//         <AlgorithmsDashboard
//             currentAlgorithmName="lr"
//             currentStep={6}
//             component={<LinearRegressionP6/>}
//         />
//     );
// }
// ------------------------ IMPORTS ------------------------  
import AlgorithmsDashboard from 'components/AlgorithmsDashboard';
import { Box, Typography } from '@mui/material';
import { languageAlign, languageDirection, LeftItem } from 'components/LanguageAndButtonUtility';
import Grid from "@mui/material/Grid";
import LinearRegressionP6 from 'components/linear_regression/LinearRegressionPage6';
import { button,CenterItem, mathJaxConfig, mathJaxStyle } from 'components/LanguageAndButtonUtility';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { useTranslation } from "react-i18next";



export default function LR6() {
    const [t] = useTranslation('translation');
    const tab = <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    const headers_style = {fontFamily: 'Arial, Helvetica, sans-serif'}
    return (
        <AlgorithmsDashboard
            currentAlgorithmName="lr"
            currentStep={6}
            component={
            <Box>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, }}>
                    <Grid item xs={12}>
                        <LeftItem>
                        <MathJaxContext version={3} config={mathJaxConfig}>
                        <Typography sx={{ color: 'black', fontSize: '1rem', textAlign: languageAlign(), direction: languageDirection() }}>
                            <h4 style={headers_style}>{t("lr.p6.task")}</h4><br/>
                            {t("lr.p6.desc1")}<MathJax style={mathJaxStyle} inline>{"\\(w\\)"}</MathJax> {t("lr.p6.desc2")} <MathJax style={mathJaxStyle} inline>{"\\(b\\)"}</MathJax>,
                            {t("lr.p6.desc3")}<MathJax style={mathJaxStyle} inline>{"\\(\\alpha\\)"}</MathJax> = 0.01.
                            <br/>{t("lr.p6.desc4")}
                            </Typography>
                        </MathJaxContext>
                        </LeftItem>
                    </Grid>
                    <Grid item xs={12}>
                        <LinearRegressionP6/>
                    </Grid>
                </Grid>
            </Box>
            }
        />
    );
}
