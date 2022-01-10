// ------------------------ IMPORTS ------------------------  
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import { button, LeftItem, CenterItem } from 'pages/algorithms/dashboard/utils'
import Typography from '@mui/material/Typography';
import QuestionTable from 'pages/algorithms/dashboard/QuestionTable';
import { HEADERS_2D, getData2D, getPoints2D, getGraph2D, getDev, getExample, getAnswers2D } from '../helper';
// --------------------------------------------------------

export default function GradientDescentSlide5() {

    const [myfun, setFun] = React.useState('x^2')
    const [alpha, setAlpha] = React.useState(1)
    const [startX, setStartX] = React.useState('0')
    const [startY, setStartY] = React.useState('0')
    const [ticking, setTicking] = React.useState(false)
    const [count, setCount] = React.useState(0)
    const [data2D, setData2D] = React.useState({ x: [], y: [], z: [] })
    const [draw, setDraw] = React.useState(false)

    const handleStates = (
        { fn = myfun, al = alpha, sx = startX, sy = startY, tck = ticking, cnt = count, d2D = data2D, dr = draw } =
            { fn: 'x^2', al: 1, sx: 0, sy: 0, tck: false, cnt: 0, d2D: { x: [], y: [], z: [] }, dr: false }) => {
        setFun(fn)
        setStartX(sx)
        setStartY(sy)
        setAlpha(al)
        setDraw(dr)
        setCount(cnt)
        setTicking(tck)

        if (dr) {
            (myfun !== '') ? setData2D(getData2D(myfun)) : setData2D(d2D)
        }
    }

    React.useEffect(() => {
        try {
            let points = null;
            if (draw) {
                points = getPoints2D(myfun, startX, startY, count, alpha);
                getGraph2D(data2D, points);
            }
        }
        catch (e) {
            console.log("error at useEffect on parameters changes => \n", e)
        }
    }, [myfun, alpha, startX, startY, count, draw, data2D]);

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
            <Box sx={{ width: "100%" }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, }}>
                    <Grid item xs={12}>
                        <LeftItem>
                            <Typography sx={{ color: 'black', fontSize: '1rem' }}>
                                f(x, y):<br />
                                <input type='text' value={myfun} style={{ width: '100%', height: '2rem' }} onChange={event => handleStates({ fn: event.target.value, tck: false, cnt: 0, dr: false })} />
                                <br /><br />
                                alpha:<br />
                                <input type='text' value={alpha} onChange={event => handleStates({ tck: false, dr: false, cnt: 0, al: event.target.value })} />
                                <br /><br />
                                Starting point (
                                x = <input type='text' style={{ width: '5rem' }} value={startX} onChange={event => handleStates({ tck: false, dr: false, cnt: 0, sx: event.target.value })} />,
                                y = <input type='text' style={{ width: '5rem' }} value={startY} onChange={event => handleStates({ tck: false, dr: false, cnt: 0, sy: event.target.value })} />
                                )
                                <br /><br />
                                The derivative of the function is:  f'(x) = {getDev(myfun, 'x')}, f'(y) = {getDev(myfun, 'y')}
                            </Typography>
                        </LeftItem>
                    </Grid>
                    <Grid item xs={12}>
                        <CenterItem>
                            <QuestionTable
                                rowsNum={5}
                                headers={HEADERS_2D}
                                rowNumbersEnabled={true}
                                exampleEnabled={true}
                                example={getExample(myfun, [{ 'v': 'x', 'val': startX }, { 'v': 'y', 'val': startY }], alpha)}
                                correctAnswers={getAnswers2D(HEADERS_2D, 6, myfun, startX, startY, alpha)}
                            />
                            <div id='graph2-board'></div>
                        </CenterItem>
                        <CenterItem>
                            {button({ eventHandler: () => handleStates({ tck: false, dr: true }), type: 'brush' })}
                            {button({ eventHandler: () => handleStates({ tck: false, dr: false, cnt: (count <= 0) ? 0 : count - 1 }), type: 'prev' })}
                            {button({ eventHandler: () => handleStates({ tck: false, draw: false }), type: 'stop' })}
                            {button({ eventHandler: () => handleStates({ tck: false, dr: true, cnt: count + 1 }), type: 'next' })}
                        </CenterItem>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}