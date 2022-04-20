// ------------------------ IMPORTS ------------------------  
import React from 'react';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import { LeftItem, mathJaxConfig, mathJaxStyle } from 'components/LanguageAndButtonUtility';
import Typography from '@mui/material/Typography';


import { MathJax, MathJaxContext } from "better-react-mathjax";

import { DataGrid, GridCellEditCommitParams, GridCellParams, GridColDef } from '@mui/x-data-grid';
import functionPlot from "function-plot";

import { randomInt } from '@mui/x-data-grid-generator';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

// --------------------------------------------------------



type Props = {
    alphaType: string,
    buttonsType: string,
    generateQuestionTable: boolean
}

function getGraph1D(f: string, points: number[][]) {
    const regex = /([0-9]*.?[0-9]+)*/g;
    const values = f.match(regex)!.filter( r => r != "");
    // let axisX = [0,10]
    // let axisY = [0,10]
    // if(points.length !=0 ){
    //     axisX = [Math.min.apply(null, points.map( r => r[0])) - 3, Math.max.apply(null, points.map( r => r[0]) ) + 3]
    //     axisY = [Math.min.apply(null, points.map( r => r[1]) ) - 3, Math.max.apply(null, points.map( r => r[1]) ) + 3]
    // }
    let mark = ' + '
     if ( parseFloat(values[1]) < 0) {
        mark = ' - '
    }
    var width = 800;
    var height = 500;
    // console.log("points= \n", points)
    // console.log("f= \n", f)
    functionPlot({
        target: '#graph-board',
        width,
        height,
        xAxis: { domain: [Math.min.apply(null, points.map( r => r[0])) - 3, Math.max.apply(null, points.map( r => r[0]) ) + 3], label: 'x' },
        yAxis: { domain: [Math.min.apply(null, points.map( r => r[1]) ) - 3, Math.max.apply(null, points.map( r => r[1]) ) + 3], label: 'y' },
        // title: `${parseInt(values[0])}*x${mark}${parseInt(values[1])}`,
        title: `${parseFloat(values[0]).toPrecision(3).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1")}*x${mark}${Math.abs(parseFloat(values[1])).toPrecision(5).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1")}`,
        grid: true,
        disableZoom: false,
        data: [
            {
                fn: f,
            },
            {
                points: points,
                fnType: 'points',
                graphType: 'scatter'
            }
        ]
    });
}

