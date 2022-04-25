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


export default function LinearRegressionP4() {

    const [rows] = React.useState(() =>[{ id: 0, x: 5.1, y: 3.5 },
                                        { id: 1, x: 4.9, y: 3 },
                                        { id: 2, x: 4.7, y: 3.2 },
                                        { id: 3, x: 4.6, y: 3.1 },
                                        { id: 4, x: 5, y: 3.6 }]);

    const [xBar, setxBar] = React.useState(() => calculateXBar());
    const [yBar, setyBar] = React.useState(() => calculateYBar());
    const [xDotX, setXDotX] = React.useState(() => calculateXDotX());
    const [xDotY, setXDotY] = React.useState(() => calculateXDotY());
    const [w, setW] = React.useState(() => calculateW());
    const [b, setB] = React.useState(() => calculateB());
    const [J, setJ] = React.useState(() => calculateJ());

    

    const [xBarInp, setxBarInp] = React.useState("");
    const [xBarInpErr, setxBarInpErr] = React.useState(false);
    const [yBarInp, setyBarInp] = React.useState("");
    const [yBarInpErr, setyBarInpErr] = React.useState(false);
    const [xDotXInp, setXDotXInp] = React.useState("");
    const [xDotXInpErr, setxDotXInpErr] = React.useState(false);
    const [xDotYInp, setXDotYInp] = React.useState("");
    const [xDotYInpErr, setxDotYInpErr] = React.useState(false);
    const [wInp, setWInp] = React.useState("");
    const [wInpErr, setwInpErr] = React.useState(false);
    const [bInp, setBInp] = React.useState("");
    const [bInpErr, setBInpErr] = React.useState(false);
    const [JInp, setJInp] = React.useState("");
    const [JInpErr, setJInpErr] = React.useState(false);

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
        if (points.length == 0 || wInp == "" || bInp == "" || !isNumeric(wInp) || !isNumeric(bInp)) {
            getGraph1D("0*x+0", [],"0*x+0");
        }
        else{
            getGraph1D(`${w}*x+${b}`, points,`${wInp}*x+${bInp}`);
            // getGraph1D(`${wInp}*x+${bInp}`, points);
        }
    },[rows,w, b,wInp,bInp]);

    React.useEffect(() => { 
        if(isNumberCorrect(parseFloat(xBarInp),xBar) || xBarInp == ""){
            setxBarInpErr(false)
        }
        else{
            setxBarInpErr(true)
        }
    },[xBarInp]);

    React.useEffect(() => { 
        if(isNumberCorrect(parseFloat(yBarInp),yBar) || yBarInp == ""){
            setyBarInpErr(false)
        }
        else{
            setyBarInpErr(true)
        }
    },[yBarInp]);

    React.useEffect(() => { 
        if(isNumberCorrect(parseFloat(xDotXInp),xDotX) || xDotXInp == ""){
            setxDotXInpErr(false)
        }
        else{
            setxDotXInpErr(true)
        }
    },[xDotXInp]);

    React.useEffect(() => { 
        if(isNumberCorrect(parseFloat(xDotYInp),xDotY) || xDotYInp == ""){
            setxDotYInpErr(false)
        }
        else{
            setxDotYInpErr(true)
        }
    },[xDotYInp]);

    React.useEffect(() => { 
        if(isNumberCorrect(parseFloat(wInp),w) || wInp == ""){
            setwInpErr(false)
        }
        else{
            setwInpErr(true)
        }
    },[wInp]);

    React.useEffect(() => { 
        if(isNumberCorrect(parseFloat(bInp),b) || bInp == ""){
            setBInpErr(false)
        }
        else{
            setBInpErr(true)
        }
    },[bInp]);

    React.useEffect(() => { 
        if(isNumberCorrect(parseFloat(wInp),w) || wInp == ""){
            setwInpErr(false)
        }
        else{
            setwInpErr(true)
        }
    },[wInp]);

    React.useEffect(() => { 
        if(isNumberCorrect(parseFloat(JInp),J) || JInp == ""){
            setJInpErr(false)
        }
        else{
            setJInpErr(true)
        }
    },[JInp]);


    function setValues(){
        setxBar(calculateXBar());
        setyBar(calculateYBar());
        setXDotX(calculateXDotX());
        setXDotY(calculateXDotY());
        // setW(calculateW());
        // setB(calculateB());
        // setJ(calculateJ());
    }

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
         {/* {JSON.stringify(xBar) + ' ' + JSON.stringify(yBar) + ' ' + JSON.stringify(xDotX) + ' ' + JSON.stringify(xDotY) + ' ' + JSON.stringify(w) + ' ' + JSON.stringify(b) + ' ' + JSON.stringify(J) + ' '} */}
         {/* {JSON.stringify(points)} */}
         {/* {JSON.stringify(w + '        ' + b)} */}
            <Box sx={{ width: "100%" }}>
                <MathJaxContext version={3} config={mathJaxConfig}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, }} >
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

                        
                        <Grid item xs={8}>
                            <LeftItem>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, }} alignItems="center">
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(\\overline{x}\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    
                                    <Grid item xs={11}>
                                        <TextField autoFocus fullWidth value={xBarInp} onChange={ (e)=> setxBarInp(e.target.value) } error={xBarInpErr} 
                                        color={getColor(xBarInpErr, xBarInp)}
                                         /> 
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(\\overline{y }\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        {/* <TextField autoFocus fullWidth value={yBar.toPrecision(5).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1")} type="string" /> */}
                                        <TextField autoFocus fullWidth value={yBarInp} onChange={ (e)=> setyBarInp(e.target.value) } error={yBarInpErr}
                                        color={getColor(yBarInpErr, yBarInp)}
                                        />
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(\\overline{x\\cdot x}\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        {/* <TextField autoFocus fullWidth value={xDotX.toPrecision(5).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1")} /> */}
                                        <TextField autoFocus fullWidth value={xDotXInp} onChange={ (e)=> setXDotXInp(e.target.value) } error={xDotXInpErr}
                                        color={getColor(xDotXInpErr, xDotXInp)}
                                        />
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(\\overline{x\\cdot y}\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        {/* <TextField autoFocus fullWidth value={xDotY.toPrecision(5).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1")} /> */}
                                        <TextField autoFocus fullWidth value={xDotYInp} onChange={ (e)=> setXDotYInp(e.target.value) } error={xDotYInpErr}
                                        color={getColor(xDotYInpErr, xDotYInp)}
                                        />
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"w"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        {/* <TextField autoFocus fullWidth value={w.toPrecision(5).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1")} /> */}
                                        <TextField autoFocus fullWidth value={wInp} onChange={ (e)=> setWInp(e.target.value) } error={wInpErr}
                                        color={getColor(wInpErr, wInp)}
                                        />
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"b"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        {/* <TextField autoFocus fullWidth value={b.toPrecision(5).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1")} /> */}
                                        <TextField autoFocus fullWidth value={bInp} onChange={ (e)=> setBInp(e.target.value) } error={bInpErr}
                                        color={getColor(bInpErr, bInp)}/>
                                    </Grid> 
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"J"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        {/* <TextField autoFocus fullWidth value={J.toPrecision(5).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1")}/> */}
                                        <TextField autoFocus fullWidth value={JInp} onChange={ (e)=> setJInp(e.target.value) } error={JInpErr}
                                        color={getColor(JInpErr, JInp)}
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

