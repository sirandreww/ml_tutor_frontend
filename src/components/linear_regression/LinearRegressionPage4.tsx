// ------------------------ IMPORTS ------------------------  
import React from 'react';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import { LeftItem,CenterItem, mathJaxConfig, mathJaxStyle } from 'components/LanguageAndButtonUtility';
import Typography from '@mui/material/Typography';

import { MathJax, MathJaxContext } from "better-react-mathjax";

import { DataGrid} from '@mui/x-data-grid';
import functionPlot from "function-plot";

// import * as dfd from "danfojs";
import TextField from '@mui/material/TextField';
import { randomInt } from 'mathjs';
import { GridColDef } from '@mui/x-data-grid';
import QuestionTable from 'components/QuestionTable';

// --------------------------------------------------------



type Props = {
    alphaType: string,
    buttonsType: string,
    generateQuestionTable: boolean
}

function getGraph1D(f: string, points: number[][],f2: string) {
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

    // dfd.readCSV("../../assets/datasets/Iris.csv")
    // .then((df) => {
    //     df.plot("plot_div").table()
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });


    // function createRows(){
    //     let rows = []
    //     let i = 0
    //     while (i<5){
    //         rows.push({ id: i, x: randomInt(0, 5.5), y: randomInt(0, 13) })
    //         i+=1
    //     }
    //     return rows
    // }

    
    

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

    

    const [xBarInp, setxBarInp] = React.useState("-1");
    const [xBarInpErr, setxBarInpErr] = React.useState(false);
    const [yBarInp, setyBarInp] = React.useState("-1");
    const [yBarInpErr, setyBarInpErr] = React.useState(false);
    const [xDotXInp, setXDotXInp] = React.useState("-1");
    const [xDotXInpErr, setxDotXInpErr] = React.useState(false);
    const [xDotYInp, setXDotYInp] = React.useState("-1");
    const [xDotYInpErr, setxDotYInpErr] = React.useState(false);
    const [wInp, setWInp] = React.useState("-1");
    const [wInpErr, setwInpErr] = React.useState(false);
    const [bInp, setBInp] = React.useState("-1");
    const [bInpErr, setBInpErr] = React.useState(false);
    const [JInp, setJInp] = React.useState("-1");
    const [JInpErr, setJInpErr] = React.useState(false);

    const [points, setPoints] = React.useState(() => calculatePoints());

    const colNames: GridColDef[] =[
        { headerName:"x", field: 'x', editable: true,sortable: false, headerAlign:'center', align:'center', width: 150 },
        { headerName:"y", field: 'y', editable: true,sortable: false, headerAlign:'center', align:'center' }]



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
            getGraph1D("0*x+0", [],"0*x+0");
        }
        else{
            getGraph1D(`${w}*x+${b}`, points,`${wInp}*x+${bInp}`);
            // getGraph1D(`${wInp}*x+${bInp}`, points);
        }
    },[rows,w, b,wInp,bInp]);



    React.useEffect(() => { //xBar.toString().indexOf('.')
        // yBar.toString().slice(0,yBar.toString().indexOf('.') + 3)
        if(parseFloat(xBarInp) == parseFloat(xBar.toString().slice(0,xBar.toString().indexOf('.') + 3))){
            setxBarInpErr(false)
        }else{
            setxBarInpErr(true)
        }
    },[xBarInp]);

    React.useEffect(() => {
        if(parseFloat(yBarInp) == parseFloat(yBar.toString().slice(0,yBar.toString().indexOf('.') + 3))){
            setyBarInpErr(false)
        }else{
            setyBarInpErr(true)
        }
    },[yBarInp]);

    React.useEffect(() => {
        if(parseFloat(xDotXInp) == parseFloat(xDotX.toString().slice(0,xDotX.toString().indexOf('.') + 3))){
            setxDotXInpErr(false)
        }else{
            setxDotXInpErr(true)
        }
    },[xDotXInp]);

    React.useEffect(() => {
        if(parseFloat(xDotYInp) == parseFloat(xDotY.toString().slice(0,xDotY.toString().indexOf('.') + 3))){
            setxDotYInpErr(false)
        }else{
            setxDotYInpErr(true)
        }
    },[xDotYInp]);

    React.useEffect(() => {
        if(parseFloat(wInp) == parseFloat(w.toString().slice(0,w.toString().indexOf('.') + 3))){
            setwInpErr(false)
        }else{
            setwInpErr(true)
        }
    },[wInp]);

    React.useEffect(() => {
        if(parseFloat(bInp) == parseFloat(b.toString().slice(0,b.toString().indexOf('.') + 3))){
            setBInpErr(false)
        }else{
            setBInpErr(true)
        }
    },[bInp]);

    React.useEffect(() => {
        if(parseFloat(JInp) == parseFloat(J.toString().slice(0,J.toString().indexOf('.') + 3))){
            setJInpErr(false)
        }else{
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

                       
                        {/* <Grid item xs={8}>
                            <Box sx={{ width: "100%", textAlign: 'center', direction: 'ltr' }}>
                                <QuestionTable
                                    headers={colNames}
                                    exampleEnabled={true}
                                    correctAnswers={[]}
                                    comparator={(res, ans) => Number(ans) === Number(res)}
                                /> 
                            </Box>
                        </Grid> */}

                        
                        <Grid item xs={8}>
                            <LeftItem>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, }} alignItems="center">
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(\\overline{x}\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    
                                    <Grid item xs={11}>
                                        <TextField autoFocus fullWidth value={xBarInp} onChange={ (e)=> setxBarInp(e.target.value) } error={xBarInpErr}/> 
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(\\overline{y }\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        {/* <TextField autoFocus fullWidth value={yBar.toPrecision(5).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1")} type="string" /> */}
                                        <TextField autoFocus fullWidth value={yBarInp} onChange={ (e)=> setyBarInp(e.target.value) } error={yBarInpErr}/>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(\\overline{x\\cdot x}\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        {/* <TextField autoFocus fullWidth value={xDotX.toPrecision(5).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1")} /> */}
                                        <TextField autoFocus fullWidth value={xDotXInp} onChange={ (e)=> setXDotXInp(e.target.value) } error={xDotXInpErr}/>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"\\(\\overline{x\\cdot y}\\)"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        {/* <TextField autoFocus fullWidth value={xDotY.toPrecision(5).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1")} /> */}
                                        <TextField autoFocus fullWidth value={xDotYInp} onChange={ (e)=> setXDotYInp(e.target.value) } error={xDotYInpErr}/>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"w"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        {/* <TextField autoFocus fullWidth value={w.toPrecision(5).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1")} /> */}
                                        <TextField autoFocus fullWidth value={wInp} onChange={ (e)=> setWInp(e.target.value) } error={wInpErr}/>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"b"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        {/* <TextField autoFocus fullWidth value={b.toPrecision(5).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1")} /> */}
                                        <TextField autoFocus fullWidth value={bInp} onChange={ (e)=> setBInp(e.target.value) } error={bInpErr}/>
                                    </Grid> 
                                    <Grid item xs={1}>
                                        <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                                            <MathJax style={mathJaxStyle} inline>{"J"}</MathJax>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        {/* <TextField autoFocus fullWidth value={J.toPrecision(5).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1")}/> */}
                                        <TextField autoFocus fullWidth value={JInp} onChange={ (e)=> setJInp(e.target.value) } error={JInpErr}/>
                                    </Grid> 
                                </Grid>
                            </LeftItem>
                        </Grid>

                        {JSON.stringify(xBar) + ' ' + JSON.stringify(yBar) + ' ' + JSON.stringify(xDotX) + ' ' + JSON.stringify(xDotY) + ' ' + JSON.stringify(w) + ' ' + JSON.stringify(b) + ' ' + JSON.stringify(J) + ' '}
                        
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

