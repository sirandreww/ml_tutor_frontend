// ------------------------ IMPORTS ------------------------  
import React from 'react';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import { button, LeftItem, CenterItem, mathJaxConfig, mathJaxStyle } from 'components/LanguageAndButtonUtility';
import Typography from '@mui/material/Typography';


import { MathJax, MathJaxContext } from "better-react-mathjax";

import FunctionTextField from './FunctionTextField';

import { DataGrid, GridCellEditCommitParams, GridCellParams, GridColDef } from '@mui/x-data-grid';
import functionPlot from "function-plot";

import { randomInt } from '@mui/x-data-grid-generator';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

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

export default function LinearRegressionP2() {
    let points = [[1,3],[2,4],[3,8],[4,9]];

    
    const [rows, setRows] = React.useState(() => [{ id: 0, x: randomInt(0, 15), y: randomInt(0, 15) }]);
    
      
    const handleDeleteRow = () => {
        setRows((prevRows) => {
        // const rowToDeleteIndex = randomInt(0, prevRows.length - 1);
        return [
            ...rows.slice(0, prevRows.length - 1)  
        ];
        });
    };
      
    const handleAddRow = () => {
        setRows((prevRows) => [...prevRows, { id: prevRows.length + 1, x: randomInt(0, 15), y: randomInt(0, 15) }]);
    };

    React.useEffect(() => {
        getGraph1D('2.2*x+0.5', points);
    });


    const handleCommit = (e:GridCellEditCommitParams) => {
        const array = rows.map(r => 
            {
                if (r.id === e.id){
                    return {...r, [e.field]:e.value}
                }
                else{
                    return {...r}
                }
            })
            setRows(array)
            console.log(rows)

    }

    return (
        <div>
         {/* {JSON.stringify(rows)} */}
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
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"J"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        <FunctionTextField InputProps={{ readOnly: true, }} vars="x" value={"0.5"} onChange={(_)=>(_)}/>
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

