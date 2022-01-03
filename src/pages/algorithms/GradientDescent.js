import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Typography from '@mui/material/Typography';
import functionPlot from "function-plot";
import { create, all, clone } from 'mathjs';
import Plotly from 'plotly.js-dist-min'
import { IconButton } from '@mui/material';

// --------------------------------------------------------
// import * as vis from 'vis'
// import * as vis3 from 'vis-graph3d'
// var data = null;
// var graph = null;

// function custom(x, y) {
//     return (Math.sin(x/50) * Math.cos(y/50) * 50 + 50);
// }

// function drawVisualization() {
//     data = new vis.DataSet();
//     var counter = 0;
//     var steps = 50;  // number of datapoints will be steps*steps
//     var axisMax = 314;
//     var axisStep = axisMax / steps;
//     for (var x = 0; x < axisMax; x+=axisStep) {
//         for (var y = 0; y < axisMax; y+=axisStep) {
//             var value = custom(x,y);
//             data.add({id:counter++,x:x,y:y,z:value,style:value});
//         }
//     }

//     // specify options
//     var options = {
//     width:  '600px',
//     height: '600px',
//     style: 'surface',
//     showPerspective: true,
//     showGrid: true,
//     showShadow: false,
//     keepAspectRatio: true,
//     verticalRatio: 0.5
//     };

    
//     // Instantiate our graph object.
//     var container = document.getElementById('mygraph');
//     graph = new vis.Graph3d(container, data, options);

//     data = new vis.DataSet();
//     data.add({x:1,y:1,z:1,style:1});
//     var options = {
//         width: "600px",
//         height: "600px",
//         style: "dot-size",
//         showPerspective: false,
//         showGrid: true,
//         keepAspectRatio: true,
//         legendLabel: "value",
//         verticalRatio: 1.0,
//         cameraPosition: {
//           horizontal: -0.54,
//           vertical: 0.5,
//           distance: 1.6,
//         },
//         dotSizeMinFraction: 0.5,
//         dotSizeMaxFraction: 2.5,
//       };

//       var container = document.getElementById('mygraph');
//     graph = new vis.Graph3d(container, data, options);
// }
// --------------------------------------------------------



const InputItem = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "left",
    color: theme.palette.text.secondary
}));

const OutputItem = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
}));

const ControlItem = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "right",
    color: theme.palette.text.secondary
}));

const math = create(all, {})

function getDev(f,v) {
    try {
        return math.derivative(f,v).toString()
    }
    catch (e) {
        console.log('error at getDev(f,v) => \n', e)
        return '0'
    }
}

function getPoints2D(f, startX, startY, steps_count, alpha) {
    var dfx = getDev(f,'x')
    var dfy = getDev(f,'y')
    var prevX = parseFloat(startX)
    var prevY = parseFloat(startY)
    steps_count = parseFloat(steps_count)
    alpha = parseFloat(alpha)

    var points = {
        x: [prevX],
        y: [prevY],
        z: [math.evaluate(f, {'x': startX, 'y': startY})]
    }

    // console.log("f=", f, "dfx=", dfx, "dfy=", dfy, " startX=", startX, " steps_count=", steps_count, " alpha=", alpha)

    for (let i = 0; i < steps_count; i++) {
        // console.log("i=", i)

        var tmpX = math.evaluate('alpha*('.concat(dfx).concat(')'), {'alpha': alpha, 'x': prevX, 'y': prevY})
        var tmpY = math.evaluate('alpha*('.concat(dfy).concat(')'), {'alpha': alpha, 'x': prevX, 'y': prevY}) 
        var nextX = math.evaluate('prevX-tmpX', {'prevX': prevX, 'tmpX': tmpX})
        var nextY = math.evaluate('prevY-tmpY', {'prevY': prevY, 'tmpY': tmpY})
        var z = math.evaluate(f, {'x': nextX, 'y': nextY})
        
        // console.log('prevX=', prevX, ' prevY=', prevY, ' tmpX=', tmpX, ' tmpY=', tmpY, ' nextX=', nextX, ' nextY=', nextY )
        points.x.push(nextX)
        points.y.push(nextY)
        points.z.push(z)

        prevX = nextX
        prevY = nextY
    }

    // console.log("points = ", points)
    return points
}

