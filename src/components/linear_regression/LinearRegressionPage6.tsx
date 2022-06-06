// ------------------------ IMPORTS ------------------------  
import React from 'react';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import { LeftItem,CenterItem, mathJaxConfig, mathJaxStyle } from 'components/LanguageAndButtonUtility';
import Typography from '@mui/material/Typography';

import { MathJax, MathJaxContext } from "better-react-mathjax";

import { DataGrid} from '@mui/x-data-grid';
import functionPlot from "function-plot";

import TextField from '@mui/material/TextField';
import { GridColDef } from '@mui/x-data-grid';
import FunctionTextField from '../FunctionTextField';
// --------------------------------------------------------


function getGraph1D(f: string, points: number[][],f2: string) {
    const regex = /([0-9]*.?[0-9]+)*/g;
    const values = f2.match(regex)!.filter( r => r != "");

    let mark = ' + '
     if ( parseFloat(values[1]) < 0) {
        mark = ' - '
    }
    var width = 800;
    var height = 500;

    functionPlot({
        target: '#graph-board',
        width,
        height,
        xAxis: { domain: [Math.min.apply(null, points.map( r => r[0])) - 10, Math.max.apply(null, points.map( r => r[0]) ) + 10], label: 'x' },
        yAxis: { domain: [Math.min.apply(null, points.map( r => r[1]) ) - 10, Math.max.apply(null, points.map( r => r[1]) ) + 10], label: 'y' },
        title: `Function Based On Your Calculation (Red): ${parseFloat(values[0]).toPrecision(3).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1")}*x${mark}${Math.abs(parseFloat(values[1])).toPrecision(5).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1")}`,
        grid: true,
        disableZoom: false,
        data: [
            {
                fn: f,
            },
            {
                fn: f2,
            },
            {
                points: points,
                fnType: 'points',
                graphType: 'scatter'
            }
        ]
    });
    
}


