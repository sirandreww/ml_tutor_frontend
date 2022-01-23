// ------------------------ IMPORTS ------------------------  
import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import {useTranslation} from "react-i18next";


const steps = [
    "1d_int",
    "1d_vis",
    "1d_sbs",
    "1d_hyp",
    "2d_int",
    "2d_vis",
    "2d_sbs",
    "2d_hyp"
];

export default function GDStepper(props) {
    const [t] = useTranslation('translation')

    return (
        <Stepper activeStep={props.activeStep}>
        {steps.map((label, index) => {
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
