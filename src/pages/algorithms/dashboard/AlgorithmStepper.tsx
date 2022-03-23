// ------------------------ IMPORTS ------------------------  
import React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useTranslation } from "react-i18next";



type Props = {
    currentStep: number,
    stepNames: string[],
    isStepSkipped: boolean,
}

export default function AlgorithmStepper(props) {
    const [t] = useTranslation('translation')

    return (
        <Stepper activeStep={props.currentStep}>
            {props.stepNames.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (props.isStepSkipped) {
                    stepProps.completed = false;
                }
                return (
                    <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{t("gd.tasks.".concat(label))}</StepLabel>
                    </Step>
                );
            })}
        </Stepper>);
}
