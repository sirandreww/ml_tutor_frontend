// ------------------------ IMPORTS ------------------------  
import React from 'react';
import AlgorithmsDashboard from 'pages/algorithms/dashboard/AlgorithmsDashboard';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { languageAlign, languageDirection } from "../dashboard/utils";


export default function GD9() {
    const [t] = useTranslation('translation')
    return (
        <AlgorithmsDashboard
            currentAlgorithmName="gd"
            activeStep={8}
            component={
                <Typography sx={{ mt: 2, mb: 1, textAlign: languageAlign(), direction: languageDirection() }}>
                    {t("gd.end")}
                </Typography>
            }
            previous="/algorithms/gd8"
            isPreviousDisabled={false}
            next="/algorithms"
            isNextDisabled={false}
        />
    );
}

