// ------------------------ IMPORTS ------------------------  
import React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';


type Props = {
    currentStep: number,
    stepNames: string[],
    currentAlgorithmName: ("gd" | "lr")
}

export default function AlgorithmStepper(props: Props) {
    const [t] = useTranslation('translation')

    return (
        <Stepper activeStep={props.currentStep - 1}>
            {props.stepNames.map((label: string, index: number) => {
                const pathOnClick = "/algorithms/".concat(props.currentAlgorithmName).concat((index + 1).toString())
                const stepProps = {};
                const labelProps = {};
                return (
                    <Step key={label} {...stepProps}>
                        <Link to={pathOnClick} style={{ textDecoration: 'none' }}>
                            <StepLabel {...labelProps}>{t("".concat(props.currentAlgorithmName.toString()).concat(".tasks.").concat(label))}</StepLabel>
                        </Link>
                    </Step>
                );
            })}
        </Stepper>);
}