function getData2D(f) {
    var data = {
        x: [],
        y: [],
        z: []
    }

    for (let y = -10; y < 11; y += 1)  {
        var new_y = [[], []]
        for (let x = -10; x < 11; x += 1)  {
            new_y[0].push(math.evaluate(f, {'x': x, 'y': y}))
            new_y[1].push(x)
        };
        data.x.push(new_y[1])
        data.y.push(y)
        data.z.push(new_y[0])
    }

    return data
}
function getGraph2D(data, points){
    // console.log('getGraph2D - \n')
    // console.log('data = ', data, '\n')
    // console.log('points = ', points, '\n')

    var z = []

    for (let y = -10; y < 11; y += 1)  {
        var new_y = []
        for (let x = -10; x < 11; x += 1)  {
            new_y.push(x)
        };
        z.push(new_y)
    }
    const data_z1 = {
        type: 'surface',
        x: data.x,
        y: data.y,
        z: data.z,
        colorscale: 'Viridis', 
        lighting: {
            roughness: 0.2
        }
    };
    const data_z2 = {
        type: 'scatter3d',
        mode: 'points',
        x: points.x,
        y: points.y,
        z: points.z,
        marker: {color: 'red'}
      };
    const layout = {
        xaxis: {
            range: [-5, 5]
        },
        yaxis: {
            range: [-5, 5]
        }
    }
    var config = {responsive: true}
    Plotly.newPlot('graph2-board', [data_z1, data_z2], layout, config);
}

function getPoints1D(f, startX, steps_count, alpha) {
    var points = [ [startX, math.evaluate(f, {'x': startX})] ]
    var df = getDev(f,'x')
    
    // console.log(startX)
    startX = parseFloat(startX)
    steps_count = parseFloat(steps_count)
    alpha = parseFloat(alpha)

    // console.log("f=", f, "df=", df, " startX=", startX, " steps_count=", steps_count, " alpha=", alpha)

    var prev = startX
    for (let i = 0; i < steps_count; i++) {
        // console.log("i=", i)
        var tmp = math.evaluate('alpha*('.concat(df).concat(')'), {'alpha': alpha, 'x': prev})
        // console.log("alpha*df = ", tmp) 
        var next = math.evaluate('prev-tmp', {'prev': prev, 'tmp': tmp})
        // console.log("next = ", next)
        points.push([next, math.evaluate(f, {'x': next})])
        prev = next
    }

    return points
}

function getGraph1D(f, points) {
    var width = 800;
    var height = 500;
    // console.log("points= \n", points)

    functionPlot({
        target: '#graph-board',
        width,
        height,
        xAxis: { domain: [-(points[0][0] + 2), points[0][0] + 2], label: 'x' },
        yAxis: { domain: [-(points[0][1] + 2), points[0][1] + 2], label: 'f(x)' },
        title: f,
        grid: true,
        data: [
            {
                fn: f,
                derivative: {
                    fn: getDev(f, 'x'),
                    updateOnMouseMove: true
                },
            },
            {
                points: points,
                fnType: 'points',
                graphType: 'polyline',
            }
        ]
    });
}


// --------------------------------------------------------

const steps = ['GD introduction', 'task 1', 'task 2', 'task 3', 'task 4', 'task 5'];

