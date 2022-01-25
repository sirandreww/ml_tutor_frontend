// ------------------------ IMPORTS ------------------------  
import * as React from 'react';
import AlgorithmsDashboard from 'pages/algorithms/dashboard/AlgorithmsDashboard';
import GDStepper from 'pages/algorithms/gradient_descent/slides/GDStepper';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';


export default function GD9() {
    const [t] = useTranslation('translation')
    return (
        <AlgorithmsDashboard
            stepper={<GDStepper activeStep={8} />}
            component={
                <Typography sx={{ mt: 2, mb: 1 }}>
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

