// ------------------------ IMPORTS ------------------------  
import React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';
import { Typography, Box, Stack } from '@mui/material';


type Props = {
    currentStep: number,
    stepNames: string[],
    currentAlgorithmName: ("gd" | "lr" | "logreg" | "nn")
}

export default function AlgorithmStepper(props: Props) {
    const [t] = useTranslation('translation')

    return (
        <Stepper activeStep={props.currentStep - 1}>
            {props.stepNames.map((label: string, index: number) => {
                const pathOnClick = "/algorithms/".concat(props.currentAlgorithmName).concat((index + 1).toString())
                return (
                    <Step key={label}>
                        <Link to={pathOnClick} style={{ textDecoration: 'none' }}>
                            <StepLabel>
                                <Stack direction="row" spacing={0}>
                                    <Box sx={{ m: "4px" }} />
                                    <Typography>
                                        {t("".concat(props.currentAlgorithmName.toString())
                                            .concat(".tasks.").concat(label))}
                                    </Typography>
                                    {/* <Box sx={{ m: 1 }} /> */}
                                </Stack>
                            </StepLabel>
                        </Link>
                    </Step>
                );
            })}
        </Stepper>);
}
