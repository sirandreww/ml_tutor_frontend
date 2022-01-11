// ------------------------ IMPORTS ------------------------  
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Button, Container } from '@mui/material';
import Typography from '@mui/material/Typography';

import GradientDescent1D from './slides/GradientDescent1D.js';
import GradientDescent2D from './slides/GradientDescent2D.js';

const steps = ['task 1', 'task 2', 'task 3', 'task 4', 'task 5', 'task 6'];

export default function GradientDescent() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    
    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    // if (isStepOptional(index)) {
                    //     labelProps.optional = (
                    //         <Typography variant="caption">Optional</Typography>
                    //     );
                    // }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Container maxWidth="md">
                        <Box height={50} />
                        {/* First Slide */}
                        {(activeStep === 0) && (
                            <GradientDescent1D 
                                alphaType = 'input'
                                buttonsType = 'playGround'
                                generateQuestionTable = { false }
                            />
                        )}

                        {(activeStep === 1) && (
                            <GradientDescent1D 
                                alphaType = 'input'
                                buttonsType = 'stepByStep'
                                generateQuestionTable = { true }
                            />
                        )}

                        {(activeStep === 2) && (
                            <GradientDescent1D 
                                alphaType = 'slider'
                                buttonsType = 'hyperParameter'
                                generateQuestionTable = { false }
                            />
                        )}

                        {(activeStep === 3) && (
                            // <GradientDescentSlide4 />
                            <GradientDescent2D 
                                alphaType = 'input'
                                buttonsType = 'playGround'
                                generateQuestionTable = { false }
                            />
                        )}

                        {(activeStep === 4) && (
                            // <GradientDescentSlide5 />
                            <GradientDescent2D 
                                alphaType = 'input'
                                buttonsType = 'stepByStep'
                                generateQuestionTable = { true }
                            />
                        )}

                        {(activeStep === 5) && (
                            // <GradientDescentSlide6 />
                            <GradientDescent2D 
                                alphaType = 'slider'
                                buttonsType = 'hyperParameter'
                                generateQuestionTable = { false }
                            />
                        )}
                        <Box height={50} />
                    </Container>
                    
                    {/* slide managing code */}
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {/* {isStepOptional(activeStep) && (
                            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                Skip
                            </Button>
                        )} */}

                        <Button onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
            <Box height={50} />
        </Box>
    );
}