export default function LinearRegressionP6() {

    const [rows] = React.useState(() =>[{ id: 0, x: 5.9, y: 1.45 },
                                        { id: 1, x: 1.7, y: 2 },
                                        { id: 2, x: 0.7, y: 5.5 },
                                        { id: 3, x: 1, y: 0.5 },
                                        { id: 4, x: 9.9, y: 1.65 }]);

    // Optimal Values:
    const [w] = React.useState(-0.157);
    const [b] = React.useState(2.824);
    // STEP 0
    const [w0] = React.useState(0);
    const [b0] = React.useState(0);
    const [J0] = React.useState(7.865);
    const [dw0] = React.useState(-13.056);
    const [db0] = React.useState(-4.44);
    const [w0Inp, setW0Inp] = React.useState("");
    const [w0InpErr, setw0InpErr] = React.useState(false);
    const [b0Inp, setB0Inp] = React.useState("");
    const [b0InpErr, setB0InpErr] = React.useState(false);
    const [J0Inp, setJ0Inp] = React.useState("");
    const [J0InpErr, setJ0InpErr] = React.useState(false);
    const [dw0Inp, setdw0Inp] = React.useState("");
    const [dw0InpErr, setdw0InpErr] = React.useState(false);
    const [db0Inp, setdb0Inp] = React.useState("");
    const [db0InpErr, setdb0InpErr] = React.useState(false);
    // STEP 1
    const [w1] = React.useState(0.131);
    const [b1] = React.useState(0.044);
    const [J1] = React.useState(6.478);
    const [dw1] = React.useState(-5.55);
    const [db1] = React.useState(-3.348);
    const [w1Inp, setW1Inp] = React.useState("");
    const [w1InpErr, setw1InpErr] = React.useState(false);
    const [b1Inp, setB1Inp] = React.useState("");
    const [b1InpErr, setB1InpErr] = React.useState(false);
    const [J1Inp, setJ1Inp] = React.useState("");
    const [J1InpErr, setJ1InpErr] = React.useState(false);
    const [dw1Inp, setdw1Inp] = React.useState("");
    const [dw1InpErr, setdw1InpErr] = React.useState(false);
    const [db1Inp, setdb1Inp] = React.useState("");
    const [db1InpErr, setdb1InpErr] = React.useState(false);
    // STEP 2
    const [w2] = React.useState(0.186);
    const [b2] = React.useState(0.078);
    const [J2] = React.useState(6.157);
    const [dw2] = React.useState(-2.247);
    const [db2] = React.useState(-2.855);
    const [w2Inp, setW2Inp] = React.useState("");
    const [w2InpErr, setw2InpErr] = React.useState(false);
    const [b2Inp, setB2Inp] = React.useState("");
    const [b2InpErr, setB2InpErr] = React.useState(false);
    const [J2Inp, setJ2Inp] = React.useState("");
    const [J2InpErr, setJ2InpErr] = React.useState(false);
    const [dw2Inp, setdw2Inp] = React.useState("");
    const [dw2InpErr, setdw2InpErr] = React.useState(false);
    const [db2Inp, setdb2Inp] = React.useState("");
    const [db2InpErr, setdb2InpErr] = React.useState(false);
    // STEP 3
    const [w3] = React.useState(0.209);
    const [b3] = React.useState(0.106);
    const [J3] = React.useState(6.045);
    const [dw3] = React.useState(-0.795);
    const [db3] = React.useState(-2.626);
    const [w3Inp, setW3Inp] = React.useState("");
    const [w3InpErr, setw3InpErr] = React.useState(false);
    const [b3Inp, setB3Inp] = React.useState("");
    const [b3InpErr, setB3InpErr] = React.useState(false);
    const [J3Inp, setJ3Inp] = React.useState("");
    const [J3InpErr, setJ3InpErr] = React.useState(false);
    const [dw3Inp, setdw3Inp] = React.useState("");
    const [dw3InpErr, setdw3InpErr] = React.useState(false);
    const [db3Inp, setdb3Inp] = React.useState("");
    const [db3InpErr, setdb3InpErr] = React.useState(false);

    const [points, setPoints] = React.useState(() => calculatePoints());

    const colNames: GridColDef[] =[
        { headerName:"x", field: 'x', editable: false,sortable: false, headerAlign:'center', align:'center', width: 150 },
        { headerName:"y", field: 'y', editable: false,sortable: false, headerAlign:'center', align:'center' }]

    function isNumberCorrect(answer : number, correct: number){
        if(answer == null || correct == null){
            return true
        }
        return correct - 0.01 <= answer && correct + 0.01 >= answer
    }

    function isNumeric(num : string){
        return !isNaN(parseFloat(num))
    }



    React.useEffect(() => {
        setPoints(calculatePoints());
    },[rows]);

    React.useEffect(() => {
        if (points.length == 0 || w1Inp == "" || b1Inp == "" || !isNumeric(w1Inp) || !isNumeric(b1Inp)) {
            getGraph1D("0*x+0", [],"0*x+0");
        }
        else{
            getGraph1D(`${w}*x+${b}`, points,`${w1Inp}*x+${b1Inp}`);
            // getGraph1D(`${wInp}*x+${bInp}`, points);
        }
    },[rows,w, b,w1Inp,b1Inp]);

    React.useEffect(() => {
        if (points.length == 0 || w2Inp == "" || b2Inp == "" || !isNumeric(w2Inp) || !isNumeric(b2Inp)) {
            getGraph1D("0*x+0", [],"0*x+0");
        }
        else{
            getGraph1D(`${w}*x+${b}`, points,`${w2Inp}*x+${b2Inp}`);
            // getGraph1D(`${wInp}*x+${bInp}`, points);
        }
    },[rows,w, b,w2Inp,b2Inp]);

    React.useEffect(() => {
        if (points.length == 0 || w3Inp == "" || b3Inp == "" || !isNumeric(w3Inp) || !isNumeric(b3Inp)) {
            getGraph1D("0*x+0", [],"0*x+0");
        }
        else{
            getGraph1D(`${w}*x+${b}`, points,`${w3Inp}*x+${b3Inp}`);
            // getGraph1D(`${wInp}*x+${bInp}`, points);
        }
    },[rows,w, b,w3Inp,b3Inp]);

    // Page 6 functions
    React.useEffect(() => { 
        if(isNumberCorrect(parseFloat(w0Inp),w0) || w0Inp == ""){
            setw0InpErr(false)
        }
        else{
            setw0InpErr(true)
        }
    },[w0Inp]);
    React.useEffect(() => { 
        if(isNumberCorrect(parseFloat(w1Inp),w1) || w1Inp == ""){
            setw1InpErr(false)
        }
        else{
            setw1InpErr(true)
        }
    },[w1Inp]);
    React.useEffect(() => { 
        if(isNumberCorrect(parseFloat(w2Inp),w2) || w2Inp == ""){
            setw2InpErr(false)
        }
        else{
            setw2InpErr(true)
        }
    },[w2Inp]);
    React.useEffect(() => { 
        if(isNumberCorrect(parseFloat(w3Inp),w3) || w3Inp == ""){
            setw3InpErr(false)
        }
        else{
            setw3InpErr(true)
        }
    },[w3Inp]);

    React.useEffect(() => { 
        if(isNumberCorrect(parseFloat(b0Inp),b0) || b0Inp == ""){
            setB0InpErr(false)
        }
        else{
            setB0InpErr(true)
        }
    },[b0Inp]);
    React.useEffect(() => { 
        if(isNumberCorrect(parseFloat(b1Inp),b1) || b1Inp == ""){
            setB1InpErr(false)
        }
        else{
            setB1InpErr(true)
        }
    },[b1Inp]);
    React.useEffect(() => { 
        if(isNumberCorrect(parseFloat(b2Inp),b2) || b2Inp == ""){
            setB2InpErr(false)
        }
        else{
            setB2InpErr(true)
        }
    },[b2Inp]);
    React.useEffect(() => { 
        if(isNumberCorrect(parseFloat(b3Inp),b3) || b3Inp == ""){
            setB3InpErr(false)
        }
        else{
            setB3InpErr(true)
        }
    },[b3Inp]);

    React.useEffect(() => { 
        if(isNumberCorrect(parseFloat(J0Inp),J0) || J0Inp == ""){
            setJ0InpErr(false)
        }
        else{
            setJ0InpErr(true)
        }
    },[J0Inp]);
    React.useEffect(() => { 
        if(isNumberCorrect(parseFloat(J1Inp),J1) || J1Inp == ""){
            setJ1InpErr(false)
        }
        else{
            setJ1InpErr(true)
        }
    },[J1Inp]);
    React.useEffect(() => { 
        if(isNumberCorrect(parseFloat(J2Inp),J2) || J2Inp == ""){
            setJ2InpErr(false)
        }
        else{
            setJ2InpErr(true)
        }
    },[J2Inp]);
    React.useEffect(() => { 
        if(isNumberCorrect(parseFloat(J3Inp),J3) || J3Inp == ""){
            setJ3InpErr(false)
        }
        else{
            setJ3InpErr(true)
        }
    },[J3Inp]);

    React.useEffect(() => { 
        if(isNumberCorrect(parseFloat(dw0Inp),dw0) || dw0Inp == ""){
            setdw0InpErr(false)
        }
        else{
            setdw0InpErr(true)
        }
    },[dw0Inp]);
    React.useEffect(() => { 
        if(isNumberCorrect(parseFloat(dw1Inp),dw1) || dw1Inp == ""){
            setdw1InpErr(false)
        }
        else{
            setdw1InpErr(true)
        }
    },[dw1Inp]);
    React.useEffect(() => { 
        if(isNumberCorrect(parseFloat(dw2Inp),dw2) || dw2Inp == ""){
            setdw2InpErr(false)
        }
        else{
            setdw2InpErr(true)
        }
    },[dw2Inp]);
    React.useEffect(() => { 
        if(isNumberCorrect(parseFloat(dw3Inp),dw3) || dw3Inp == ""){
            setdw3InpErr(false)
        }
        else{
            setdw3InpErr(true)
        }
    },[dw3Inp]);

    React.useEffect(() => { 
        if(isNumberCorrect(parseFloat(db0Inp),db0) || db0Inp == ""){
            setdb0InpErr(false)
        }
        else{
            setdb0InpErr(true)
        }
    },[db0Inp]);
    React.useEffect(() => { 
        if(isNumberCorrect(parseFloat(db1Inp),db1) || db1Inp == ""){
            setdb1InpErr(false)
        }
        else{
            setdb1InpErr(true)
        }
    },[db1Inp]);
    React.useEffect(() => { 
        if(isNumberCorrect(parseFloat(db2Inp),db2) || db2Inp == ""){
            setdb2InpErr(false)
        }
        else{
            setdb2InpErr(true)
        }
    },[db2Inp]);
    React.useEffect(() => { 
        if(isNumberCorrect(parseFloat(db3Inp),db3) || db3Inp == ""){
            setdb3InpErr(false)
        }
        else{
            setdb3InpErr(true)
        }
    },[db3Inp]);
    // End

    function getColor(isError: boolean, variable: string){
        if (variable == "") {
            return "info"
        }
        else if (isError) {
            return "error"
        }
        else {
             return "success" 
        }
    }

    function calculatePoints() {
        if(rows.length == 0)
            return []
        return rows.map(r => [r.x, r.y])
    }


    return (
        <div>
         {/* {JSON.stringify(xBar) + ' ' + JSON.stringify(yBar) + ' ' + JSON.stringify(xDotX) + ' ' + JSON.stringify(xDotY) + ' ' + JSON.stringify(w) + ' ' + JSON.stringify(b) + ' ' + JSON.stringify(J) + ' '} */}
         {/* {JSON.stringify(points)} */}
         {/* {JSON.stringify(w + '        ' + b)} */}
            <Box sx={{ width: "100%" }}>
                <MathJaxContext version={3} config={mathJaxConfig}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, }} >
                <Grid item xs={4}>
                        </Grid>
                    <Grid item xs={4}> 
                            <Box sx={{ height: 456, bgcolor: 'background.paper' }}>
                                <DataGrid hideFooter 
                                rows={rows} 
                                columns={colNames} 
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
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                        </Grid>
                </Grid>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, }} >
                        <Grid item xs={6}>
                        Step 0 values:
                        {JSON.stringify(w0) + ' ' + JSON.stringify(b0) + ' ' + JSON.stringify(J0) + ' ' + JSON.stringify(dw0) +
     ' ' + JSON.stringify(db0) + ' ' + JSON.stringify(w0Inp) + ' ' + JSON.stringify(b0Inp) + ' ' +
     ' ' + JSON.stringify(J0Inp) + ' ' + JSON.stringify(dw0Inp) + ' ' + JSON.stringify(db0Inp) + ' '}
                            
                            <LeftItem>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, }} alignItems="center">
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(w\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    
                                    <Grid item xs={11}>
                                    <FunctionTextField InputProps={{ readOnly: true, }} vars="x" value={"0"} onChange={(_)=>(_)}/> 
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(b\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        {/* <TextField autoFocus fullWidth value={yBar.toPrecision(5).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1")} type="string" /> */}
                                        <FunctionTextField InputProps={{ readOnly: true, }} vars="x" value={"0"} onChange={(_)=>(_)}/> 
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(J\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        {/* <TextField autoFocus fullWidth value={xDotX.toPrecision(5).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1")} /> */}
                                        <TextField autoFocus fullWidth value={J0Inp} onChange={ (e)=> setJ0Inp(e.target.value) } error={J0InpErr}
                                        color={getColor(J0InpErr, J0Inp)}
                                        />
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(\\frac{dJ}{dw}\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        {/* <TextField autoFocus fullWidth value={xDotY.toPrecision(5).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1")} /> */}
                                        <TextField autoFocus fullWidth value={dw0Inp} onChange={ (e)=> setdw0Inp(e.target.value) } error={dw0InpErr}
                                        color={getColor(dw0InpErr, dw0Inp)}
                                        />
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(\\frac{dJ}{db}\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        {/* <TextField autoFocus fullWidth value={w.toPrecision(5).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1")} /> */}
                                        <TextField autoFocus fullWidth value={db0Inp} onChange={ (e)=> setdb0Inp(e.target.value) } error={db0InpErr}
                                        color={getColor(db0InpErr, db0Inp)}
                                        />
                                    </Grid> 
                                </Grid>
                            </LeftItem>
                        </Grid>
                        <Grid item xs={6}>
                            Step 1 values:
                            {JSON.stringify(w1) + ' ' + JSON.stringify(b1) + ' ' + JSON.stringify(J1) + ' ' + JSON.stringify(dw1) +
     ' ' + JSON.stringify(db1) + ' ' + JSON.stringify(w1Inp) + ' ' + JSON.stringify(b1Inp) + ' ' +
     ' ' + JSON.stringify(J1Inp) + ' ' + JSON.stringify(dw1Inp) + ' ' + JSON.stringify(db1Inp) + ' '}
                            <LeftItem>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, }} alignItems="center">
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(w\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    
                                    <Grid item xs={11}>
                                        <TextField autoFocus fullWidth value={w1Inp} onChange={ (e)=> setW1Inp(e.target.value) } error={w1InpErr} 
                                        color={getColor(w1InpErr, w1Inp)}
                                         /> 
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(b\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        {/* <TextField autoFocus fullWidth value={yBar.toPrecision(5).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1")} type="string" /> */}
                                        <TextField autoFocus fullWidth value={b1Inp} onChange={ (e)=> setB1Inp(e.target.value) } error={b1InpErr}
                                        color={getColor(b1InpErr, b1Inp)}
                                        />
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(J\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        {/* <TextField autoFocus fullWidth value={xDotX.toPrecision(5).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1")} /> */}
                                        <TextField autoFocus fullWidth value={J1Inp} onChange={ (e)=> setJ1Inp(e.target.value) } error={J1InpErr}
                                        color={getColor(J1InpErr, J1Inp)}
                                        />
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(\\frac{dJ}{dw}\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        {/* <TextField autoFocus fullWidth value={xDotY.toPrecision(5).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1")} /> */}
                                        <TextField autoFocus fullWidth value={dw1Inp} onChange={ (e)=> setdw1Inp(e.target.value) } error={dw1InpErr}
                                        color={getColor(dw1InpErr, dw1Inp)}
                                        />
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(\\frac{dJ}{db}\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        {/* <TextField autoFocus fullWidth value={w.toPrecision(5).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1")} /> */}
                                        <TextField autoFocus fullWidth value={db1Inp} onChange={ (e)=> setdb1Inp(e.target.value) } error={db1InpErr}
                                        color={getColor(db1InpErr, db1Inp)}
                                        />
                                    </Grid> 
                                </Grid>
                            </LeftItem>
                        </Grid>
                        <Grid item xs={6}>
                            Step 2 values:
                            {JSON.stringify(w2) + ' ' + JSON.stringify(b2) + ' ' + JSON.stringify(J2) + ' ' + JSON.stringify(dw2) +
     ' ' + JSON.stringify(db2) + ' ' + JSON.stringify(w2Inp) + ' ' + JSON.stringify(b2Inp) + ' ' +
     ' ' + JSON.stringify(J2Inp) + ' ' + JSON.stringify(dw2Inp) + ' ' + JSON.stringify(db2Inp) + ' '}
                            <LeftItem>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, }} alignItems="center">
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(w\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    
                                    <Grid item xs={11}>
                                        <TextField autoFocus fullWidth value={w2Inp} onChange={ (e)=> setW2Inp(e.target.value) } error={w2InpErr}
                                        color={getColor(w2InpErr, w2Inp)}
                                         /> 
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(b\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        {/* <TextField autoFocus fullWidth value={yBar.toPrecision(5).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1")} type="string" /> */}
                                        <TextField autoFocus fullWidth value={b2Inp} onChange={ (e)=> setB2Inp(e.target.value) } error={b2InpErr}
                                        color={getColor(b2InpErr, b2Inp)}
                                        />
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(J\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        {/* <TextField autoFocus fullWidth value={xDotX.toPrecision(5).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1")} /> */}
                                        <TextField autoFocus fullWidth value={J2Inp} onChange={ (e)=> setJ2Inp(e.target.value) } error={J2InpErr}
                                        color={getColor(J2InpErr, J2Inp)}
                                        />
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(\\frac{dJ}{dw}\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        {/* <TextField autoFocus fullWidth value={xDotY.toPrecision(5).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1")} /> */}
                                        <TextField autoFocus fullWidth value={dw2Inp} onChange={ (e)=> setdw2Inp(e.target.value) } error={dw2InpErr}
                                        color={getColor(dw2InpErr, dw2Inp)}
                                        />
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(\\frac{dJ}{db}\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        {/* <TextField autoFocus fullWidth value={w.toPrecision(5).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1")} /> */}
                                        <TextField autoFocus fullWidth value={db2Inp} onChange={ (e)=> setdb2Inp(e.target.value) } error={db2InpErr}
                                        color={getColor(db2InpErr, db2Inp)}
                                        />
                                    </Grid> 
                                </Grid>
                            </LeftItem>
                        </Grid>            
                        <Grid item xs={6}>
                            Step 3 values:
                            {JSON.stringify(w3) + ' ' + JSON.stringify(b3) + ' ' + JSON.stringify(J3) + ' ' + JSON.stringify(dw3) +
     ' ' + JSON.stringify(db3) + ' ' + JSON.stringify(w3Inp) + ' ' + JSON.stringify(b3Inp) + ' ' +
     ' ' + JSON.stringify(J3Inp) + ' ' + JSON.stringify(dw3Inp) + ' ' + JSON.stringify(db3Inp) + ' '}
                            <LeftItem>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, }} alignItems="center">
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(w\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    
                                    <Grid item xs={11}>
                                        <TextField autoFocus fullWidth value={w3Inp} onChange={ (e)=> setW3Inp(e.target.value) } error={w3InpErr}
                                        color={getColor(w3InpErr, w3Inp)}
                                         /> 
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(b\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        {/* <TextField autoFocus fullWidth value={yBar.toPrecision(5).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1")} type="string" /> */}
                                        <TextField autoFocus fullWidth value={b3Inp} onChange={ (e)=> setB3Inp(e.target.value) } error={b3InpErr}
                                        color={getColor(b3InpErr, b3Inp)}
                                        />
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(J\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        {/* <TextField autoFocus fullWidth value={xDotX.toPrecision(5).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1")} /> */}
                                        <TextField autoFocus fullWidth value={J3Inp} onChange={ (e)=> setJ3Inp(e.target.value) } error={J3InpErr}
                                        color={getColor(J3InpErr, J3Inp)}
                                        />
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(\\frac{dJ}{dw}\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        {/* <TextField autoFocus fullWidth value={xDotY.toPrecision(5).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1")} /> */}
                                        <TextField autoFocus fullWidth value={dw3Inp} onChange={ (e)=> setdw3Inp(e.target.value) } error={dw3InpErr}
                                        color={getColor(dw3InpErr, dw3Inp)}
                                        />
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(\\frac{dJ}{db}\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        {/* <TextField autoFocus fullWidth value={w.toPrecision(5).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1")} /> */}
                                        <TextField autoFocus fullWidth value={db3Inp} onChange={ (e)=> setdb3Inp(e.target.value) } error={db3InpErr}
                                        color={getColor(db3InpErr, db3Inp)}
                                        />
                                    </Grid> 
                                </Grid>
                            </LeftItem>
                        </Grid>
                        <Grid item xs={12}>
                            <Box>
                                <div id='graph-board' style={{pointerEvents: 'none'}}></div>
                            </Box>
                        </Grid>
                        

                    </Grid>
                </MathJaxContext>
            </Box>
        </div>
    );
}

