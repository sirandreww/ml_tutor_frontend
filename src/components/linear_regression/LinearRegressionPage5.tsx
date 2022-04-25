import React from 'react';
import Box from '@mui/material/Box';
import functionPlot from "function-plot";
import Typography from '@mui/material/Typography';
import { mathJaxConfig, mathJaxStyle } from 'components/LanguageAndButtonUtility';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import Grid from "@mui/material/Grid";

function getGraphWBJ(f1: string, points1: number[][],f2: string, points2: number[][],f3: string, points3: number[][]) {
    var width = 800;
    var height = 500;
    // console.log("points= \n", points)
    // console.log("f= \n", f)
    functionPlot({
        target: '#graph-board1',
        width,
        height,
        title: 'w vs optimal w',
        xAxis: { domain: [-1, 21], label: 'x' },
        yAxis: { domain: [-1, 4], label: 'y' },
        grid: true,
        disableZoom: false,
        data: [
            {
                fn: f1,
            },
            {
                points: points1,
                fnType: 'points',
                graphType: 'polyline',
                color: 'black',
                
            },
        ]
    });
    functionPlot({
        target: '#graph-board2',
        width,
        height,
        title: 'b vs optimal b',
        xAxis: { domain: [-1, 21], label: 'x' },
        yAxis: { domain: [-1, 2], label: 'y' },
        grid: true,
        disableZoom: false,
        data: [
            {
                fn: f2,
            },
            {
                points: points2,
                fnType: 'points',
                graphType: 'polyline',
                color: 'black',
                
            },
        ]
    });
    functionPlot({
        target: '#graph-board3',
        width,
        height,
        title: 'J vs optimal J',
        xAxis: { domain: [-1, 21], label: 'x' },
        yAxis: { domain: [-1, 43], label: 'y' },
        grid: true,
        disableZoom: false,
        data: [
            {
                fn: f3,
            },
            {
                points: points3,
                fnType: 'points',
                graphType: 'polyline',
                color: 'black',
                
            },
        ]
    });
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
        title: 'y = w*x + b',
        xAxis: { domain: [-0.5, 5.5], label: 'x' },
        yAxis: { domain: [-1, 13], label: 'y' },
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
                color: 'black',
                
            },
        ]
    });
    // functionPlot({
    //     target: '#graph-board2',
    //     width,
    //     height,
    //     title: 'w vs optimal w',
    //     xAxis: { domain: [-0.5, 5.5], label: 'x' },
    //     yAxis: { domain: [-1, 13], label: 'y' },
    //     grid: true,
    //     disableZoom: true,
    //     data: [
    //         {
    //             fn: f,
    //         },
    //         {
    //             points: points,
    //             fnType: 'points',
    //             graphType: 'scatter',
    //             color: 'black',
                
    //         },
    //     ]
    // });
    // functionPlot({
    //     target: '#graph-board3',
    //     width,
    //     height,
    //     title: 'b vs optimal b',
    //     xAxis: { domain: [-0.5, 5.5], label: 'x' },
    //     yAxis: { domain: [-1, 13], label: 'y' },
    //     grid: true,
    //     disableZoom: true,
    //     data: [
    //         {
    //             fn: f,
    //         },
    //         {
    //             points: points,
    //             fnType: 'points',
    //             graphType: 'scatter',
    //             color: 'black',
                
    //         },
    //     ]
    // });
    // functionPlot({
    //     target: '#graph-board4',
    //     width,
    //     height,
    //     title: 'J vs optimal J',
    //     xAxis: { domain: [-1, 23], label: 'x' },
    //     yAxis: { domain: [-1, 43], label: 'y' },
    //     grid: true,
    //     disableZoom: true,
    //     data: [
    //         {
    //             fn: f,
    //         },
    //         {
    //             fn: '0.45',
    //         },
    //     ]
    // });
}

