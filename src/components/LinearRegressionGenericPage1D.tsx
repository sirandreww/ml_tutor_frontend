// ------------------------ IMPORTS ------------------------  
import React from 'react';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import { button, LeftItem, CenterItem, mathJaxConfig, mathJaxStyle } from 'components/LanguageAndButtonUtility';
import Typography from '@mui/material/Typography';


import { MathJax, MathJaxContext } from "better-react-mathjax";

import FunctionTextField from './FunctionTextField';

import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import functionPlot from "function-plot";

// --------------------------------------------------------

type Props = {
    alphaType: string,
    buttonsType: string,
    generateQuestionTable: boolean
}

function getGraph1D(f: string, points: number[][]) {
    var width = 800;
    var height = 500;
    // console.log("points= \n", points)
    // console.log("f= \n", f)

    functionPlot({
        target: '#graph-board',
        width,
        height,
        xAxis: { domain: [-0.5, 5.5], label: 'x' },
        yAxis: { domain: [-1, 13], label: 'y' },
        title: '2.2x + 0.5',
        grid: true,
        disableZoom: true,
        data: [
            {
                fn: f,
            },
            {
                points: points,
                fnType: 'points',
                graphType: 'scatter',
            },
            {
                points: [[1,3],[1,2.7]],
                fnType: 'points',
                graphType: 'polyline',
                color: 'black'
            },
            {
                points: [[2,4],[2,4.9]],
                fnType: 'points',
                graphType: 'polyline',
                color: 'black'
            },
            {
                points: [[3,8],[3,7.1]],
                fnType: 'points',
                graphType: 'polyline',
                color: 'black'
            },
            {
                points: [[4,9],[4,9.3]],
                fnType: 'points',
                graphType: 'polyline',
                color: 'black'
            },
        ]
    });
}

