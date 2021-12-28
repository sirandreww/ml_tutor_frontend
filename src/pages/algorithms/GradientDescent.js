import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import functionPlot from "function-plot";

// --------------------------------------------------------
import { create, all } from 'mathjs';
const math = create(all, {})

function getDev(f,v) {
    try {
        return math.derivative(f,v).toString()
    }
    catch (_) {
        return '0'
    }
}

function getGraph(f, v) {
    let width = 600;
    let height = 450;

    functionPlot({
        target: "#plot1",
        width,
        height,
        xAxis: { domain: [-20, 20] },
        yAxis: { domain: [-15, 15] },
        title: f,
        grid: true,
        data: [
            {
                fn: f,
                derivative: {
                    fn: getDev(f, v),
                    updateOnMouseMove: true
                },
            },
            {
                points: [
                  [0, math.evaluate(f, {'x': 0})],
                  [1, math.evaluate(f, {'x': 1})],
                  [2, math.evaluate(f, {'x': 2})],
                  [3, math.evaluate(f, {'x': 3})],
                  [4, math.evaluate(f, {'x': 4})],
                ],
                fnType: 'points',
                graphType: 'scatter'
            },
            {
                vector: [-3, -3],
                offset: [2, 4],
                graphType: 'polyline',
                fnType: 'vector'
            }
        ]
    });
}

function getGraph2() {
    return (<Box>
        Hello World
    </Box>);
}
// --------------------------------------------------------

const steps = ['GD introduction', 'task 1', 'task 2', 'task 3', 'task 4', 'task 5'];

export default function GradientDescent() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const [myfun, setFun] = React.useState('x^2')
    const [alpha, setAlpha] = React.useState(1)

    // const isStepOptional = (step) => {
    //     return step === 1;
    // };

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

    // const handleSkip = () => {
    //     if (!isStepOptional(activeStep)) {
    //         // You probably want to guard against something like this,
    //         // it should never occur unless someone's actively trying to break something.
    //         throw new Error("You can't skip a step that isn't optional.");
    //     }

    //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
    //     setSkipped((prevSkipped) => {
    //         const newSkipped = new Set(prevSkipped.values());
    //         newSkipped.add(activeStep);
    //         return newSkipped;
    //     });
    // };

    const handleReset = () => {
        setActiveStep(0);
    };

    const plotRef = React.useRef();

    React.useEffect(() => {
        try {
            getGraph(myfun, 'x')
        }
        catch (_) {
            getGraph('0', 'x')
        }
    }, [myfun]);
    
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

                    {/* First Slide */}
                    {(activeStep === 0) && (
                        <div>
                            <Typography sx={{ mt: 2 }}>Gradient descent is an iterative algorithm for finding a local minimum.</Typography>
                            <Typography>The idea is to take repeated steps in the opposite direction of the gradient (derivative) of the function at the current point.</Typography>
                            <Typography sx={{ mb: 1 }}>Take this function for example:</Typography>
                            <div id="plot1">
                                <lable>f(x):</lable>
                                <br/>
                                <input type='text' onChange={event => setFun(event.target.value)}/>
                                <br/>
                                <lable>alpha:</lable>
                                <br/>
                                <input type='text' onChange={event => setAlpha(event.target.value)}/>
                                
                                <p>{getDev(myfun, 'x')}</p>
                                {/* <svg ref={plotRef}></svg> */}
                                {getGraph2()}
                                <button onClick={()=> setFun('0.001*(x^4 - 100*x^2)')}>Calculate</button>
                            </div>
                        </div>
                    )}







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
        </Box>
    );
}