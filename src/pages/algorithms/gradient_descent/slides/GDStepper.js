// ------------------------ IMPORTS ------------------------  
import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';


const steps = [
    '1D Introduction', 
    'Visualization', 
    'Step By Step', 
    'Hyper-Parameter', 
    '2D Introduction', 
    'Visualization', 
    'Step By Step', 
    'Hyper-Parameter'
];

export default function GDStepper(props) {
    return (
    <Stepper activeStep={props.activeStep}>
        {steps.map((label) => {
            const stepProps = {};
            const labelProps = {};
            if (props.isStepSkipped) {
                stepProps.completed = false;
            }
            return (
                <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
            );
        })}
    </Stepper>);
}
