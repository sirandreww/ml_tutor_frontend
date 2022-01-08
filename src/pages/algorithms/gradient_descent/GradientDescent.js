// ------------------------ IMPORTS ------------------------  
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Button, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import BrushIcon from '@mui/icons-material/Brush';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { button, LeftItem, CenterItem, RightItem } from '../dashboard/utils'
import Typography from '@mui/material/Typography';
import functionPlot from "function-plot";
import { create, all } from 'mathjs';
import Plotly from 'plotly.js-dist-min'
import QuestionTable from '../dashboard/QuestionTable';

// ------------------------ CODE ------------------------    
const DIGITS = 3
const HEADERS_1D = [
    ['step', 'Step'],
    ['x', 'x'],
    ['dx', "f'(x)"],
    ['tmpX', "alpha * f'(x)"],
    ['newX', "x'"],
]
const HEADERS_2D = [
    ['step', 'Step'],
    ['x', 'x'],
    ['y', 'y'],
    ['dx', "dfx(x, y)"],
    ['dy', "dfy(x, y)"],
    ['tmpX', "alpha * dfx(x, y)"],
    ['tmpY', "alpha * dfy(x, y)"],
    ['newX', "x'"],
    ['newY', "y'"],
]

const math = create(all, {})

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
    const [draw, setDraw] = React.useState(false)

    const handleStates = (
        {fn = myfun, al = alpha, sx = startX, sy = startY, tck = ticking, cnt = count, d2D = data2D, dr = draw} = 
        {fn: 'x^2', al: 1, sx: 0, sy: 0, tck: false, cnt: 0, d2D: {x:[], y:[], z:[]}, dr: false}) => {
        setFun(fn)
        setStartX(sx)
        setStartY(sy)
        setAlpha(al)
        setDraw(dr)
        setCount(cnt)
        setTicking(tck)

        if(dr) {
            (myfun !== '') ? setData2D(getData2D(myfun)) : setData2D(d2D)
        }
    }

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        handleStates()
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        handleStates()
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        handleStates()
        setActiveStep(0);
    };

    React.useEffect(() => {
        try {
            let points = null
            switch(activeStep) {
                case 0:
                case 1:
                    points = getPoints1D(myfun, startX, count, alpha)
                    getGraph1D(myfun, points)
                    break;
                case 2:
                case 3:
                    if(draw) {
                        points = getPoints2D(myfun, startX, startY, count, alpha)
                        getGraph2D(data2D, points)
                    }
                    break;
                case 4:
                    break;
                case 5:
                    break;
                case 6:
                    break;
                default:
                    throw 'reach undefined case'.concat(activeStep.toString())
            }
        }
        catch (e) {
            console.log("error at useEffect on parameters changes => \n", e)
        }
    }, [myfun, alpha, startX, startY, count, activeStep, draw, data2D]);

    // For Initial plot when the page loads for the first time
    React.useEffect(() => {
        try {
            const timer = setTimeout(() => ticking && setCount(count+1), 1e3)
            return () => clearTimeout(timer)
        }
        catch (e) {
            console.log("error at useEffect => \n", e)
        }
        
    });

    // React.useEffect(() => {
    //     try {
    //         handleStates()
    //     }
    //     catch (e) {
    //         console.log("error at useEffect => \n", e)
    //     }
        
    // }, [activeStep]);
    
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
                                        <LeftItem>
                                            <Typography sx={{color: 'black', fontSize: '1rem'}}>
                                                f(x):
                                                <br/>
                                                <input type='text' value={myfun} style={{width:'100%', height: '2rem'}} onChange={event => handleStates({tck: false, cnt: 0, fn: event.target.value})}/>
                                            </Typography>
                                        </LeftItem>
                                        <LeftItem>
                                            <Typography sx={{color: 'black', fontSize: '1rem'}}>
                                                alpha:
                                                <br/>
                                                <input type='text' value={alpha} onChange={event => handleStates({tck: false, cnt: 0, al: event.target.value})}/>
                                            </Typography>
                                        </LeftItem>
                                        <LeftItem>
                                            <Typography sx={{color: 'black', fontSize: '1rem'}}>
                                                Starting point (x = <input type='text' style={{width:'5rem'}} value={startX} onChange={event => handleStates({tck: false, cnt: 0, sx: event.target.value})}/>)
                                            </Typography>
                                        </LeftItem>
                                        <LeftItem>
                                            <Typography sx={{color: 'black', fontSize: '1rem'}}>
                                                The derivative of the function is:  {getDev(myfun, 'x')}
                                            </Typography>
                                        </LeftItem>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CenterItem>
                                            <div id='graph-board'></div>
                                        </CenterItem>
                                        <RightItem>
                                            {button({eventHandler: ()=> handleStates({tck: false, cnt: 0}), type: 'stop'})}
                                            {button({eventHandler: ()=> handleStates({tck: false}), type: 'pause'})}
                                            {button({eventHandler: ()=> handleStates({tck: true}), type: 'play'})}
                                            <p>{count}</p>
                                        </RightItem>
                                    </Grid>
                                </Grid>
                            </Box>
                        </div>
                    )}

                    {(activeStep === 1) && (
                        <div>
                            <Box sx={{ width: "100%" }}>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1,}}>
                                    <Grid item xs={12}>
                                        <LeftItem>
                                            <Typography sx={{color: 'black', fontSize: '1rem'}}>
                                                f(x):
                                                <br/>
                                                <input type='text' value={myfun} style={{width:'100%', height: '2rem'}} onChange={event => handleStates({tck: false, cnt: 0, fn: event.target.value})}/>
                                            </Typography>
                                        </LeftItem>
                                        <LeftItem>
                                            <Typography sx={{color: 'black', fontSize: '1rem'}}>
                                                alpha:
                                                <br/>
                                                <input type='text' value={alpha} onChange={event => handleStates({tck: false, cnt: 0, al: event.target.value})}/>
                                            </Typography>
                                        </LeftItem>
                                        <LeftItem>
                                            <Typography sx={{color: 'black', fontSize: '1rem'}}>
                                                Starting point (x = <input type='text' style={{width:'5rem'}} value={startX} onChange={event => handleStates({tck: false, cnt: 0, sx: event.target.value})}/>)
                                            </Typography>
                                        </LeftItem>
                                        <LeftItem>
                                            <Typography sx={{color: 'black', fontSize: '1rem'}}>
                                                The derivative of the function is:  {getDev(myfun, 'x')}
                                            </Typography>
                                        </LeftItem>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CenterItem>
                                            <QuestionTable 
                                                rowsNum = { 5 }
                                                headers = { HEADERS_1D }
                                                exampleEnabled = { true }
                                                rowNumbersEnabled = { true }
                                                example = { getExample(myfun, [{'v':'x', 'val': startX}], alpha) }
                                                correctAnswers = { getAnswers1D( HEADERS_1D, 6, myfun, startX, alpha) }
                                            />
                                            <div id='graph-board'></div>
                                        </CenterItem>
                                        <CenterItem>
                                            {button({eventHandler: ()=> handleStates({tck: false, cnt: (count <= 0) ? 0 : count-1}), type: 'prev'})}
                                            {button({eventHandler: ()=> handleStates({tck: false, cnt: 0}), type: 'stop'})}
                                            {button({eventHandler: ()=> handleStates({tck: false, cnt: count + 1}), type: 'next'})}
                                        </CenterItem>
                                    </Grid>
                                </Grid>
                            </Box>
                            
                        </div>
                    )}

                    {(activeStep === 2) && (
                        <div>
                            <Box sx={{ width: "100%"}}>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1,}}>
                                    <Grid item xs={12}>
                                        <LeftItem>
                                            <Typography sx={{color: 'black', fontSize: '1rem'}}>
                                                f(x, y):
                                                <br/>
                                                <input type='text' value={myfun} style={{width:'100%', height: '2rem'}} onChange={event => handleStates({fn: event.target.value, tck: false, cnt: 0, dr: false})}/>
                                            </Typography>
                                        </LeftItem>
                                        <LeftItem>
                                            <Typography sx={{color: 'black', fontSize: '1rem'}}>
                                                alpha:
                                                <br/>
                                                <input type='text' value={alpha} onChange={event => handleStates({tck: false, dr: false, cnt: 0, al: event.target.value})}/>
                                            </Typography>
                                        </LeftItem>
                                        <LeftItem>
                                            <Typography sx={{color: 'black', fontSize: '1rem'}}>
                                                Starting point (
                                                    x = <input type='text' style={{width:'5rem'}} value={startX} onChange={event => handleStates({tck: false, dr: false, cnt: 0, sx: event.target.value})}/>,
                                                    y = <input type='text' style={{width:'5rem'}} value={startY} onChange={event => handleStates({tck: false, dr: false, cnt: 0, sy: event.target.value})}/>
                                                )
                                            </Typography>
                                        </LeftItem>
                                        <LeftItem>
                                            <Typography sx={{color: 'black', fontSize: '1rem'}}>
                                                The derivative of the function is:  f'(x) = {getDev(myfun, 'x')}, f'(y) = {getDev(myfun, 'y')}
                                            </Typography>
                                        </LeftItem>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CenterItem>
                                            <div id='graph2-board'></div>
                                        </CenterItem>
                                        <RightItem>
                                            <IconButton aria-label="delete" size="large" color="warning" onClick={()=> handleStates({dr: true})}>
                                                <BrushIcon fontSize="inherit" />
                                            </IconButton>
                                            <IconButton aria-label="delete" size="large" color="error" onClick={()=> handleStates({tck: false, dr: false, cnt: 0})}>
                                                <ClearIcon fontSize="inherit" />
                                            </IconButton>
                                            <IconButton aria-label="delete" size="large" onClick={()=> handleStates({tck: false})}>
                                                <PauseIcon fontSize="inherit" />
                                            </IconButton>
                                            <IconButton aria-label="delete" size="large" color="success" onClick={()=> handleStates({tck: true, dr: true})}>
                                                <PlayArrowIcon fontSize="inherit" />
                                            </IconButton>
                                            <p>{count}</p>
                                        </RightItem>
                                    </Grid>
                                </Grid>
                            </Box>
                        <div id="mygraph"></div>
                        
                        </div>
                    )}

                    {(activeStep === 3) && (
                        <div>
                            <Box sx={{ width: "100%"}}>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1,}}>
                                    <Grid item xs={12}>
                                        <LeftItem>
                                            <Typography sx={{color: 'black', fontSize: '1rem'}}>
                                                f(x, y):
                                                <br/>
                                                <input type='text' value={myfun} style={{width:'100%', height: '2rem'}} onChange={event => handleStates({fn: event.target.value, tck: false, cnt: 0, dr: false})}/>
                                            </Typography>
                                        </LeftItem>
                                        <LeftItem>
                                            <Typography sx={{color: 'black', fontSize: '1rem'}}>
                                                alpha:
                                                <br/>
                                                <input type='text' value={alpha} onChange={event => handleStates({tck: false, dr: false, cnt: 0, al: event.target.value})}/>
                                            </Typography>
                                        </LeftItem>
                                        <LeftItem>
                                            <Typography sx={{color: 'black', fontSize: '1rem'}}>
                                                Starting point (
                                                    x = <input type='text' style={{width:'5rem'}} value={startX} onChange={event => handleStates({tck: false, dr: false, cnt: 0, sx: event.target.value})}/>,
                                                    y = <input type='text' style={{width:'5rem'}} value={startY} onChange={event => handleStates({tck: false, dr: false, cnt: 0, sy: event.target.value})}/>
                                                )
                                            </Typography>
                                        </LeftItem>
                                        <LeftItem>
                                            <Typography sx={{color: 'black', fontSize: '1rem'}}>
                                                The derivative of the function is:  f'(x) = {getDev(myfun, 'x')}, f'(y) = {getDev(myfun, 'y')}
                                            </Typography>
                                        </LeftItem>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CenterItem>
                                            <QuestionTable 
                                                rowsNum = { 5 }
                                                headers = { HEADERS_2D }
                                                rowNumbersEnabled = { true }
                                                exampleEnabled = { true }
                                                example = { getExample(myfun, [{'v':'x', 'val': startX}, {'v':'y', 'val': startY}], alpha) }
                                                correctAnswers = { getAnswers2D(HEADERS_2D, 6, myfun, startX, startY, alpha) }
                                            />
                                            <div id='graph2-board'></div>
                                        </CenterItem>
                                        <CenterItem>
                                            <IconButton aria-label="delete" size="large" color="warning" onClick={()=> handleStates({dr: true})}>
                                                <BrushIcon fontSize="inherit" />
                                            </IconButton>
                                            <IconButton aria-label="delete" size="large" color="warning" onClick={()=> handleStates({dr: true, cnt: (count <= 0) ? 0 : count-1})}>
                                                <ArrowBackIcon fontSize="inherit" />
                                            </IconButton>
                                            <IconButton aria-label="delete" size="large" color="error" onClick={()=> handleStates({draw: true})}>
                                                <ClearIcon fontSize="inherit" />
                                            </IconButton>
                                            <IconButton aria-label="delete" size="large" color="warning" onClick={()=> handleStates({dr: true, cnt: count + 1})}>
                                                <ArrowForwardIcon fontSize="inherit" />
                                            </IconButton>
                                        </CenterItem>
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

