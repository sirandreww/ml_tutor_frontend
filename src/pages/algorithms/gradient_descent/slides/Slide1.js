// ------------------------ IMPORTS ------------------------  
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import { button, LeftItem, CenterItem, RightItem } from 'pages/algorithms/dashboard/utils'
import Typography from '@mui/material/Typography';
import { getPoints1D, getGraph1D, getDev } from '../helper';
// --------------------------------------------------------

export default function GradientDescentSlide1() {

    const [myfun, setFun] = React.useState('x^2')
    const [alpha, setAlpha] = React.useState(1)
    const [startX, setStartX] = React.useState('0')
    const [startY, setStartY] = React.useState('0')
    const [ticking, setTicking] = React.useState(false)
    const [count, setCount] = React.useState(0)
    const [draw, setDraw] = React.useState(false)

    const handleStates = (
        { fn = myfun, al = alpha, sx = startX, sy = startY, tck = ticking, cnt = count, dr = draw } =
            { fn: 'x^2', al: 1, sx: 0, sy: 0, tck: false, cnt: 0, dr: false }) => {
        setFun(fn)
        setStartX(sx)
        setStartY(sy)
        setAlpha(al)
        setDraw(dr)
        setCount(cnt)
        setTicking(tck)

        if (dr) {
            // (myfun !== '') ? setData2D(getData2D(myfun)) : setData2D(d2D)
        }
    }

    React.useEffect(() => {
        try {
            let points = null;
            points = getPoints1D(myfun, startX, count, alpha);
            getGraph1D(myfun, points);
        }
        catch (e) {
            console.log("error at useEffect on parameters changes => \n", e)
        }
    }, [myfun, alpha, startX, startY, count, draw]);

    // For Initial plot when the page loads for the first time
    React.useEffect(() => {
        try {
            const timer = setTimeout(() => ticking && setCount(count + 1), 1e3)
            return () => clearTimeout(timer)
        }
        catch (e) {
            console.log("error at useEffect => \n", e)
        }

    });

    return (
        <div>
            <Typography sx={{ mt: 2 }}>Gradient descent is an iterative algorithm for finding a local minimum.</Typography>
            <Typography>The idea is to take repeated steps in the opposite direction of the gradient (derivative) of the function at the current point.</Typography>
            <Typography sx={{ mb: 1 }}>Take this function for example:</Typography>
            <Box sx={{ width: "100%" }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, }}>
                    <Grid item xs={12}>
                        <LeftItem>
                            <Typography sx={{ color: 'black', fontSize: '1rem' }}>
                                f(x):<br />
                                <input type='text' value={myfun} style={{ width: '100%', height: '2rem' }} onChange={event => handleStates({ tck: false, cnt: 0, fn: event.target.value })} />
                                <br /><br />
                                alpha:<br />
                                <input type='text' value={alpha} onChange={event => handleStates({ tck: false, cnt: 0, al: event.target.value })} />
                                <br /><br />
                                Starting point (x = <input type='text' style={{ width: '5rem' }} value={startX} onChange={event => handleStates({ tck: false, cnt: 0, sx: event.target.value })} />)
                                <br /><br />
                                The derivative of the function is:  {getDev(myfun, 'x')}
                            </Typography>
                        </LeftItem>
                    </Grid>
                    <Grid item xs={12}>
                        <CenterItem>
                            <div id='graph-board'></div>
                        </CenterItem>
                        <RightItem>
                            {button({ eventHandler: () => handleStates({ tck: false, cnt: 0 }), type: 'stop' })}
                            {button({ eventHandler: () => handleStates({ tck: false }), type: 'pause' })}
                            {button({ eventHandler: () => handleStates({ tck: true }), type: 'play' })}
                            <p>{count}</p>
                        </RightItem>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}