export default function LinearRegressionGenericPage1D() {
    // const { alphaType, buttonsType, generateQuestionTable } = props

    // const getAlphaInput = (type: string) => {
    //     switch (type) {
    //         case 'slider':
    //             return (
    //                 <span>
    //                     <PrettoSlider
    //                         valueLabelDisplay="auto"
    //                         aria-label="pretto slider"
    //                         defaultValue={alpha}
    //                         step={0.05}
    //                         min={0}
    //                         max={2}
    //                         onChange={(_, value) => handleStates({ fn: myfun, al: Number(value), sx: startX, tck: false, cnt: count })}
    //                     />
    //                 </span>
    //             );
    //         case 'input':
    //             return <NumberTextField value={alpha} onChange={event => handleStates({ fn: myfun, al: Number(event.target.value), sx: startX, tck: false, cnt: 0 })} />
    //         default:
    //             return null
    //     }
    // }

    // const getButtonsInput = (type: string) => {
    //     switch (type) {
    //         case 'playGround':
    //         case 'hyperParameter':
    //             return (
    //                 <CenterItem>
    //                     <Box sx={{ width: "100%", textAlign: 'center', direction: 'ltr' }}>
    //                         {button({ eventHandler: () => handleStates({ fn: myfun, al: alpha, sx: startX, tck: false, cnt: 0 }), type: 'stop' })}
    //                         {button({ eventHandler: () => handleStates({ fn: myfun, al: alpha, sx: startX, tck: false, cnt: count }), type: 'pause' })}
    //                         {button({ eventHandler: () => handleStates({ fn: myfun, al: alpha, sx: startX, tck: true, cnt: count }), type: 'play' })}
    //                         <p>{count}</p>
    //                     </Box>
    //                 </CenterItem>
    //             );
    //         case 'stepByStep':
    //             return (
    //                 <CenterItem>
    //                     <Box sx={{ width: "100%", textAlign: 'center', direction: 'ltr' }}>
    //                         {button({ eventHandler: () => handleStates({ fn: myfun, al: alpha, sx: startX, tck: false, cnt: (count <= 0) ? 0 : count - 1 }), type: 'prev' })}
    //                         {button({ eventHandler: () => handleStates({ fn: myfun, al: alpha, sx: startX, tck: false, cnt: 0 }), type: 'stop' })}
    //                         {button({ eventHandler: () => handleStates({ fn: myfun, al: alpha, sx: startX, tck: false, cnt: count + 1 }), type: 'next' })}
    //                     </Box>
    //                 </CenterItem>
    //             );
    //         default:
    //             return null
    //     }
    // }

    // const [myfun, setFun] = React.useState('x^2')
    // const [alpha, setAlpha] = React.useState(0.1)
    // const [startX, setStartX] = React.useState(-1)
    // const [ticking, setTicking] = React.useState(false)
    // const [count, setCount] = React.useState(0)

    // function handleStates({ fn = myfun, al = alpha, sx = startX, tck = ticking, cnt = count }) {
    //     setFun(fn)
    //     setStartX(sx)
    //     setAlpha(al)
    //     setCount(cnt)
    //     setTicking(tck)
    // }

    // React.useEffect(() => {
    //     let points = getPoints1D(myfun, startX, count, alpha)
    //     getGraph1D(myfun, points)
    // }, [myfun, alpha, startX, count]);

    // For Initial plot when the page loads for the first time
    // React.useEffect(() => {
    //     const timer = setTimeout(() => ticking && setCount(count + 1), 1e3)
    //     return () => clearTimeout(timer)
    // });

    let points = [[1,3],[2,4],[3,8],[4,9]];

    React.useEffect(() => {
        getGraph1D('2.2*x+0.5', points);
    });

    return (
        <div>
            <Box sx={{ width: "100%" }}>
                <MathJaxContext version={3} config={mathJaxConfig}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, }} >
                        <Grid item xs={9}>
                            <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                In this example we will try to predict the housing prices (in millions) according to the number of rooms.
                                The table contains data of housing prices. below, there are the parameters needed in order to evaluate the prediction of the model, the Regression function, and finally, the graph with the regression line.
                            </Typography>
                        </Grid>

                        <Grid item xs={3} justifyContent="end"> 
                            <DataGrid
                                columns={[{ headerName:"x (#rooms)", field: 'x', editable: false,sortable: false, headerAlign:'center', align:'center' },
                                { headerName:"y (price)",field: 'y', editable: false, sortable: false, headerAlign:'center', align:'center' }]} 
                                rows={[
                                    { id: 1, x: '1', y:'3'},
                                    { id: 2, x: '2', y:'4'}, 
                                    { id: 3, x: '3', y:'8'},
                                    { id: 4, x: '4', y:'9'},
                                ]}
                                disableColumnMenu={true}
                                hideFooter={true}
                                autoHeight={true}
                                
                                sx={{
                                    boxShadow: 2,
                                    border: 2,
                                    '.MuiDataGrid-columnSeparator': {
                                    display: 'none',
                                    },
                                    '&.MuiDataGrid-root': {
                                    border: 'none',
                                    },
                                    '.MuiDataGrid-columnHeaderTitle':{
                                        
                                    }
                                }}
                            />
                        </Grid>
                        
                        <Grid item xs={12}>
                            <LeftItem>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, }} alignItems="center">
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(\\overline{x}\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        <FunctionTextField InputProps={{ readOnly: true, }} vars="x" value={"2.5"} onChange={(_)=>(_)}/>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(\\overline{y }\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        <FunctionTextField InputProps={{ readOnly: true, }} vars="x" value={"6"} onChange={(_)=>(_)}/>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(\\overline{x\\cdot x}\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        <FunctionTextField InputProps={{ readOnly: true, }} vars="x" value={"7.5"} onChange={(_)=>(_)}/>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(\\overline{x\\cdot y}\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        <FunctionTextField InputProps={{ readOnly: true, }} vars="x" value={"17.75"} onChange={(_)=>(_)}/>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"w"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        <FunctionTextField InputProps={{ readOnly: true, }} vars="x" value={"2.2"} onChange={(_)=>(_)}/>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"b"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        <FunctionTextField InputProps={{ readOnly: true, }} vars="x" value={"0.5"} onChange={(_)=>(_)}/>
                                    </Grid>  

                                    <Grid item xs={12}>
                                        <div id='graph-board' style={{pointerEvents: 'none'}}></div>
                                    </Grid>
                                    
                                </Grid>
                            </LeftItem>
                        </Grid>

                        
                    </Grid>
                </MathJaxContext>
            </Box>
        </div>
    );
}