export default function GradientDescent() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const [myfun, setFun] = React.useState('x^2')
    const [alpha, setAlpha] = React.useState(1)
    const [startX, setStartX] = React.useState('0')
    const [startY, setStartY] = React.useState('0')
    const [ticking, setTicking] = React.useState(false)
    const [count, setCount] = React.useState(0)
    const [data2D, setData2D] = React.useState({x:[], y:[], z:[]})

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

    React.useEffect(() => {
        try {
            let points = null
            switch(activeStep) {
                case 0:
                    points = getPoints1D(clone(myfun), clone(startX), clone(count), clone(alpha))
                    getGraph1D(myfun, points)
                    break;
                case 1:
                    points = getPoints2D(clone(myfun), clone(startX), clone(startY), clone(count), clone(alpha))
                    if(count === 0) {
                        setData2D(getData2D(clone(myfun)))
                    }
                    getGraph2D(data2D, points)
                    break;

                default:
                    throw 'reach undefined case'.concat(activeStep.toString())
            }
        }
        catch (e) {
            console.log("error at useEffect => \n", e)
        }
    }, [myfun, alpha, startX, startY, count, activeStep]);

    // For Initial plot when the page loads for the first time
    React.useEffect(() => {
        try {
            let points = null
            switch(activeStep) {
                case 0:
                    points = getPoints1D(clone(myfun), clone(startX), clone(count), clone(alpha))
                    getGraph1D(myfun, points)
                    break;
                case 1:
                    points = getPoints2D(clone(myfun), clone(startX), clone(startY), clone(count), clone(alpha))
                    let data = getData2D(clone(myfun))
                    getGraph2D(data, points)
                    break;

                default:
                    throw 'reach undefined case'.concat(activeStep.toString())
            }
            
        }
        catch (e) {
            console.log("error at useEffect => \n", e)
        }
        const timer = setTimeout(() => ticking && setCount(count+1), 1e3)
        return () => clearTimeout(timer)
    });
    
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
                            <Box sx={{ width: "100%" }}>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1,}}>
                                    <Grid item xs={12}>
                                        <InputItem>
                                            <Typography sx={{color: 'black', fontSize: '1rem'}}>
                                                f(x):
                                                <br/>
                                                <input type='text' style={{width:'100%', height: '2rem'}} onChange={event => {setTicking(false); setCount(0); setFun(event.target.value)}}/>
                                            </Typography>
                                        </InputItem>
                                        <InputItem>
                                            <Typography sx={{color: 'black', fontSize: '1rem'}}>
                                                alpha:
                                                <br/>
                                                <input type='text' defaultValue={'1'} onChange={event => {setTicking(false); setCount(0); setAlpha(event.target.value)}}/>
                                            </Typography>
                                        </InputItem>
                                        <InputItem>
                                            <Typography sx={{color: 'black', fontSize: '1rem'}}>
                                                Starting point (x = <input type='text' style={{width:'5rem'}} defaultValue={'0'} onChange={event => {setTicking(false); setCount(0); setStartX(event.target.value)}}/>)
                                            </Typography>
                                        </InputItem>
                                        <InputItem>
                                            <Typography sx={{color: 'black', fontSize: '1rem'}}>
                                                The derivative of the function is:  {getDev(myfun, 'x')}
                                            </Typography>
                                        </InputItem>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <OutputItem>
                                            <div id='graph-board'></div>
                                        </OutputItem>
                                        <ControlItem>
                                            <IconButton aria-label="delete" size="large" color="error" onClick={()=> setCount(0)}>
                                                <ClearIcon fontSize="inherit" />
                                            </IconButton>
                                            <IconButton aria-label="delete" size="large" onClick={()=> setTicking(false)}>
                                                <PauseIcon fontSize="inherit" />
                                            </IconButton>
                                            <IconButton aria-label="delete" size="large" color="success" onClick={()=> setTicking(true)}>
                                                <PlayArrowIcon fontSize="inherit" />
                                            </IconButton>
                                            <p>{count}</p>
                                        </ControlItem>
                                    </Grid>
                                </Grid>
                            </Box>
                        </div>
                    )}

                    {(activeStep === 1) && (
                        <div>
                            <Box sx={{ width: "100%"}}>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1,}}>
                                    <Grid item xs={12}>
                                        <InputItem>
                                            <Typography sx={{color: 'black', fontSize: '1rem'}}>
                                                f(x, y):
                                                <br/>
                                                <input type='text' style={{width:'100%', height: '2rem'}} onChange={event => {setTicking(false); setCount(0); setFun(event.target.value)}}/>
                                            </Typography>
                                        </InputItem>
                                        <InputItem>
                                            <Typography sx={{color: 'black', fontSize: '1rem'}}>
                                                alpha:
                                                <br/>
                                                <input type='text' defaultValue={'1'} onChange={event => {setTicking(false); setCount(0); setAlpha(event.target.value)}}/>
                                            </Typography>
                                        </InputItem>
                                        <InputItem>
                                            <Typography sx={{color: 'black', fontSize: '1rem'}}>
                                                Starting point (
                                                    x = <input type='text' style={{width:'5rem'}} defaultValue={'0'} onChange={event => {setTicking(false); setCount(0); setStartX(event.target.value)}}/>,
                                                    y = <input type='text' style={{width:'5rem'}} defaultValue={'0'} onChange={event => {setTicking(false); setCount(0); setStartY(event.target.value)}}/>
                                                )
                                            </Typography>
                                        </InputItem>
                                        <InputItem>
                                            <Typography sx={{color: 'black', fontSize: '1rem'}}>
                                                The derivative of the function is:  f'(x) = {getDev(myfun, 'x')}, f'(y) = {getDev(myfun, 'y')}
                                            </Typography>
                                        </InputItem>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <OutputItem>
                                            <div id='graph2-board'></div>
                                        </OutputItem>
                                        <ControlItem>
                                        <IconButton aria-label="delete" size="large" color="error" onClick={()=> setCount(0)}>
                                                <ClearIcon fontSize="inherit" />
                                            </IconButton>
                                            <IconButton aria-label="delete" size="large" onClick={()=> setTicking(false)}>
                                                <PauseIcon fontSize="inherit" />
                                            </IconButton>
                                            <IconButton aria-label="delete" size="large" color="success" onClick={()=> setTicking(true)}>
                                                <PlayArrowIcon fontSize="inherit" />
                                            </IconButton>
                                            <p>{count}</p>
                                        </ControlItem>
                                    </Grid>
                                </Grid>
                            </Box>
                        <div id="mygraph"></div>
                        
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