export default function LinearRegressionP3() {

    const [rows, setRows] = React.useState(() => [{ id: 0, x: randomInt(0, 5.5), y: randomInt(0, 13) }]);

    const [xBar, setxBar] = React.useState(() => calculateXBar());

    const [yBar, setyBar] = React.useState(() => calculateYBar());

    const [xDotX, setXDotX] = React.useState(() => calculateXDotX());

    const [xDotY, setXDotY] = React.useState(() => calculateXDotY());

    const [w, setW] = React.useState(() => calculateW());

    const [b, setB] = React.useState(() => calculateB());

    const [J, setJ] = React.useState(() => calculateJ());

    const [points, setPoints] = React.useState(() => calculatePoints());




    React.useEffect(() => {
        setPoints(calculatePoints());
        setValues();
        if(rows.length == 0){
            setW(0);
            setB(0);
            setJ(0);
        }
    },[rows]);

    React.useEffect(() => {
        setW(calculateW());
    },[xDotY]);

    React.useEffect(() => {
        setB(calculateB());
    },[w, yBar, xBar]);

    React.useEffect(() => {
        setJ(calculateJ());
    },[w, b]);

    React.useEffect(() => {
        if (points.length == 0 ) {
            getGraph1D("0*x+0", []);
        }
        else{
            getGraph1D(`${w}*x+${b}`, points);
        }
    },[rows,w, b]);

    function setValues(){
        setxBar(calculateXBar());
        setyBar(calculateYBar());
        setXDotX(calculateXDotX());
        setXDotY(calculateXDotY());
        // setW(calculateW());
        // setB(calculateB());
        // setJ(calculateJ());
    }


    
      
    const handleDeleteRow = () => {
        setRows((prevRows) => {
        return [
            ...rows.slice(0, prevRows.length - 1)  
        ];
        });
    };
      
    const handleAddRow = () => {
        setRows((prevRows) => [...prevRows, { id: prevRows.length + 1, x: randomInt(0, 5.5), y: randomInt(0, 13) }]);
    };




    const handleCommit = (e:GridCellEditCommitParams) => {
        const array = rows.map(r => 
            {
                if (r.id === e.id){
                    return {...r, [e.field]:parseInt(e.value)}
                }
                else{
                    return {...r}
                }
            })
            setRows(array)
    }

    function calculateXBar(){
        if(rows.length == 0)
            return 0
        let sum = 0
        rows.map(r => sum += r.x)
        return sum/rows.length
    }

    function calculateYBar(){
        if(rows.length == 0)
            return 0
        let sum = 0
        rows.map(r => sum += r.y)
        return sum/rows.length
    }

    function calculateXDotX(){
        if(rows.length == 0)
            return 0
        let sum = 0
        rows.map(r => sum += (r.x * r.x) )
        return sum/rows.length
    }

    function calculateXDotY(){
        if(rows.length == 0)
            return 0
        let sum = 0
        rows.map(r => sum += (r.x * r.y) )
        return sum/rows.length
    }

    function calculateW(){
        if ( xDotX - (xBar**2) == 0 ) {
            return 0
        }
        else {
            return ((xDotY - (xBar * yBar) ) / ( xDotX - (xBar**2) ))
        }
    }

    function calculateB(){
        return yBar - (w * xBar)
    }

    function calculateJ(){
        if(rows.length == 0)
            return 0
        let sum = 0
        rows.map(r => sum += (((w * r.x) + (b - r.y))**2))
        return sum/rows.length
    }

    function calculatePoints() {
        if(rows.length == 0)
            return []
        return rows.map(r => [r.x, r.y])
    }



    return (
        <div>
         {/* {JSON.stringify(points)} */}
         {/* {JSON.stringify(w + '        ' + b)} */}
            <Box sx={{ width: "100%" }}>
                <MathJaxContext version={3} config={mathJaxConfig}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, }} >
                        <Grid item xs={4}> 
                            <Box sx={{ height: 415, bgcolor: 'background.paper' }}>
                                <DataGrid hideFooter 
                                rows={rows} 
                                columns={[
                                    { headerName:"x", field: 'x', editable: true,sortable: false, headerAlign:'center', align:'center', width: 150 },
                                    { headerName:"y", field: 'y', editable: true,sortable: false, headerAlign:'center', align:'center' },
                                  ]} 

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
                                onCellEditCommit = {handleCommit}
                                 
                                />
                                
                            </Box>
                            <Stack
                                sx={{ width: '100%', mb: 1 }}
                                direction="row"
                                alignItems="flex-start"
                                columnGap={10}
                            >
                                <Button variant="contained" size="small" onClick={handleAddRow}>
                                Add row
                                </Button>
                                <Button variant="contained" size="small" onClick={handleDeleteRow}>
                                Delete row
                                </Button>
                            </Stack>
                        </Grid>

                        <Grid item xs={8}>
                            <LeftItem>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, }} alignItems="center">
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(\\overline{x}\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        <TextField autoFocus fullWidth value={xBar.toPrecision(5).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1") }/>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(\\overline{y }\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        <TextField autoFocus fullWidth value={yBar.toPrecision(5).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1")}/>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(\\overline{x\\cdot x}\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        <TextField autoFocus fullWidth value={xDotX.toPrecision(5).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1")} />
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(\\overline{x\\cdot y}\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        <TextField autoFocus fullWidth value={xDotY.toPrecision(5).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1")}/>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"w"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        <TextField autoFocus fullWidth value={w.toPrecision(5).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1")}/>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"b"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        <TextField autoFocus fullWidth value={b.toPrecision(5).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1")}/>
                                    </Grid> 
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"J"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        <TextField autoFocus fullWidth value={J.toPrecision(5).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1")}/>
                                    </Grid> 
                                    
                                </Grid>
                            </LeftItem>
                        </Grid>

                        <Box>
                            <Grid item xs={12}>
                                <div id='graph-board' style={{pointerEvents: 'none'}}></div>
                            </Grid>
                        </Box>
                    </Grid>
                </MathJaxContext>
            </Box>
        </div>
    );
}

