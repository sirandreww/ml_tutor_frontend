import React from 'react';
import Box from '@mui/material/Box';
import functionPlot from "function-plot";
import Typography from '@mui/material/Typography';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import Grid from "@mui/material/Grid";
import QuestionTable from 'components/QuestionTable';
import { button, LeftItem, CenterItem, mathJaxConfig, mathJaxStyle } from 'components/LanguageAndButtonUtility';
import { getDev, getPoints1D } from 'components/GradientDescentHelper';
import { create, all } from 'mathjs';

const math = create(all, {})



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

export default function LinearRegressionP6() {

    const [rows] = React.useState(() =>[{ id: 0, x: 5.1, y: 3.5 },
        { id: 1, x: 4.9, y: 3 },
        { id: 2, x: 4.7, y: 3.2 },
        { id: 3, x: 4.6, y: 3.1 },
        { id: 4, x: 5, y: 3.6 }]);

    // const [w, setW] = React.useState(() => calculateW());
    // const [b, setB] = React.useState(() => calculateB());
    // const [J, setJ] = React.useState(() => calculateJ());
    // const [dw, setDw] = React.useState(() => calculateDw());
    // const [db, setDb] = React.useState(() => calculateDb());

    // const [wInp, setWInp] = React.useState("-1");
    // const [wInpErr, setwInpErr] = React.useState(false);
    // const [bInp, setBInp] = React.useState("-1");
    // const [bInpErr, setBInpErr] = React.useState(false);
    // const [JInp, setJInp] = React.useState("-1");
    // const [JInpErr, setJInpErr] = React.useState(false);
    // const [dwInp, setdwInp] = React.useState("-1");
    // const [dwInpErr, setdwInpErr] = React.useState(false);
    // const [dbInp, setdbInp] = React.useState("-1");
    // const [dbInpErr, setdbInpErr] = React.useState(false);

    let points = [[1,3],[2,4],[3,8],[4,9]];
    
    React.useEffect(() => {
        getGraph1D('2.2*x+0.5', points);
    });

    const tab = <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    const headers_style = {fontFamily: 'Arial, Helvetica, sans-serif'}

    return (
        <Box sx={{ width: '100%' }}>
            <MathJaxContext version={3} config={mathJaxConfig}>
                <Typography component={'span'}>
                    <h4 style={headers_style}>Now lets try it yourself</h4><br/>
                    Follow the process and keep updating the values of <MathJax style={mathJaxStyle} inline>{"\\(w\\)"}</MathJax> and <MathJax style={mathJaxStyle} inline>{"\\(b\\)"}</MathJax> from where we left off:
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
            </MathJaxContext>
        </Box>
    )
}