function getDev(f,v) {
    try {
        return math.derivative(f,v).toString()
    }
    catch (e) {
        console.log('error at getDev(f,v) => \n', e)
        return '0'
    }
}
function getExample(f, vars, alpha) {
    try {
        alpha = parseFloat(alpha)
        var prevs = {}
        vars.forEach(ele => prevs[ele.v] = parseFloat(ele.val).toFixed(DIGITS))
        
        var vs = []
        var devs = []
        var tmps = []
        var nexts = []

        for (let index = 0; index < vars.length; index++) {
            let {v, val} = vars[index];
            val = parseFloat(val).toFixed(DIGITS)

            let df = getDev(f, v)
            let dev = parseFloat(math.evaluate(df, prevs)).toFixed(DIGITS)
            let tmp = parseFloat(math.evaluate('alpha*dev', {'alpha': alpha, 'dev': dev})).toFixed(DIGITS)
            let next = parseFloat(math.evaluate('v-tmp', {'v': val, 'tmp': tmp})).toFixed(DIGITS)

            vs.push(val)
            devs.push(dev)
            tmps.push(tmp)
            nexts.push(next)
        }
        // console.log('getExample=', ['', ...vs, ...devs, ...tmps, ...nexts])
        return ['', ...vs, ...devs, ...tmps, ...nexts]
    }
    catch (e) {
        console.log('error at getExample(f, vars, alpha) => \n', e)
        return '0'
    }
}
function getPoints2D(f, startX, startY, steps_count, alpha) {
    try {
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
    catch (e) {
        console.log('error at getPoints2D(f, startX, startY, steps_count, alpha) => \n', e)
        return '0'
    }
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
function getAnswers1D(header, rows, f, startX, alpha) {
    let keys = header.map((ele) => ele[0]);
    let res = {}
    keys.forEach(key => res[key] = [])

    var df = getDev(f,'x')
    startX = parseFloat(startX)
    alpha = parseFloat(alpha)

    var prev = startX
    for (let i = 0; i < rows; i++) {
        var ans = {
            step: i,
            x: prev,
            dx: parseFloat(math.evaluate(df, {'x': prev})).toFixed(DIGITS),
            tmpX: null,
            newX: null,
        }
        ans.tmpX = parseFloat(math.evaluate('alpha*('.concat(df).concat(')'), {'alpha': alpha, 'x': prev})).toFixed(DIGITS)
        ans.newX = parseFloat(math.evaluate('prev-tmp', {'prev': prev, 'tmp': ans.tmpX})).toFixed(DIGITS)

        for (const [key, value] of Object.entries(ans)) {
            res[key].push(value)
        }

        prev = ans.newX

    }
    // ['', x, math.evaluate(df, {'x': x}), dfx, math.evaluate('x-tmp', {'x': x, 'tmp': dfx})]

    return res
}
function getAnswers2D(header, rows, f, startX, startY, alpha) {
    let keys = header.map((ele) => ele[0]);
    let res = {}
    keys.forEach(key => res[key] = [])

    var dfx = getDev(f,'x')
    var dfy = getDev(f,'y')
    startX = parseFloat(startX).toFixed(DIGITS)
    startY = parseFloat(startY).toFixed(DIGITS)
    alpha = parseFloat(alpha)

    var prevX = startX
    var prevY = startY

    for (let i = 0; i < rows; i++) {
        var ans = {
            step: i,
            x: prevX,
            y: prevY,
            dx: parseFloat(math.evaluate(dfx, {'x': prevX, 'y': prevY})).toFixed(DIGITS),
            dy: parseFloat(math.evaluate(dfy, {'x': prevX, 'y': prevY})).toFixed(DIGITS),
            tmpX: null,
            tmpY: null,
            newX: null,
            newY: null,
        }
        ans.tmpX = parseFloat(math.evaluate('alpha*('.concat(dfx).concat(')'), {'alpha': alpha, 'x': prevX, 'y': prevY})).toFixed(DIGITS)
        ans.newX = parseFloat(math.evaluate('prevX-tmpX', {'prevX': prevX, 'tmpX': ans.tmpX})).toFixed(DIGITS)
        ans.tmpY = parseFloat(math.evaluate('alpha*('.concat(dfy).concat(')'), {'alpha': alpha, 'x': prevX, 'y': prevY})).toFixed(DIGITS)
        ans.newY = parseFloat(math.evaluate('prevY-tmpY', {'prevY': prevY, 'tmpY': ans.tmpY})).toFixed(DIGITS)

        for (const [key, value] of Object.entries(ans)) {
            res[key].push(value)
        }

        prevX = ans.newX
        prevY = ans.newY

    }
    // ['', x, math.evaluate(df, {'x': x}), dfx, math.evaluate('x-tmp', {'x': x, 'tmp': dfx})]
    console.log('res=', res)
    return res
    
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
function getGraph2D(data, points){
    try {
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
    catch (e) {
        console.log('error at getGraph2D(data, points) => \n', e)
        return '0'
    }
}
function getData2D(f) {
    try {
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
    catch (e) {
        console.log('error at getData2D(f) => \n', e)
        return '0'
    }
}