export default function LinearRegressionP5() {

    let points = [[1,3],[2,4],[3,8],[4,9]];
    let w_vals = [[0, 0], [1, 3.728], [2, 0.923], [3, 3.04], [4, 1.448], [5, 2.652], [6, 1.749], [7, 2.433], [8, 1.92], [9, 2.31], [10, 2.02], [11, 2.241], [12, 2.077], [13, 2.204], [14, 2.111], [15, 2.184], [16, 2.132], [17, 2.153], [18, 2.168], [19, 2.178], [20, 2.188], [21, 2.198]];
    let b_vals = [[0, 0], [1, 1.26], [2, 0.298], [3, 1.011], [4, 0.463], [5, 0.865], [6, 0.551], [7, 0.778], [8, 0.597], [9, 0.724], [10, 0.619], [11, 0.689], [12, 0.627], [13, 0.665], [14, 0.629], [15, 0.648], [16, 0.626], [17, 0.615], [18, 0.601], [19, 0.564], [20, 0.535], [21, 0.506]];
    let J_vals = [[0, 42.5], [1, 24.331521875000007], [2, 14.014203373671887], [3, 8.155246173071422], [4, 4.8280193828365], [5, 2.9384681414695493], [6, 1.8653232003668492], [7, 1.2557907906368473], [8, 0.9095333268234731], [9, 0.7127868337614144], [10, 0.6009489497615538], [11, 0.5373341953968159], [12, 0.5011099654095416], [13, 0.48044587455673515], [14, 0.4686235521389282], [15, 0.46182755327752767], [16, 0.45789090711956265], [17, 0.45281592762776196], [18, 0.45170483540379197], [19, 0.4506847409018417], [20, 0.4502034210911408], [21, 0.45000568550776177]];
    let ww = [0, 3.728, 0.923, 3.04, 1.448, 2.652, 1.749, 2.433, 1.92, 2.31, 2.02, 2.241, 2.077, 2.204, 2.111, 2.184, 2.132, 2.153, 2.168, 2.178, 2.188, 2.198]
    let bb = [0, 1.26, 0.298, 1.011, 0.463, 0.865, 0.551, 0.778, 0.597, 0.724, 0.619, 0.689, 0.627, 0.665, 0.629, 0.648, 0.626, 0.615, 0.601, 0.564, 0.535, 0.506]

    getGraphWBJ('2.2', w_vals,'0.5',b_vals,'0.45', J_vals);

    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        let idx = count%22;
        let f = ww.at(idx) + "x + " + bb.at(idx)
        getGraph1D(f, points);
    }, [count]);

    React.useEffect(() => {
        let new_count = 0;
        (count < 21) ? new_count = count + 1 : new_count = 0
        const timer = setTimeout(() => setCount(new_count), 1e3)
        return () => clearTimeout(timer)
    });

    const tab = <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    const headers_style = {fontFamily: 'Arial, Helvetica, sans-serif'}
    return (
        <Box sx={{ width: '100%' }}>
            <MathJaxContext version={3} config={mathJaxConfig}>
                <Typography component={'span'}>
                    <h1 style={headers_style}>Linear regression using Gradient Descent</h1>
                    <br/>
                    <h4 style={headers_style}>Lets find the optimal w and b using GD</h4><br/>
                    We take the parameters that minimize the loss function:<br/>
                    <MathJax style={mathJaxStyle} inline>{"\\(J(w,b)=\\frac{1}{m} \\sum_{i=1}^{m}\\left(w\\cdot x^{(i)}+b-y^{(i)}\\right)^{2}\\)"}</MathJax><br/>
                    <br/>
                    1. Select <MathJax style={mathJaxStyle} inline>{"\\(w_0\\)"}</MathJax> and <MathJax style={mathJaxStyle} inline>{"\\(b_0\\)"}</MathJax> at random<br/><br/>
                    2. Calculate <MathJax style={mathJaxStyle} inline>{"\\(\\frac{dJ}{dw}(w, b)=\\frac{2}{m} \\sum_{i=1}^{m}\\left(w\\cdot x^{(i)}+b-y^{(i)}\\right)x^{(i)}\\)"}</MathJax><br/><br/>
                    3. Calculate <MathJax style={mathJaxStyle} inline>{"\\(\\frac{dJ}{db}(w, b)=\\frac{2}{m} \\sum_{i=1}^{m}\\left(w\\cdot x^{(i)}+b-y^{(i)}\\right)\\)"}</MathJax><br/><br/>
                    4. Apply <MathJax style={mathJaxStyle} inline>{"\\(w = w - (\\alpha * \\frac{df}{dw}(w, b))\\)"}</MathJax><br/><br/>
                    5. Apply <MathJax style={mathJaxStyle} inline>{"\\(b = b - (\\alpha * \\frac{df}{db}(w, b))\\)"}</MathJax><br/><br/>
                    6. We repeat this process (steps 2-5) until our loss function is a very small value or ideally 0.
                       The value of <MathJax style={mathJaxStyle} inline>{"\\(w\\)"}</MathJax> and <MathJax style={mathJaxStyle} inline>{"\\(b\\)"}</MathJax> that we are left with now will be the optimum values.
                    <br/><br/>
                </Typography>
                <Typography component={'span'}>
                In this example we will repeat the process 3 times while using <MathJax style={mathJaxStyle} inline>{"\\(\\alpha\\)"}</MathJax> = 0.1 and then will see the resulting model and how it changes every update:   
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, }}>
                        <Grid item xs={3} justifyContent="end"> 
                            <DataGrid
                                columns={[{ headerName:"x", field: 'x', editable: false,sortable: false, headerAlign:'center', align:'center' },
                                { headerName:"y",field: 'y', editable: false, sortable: false, headerAlign:'center', align:'center' }]} 
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
                        <Grid item xs={9} justifyContent="end">
                            <DataGrid
                                columns={[{ headerName:"Step", field: 'Step', editable: false,sortable: false, headerAlign:'center', align:'center' },
                                { headerName:"w",field: 'w', editable: false, sortable: false, headerAlign:'center', align:'center' },
                                { headerName:"b",field: 'b', editable: false, sortable: false, headerAlign:'center', align:'center' },
                                { headerName:"J",field: 'J', editable: false, sortable: false, headerAlign:'center', align:'center' },
                                { headerName:"dJ/dw",field: 'dw', editable: false, sortable: false, headerAlign:'center', align:'center' },
                                { headerName:"dJ/db",field: 'db', editable: false, sortable: false, headerAlign:'center', align:'center' }]} 
                                rows={[
                                    { id: 1, Step:'0', w:'0', b:'0', J:'42.5', dw:'-35.5', db:'-12'},
                                    { id: 2, Step:'1', w:'3.55', b:'1.2', J:'19.33', dw:'23.75', db:'8.15'}, 
                                    { id: 3, Step:'2', w:'1.175', b:'0.385', J:'8.93', dw:'-15.95', db:'-5.35'},
                                    { id: 4, Step:'3', w:'2.77', b:'0.92', J:'4.26', dw:'10.65', db:'3.69'},
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
                    </Grid>
                    <br/>
                </Typography>
                <div id='graph-board' style={{pointerEvents: 'none'}}></div>

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, }}>
                <Grid item xs={12} justifyContent="end">
                <div id='graph-board1' style={{pointerEvents: 'none'}}></div>
                </Grid>
                <Grid item xs={12} justifyContent="end">
                <div id='graph-board2' style={{pointerEvents: 'none'}}></div>
                </Grid>
                <Grid item xs={12} justifyContent="end">
                <div id='graph-board3' style={{pointerEvents: 'none'}}></div>
                </Grid>
                    </Grid>                         
            </MathJaxContext>
        </Box>
    )
}
