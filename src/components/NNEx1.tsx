
// ------------------------ IMPORTS ------------------------  
import React, { useRef } from "react";
import { getData2D, getGraph2D } from 'components/gradient_descent/GradientDescentHelper';
//@ts-ignore
import Graph from "react-graph-vis";
import ReactDOM from "react-dom";
import { layer } from "@tensorflow/tfjs-vis/dist/show/model";
import { Paper, TextField, Typography } from "@mui/material";
import { LeftItem } from "./LanguageAndButtonUtility";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AnswerField from "components/AnswerField";
import Xarrow from "react-xarrows";
import NumberTextField from "./NumberTextField";
import { width } from "@mui/system";
import { sigmoid } from 'components/logistic_regression/LogisticRegressionCore';
import { useTranslation } from "react-i18next";


// --------------------------------------------------------


type Props = {
    layers: number[],
    colors: String[],
    style: any
}

// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }));

function interpolate(val: number, rgb1: [number, number, number], rgb2: [number, number, number]): [number, number, number] {
    var rgb: [number, number, number] = [0, 0, 0];
    var i;
    for (i = 0; i < 3; i++) {
        rgb[i] = rgb1[i] * (1.0 - val) + rgb2[i] * val;
    }
    return rgb;
}

function Arrow(props: { start: any, end: any, label?: number, style?: any, colorHint?: number }) {
    const pos_color: [number, number, number] = [parseInt("61", 16), parseInt("a7", 16), parseInt("d3", 16)];
    const neg_color: [number, number, number] = [parseInt("f6", 16), parseInt("b8", 16), parseInt("71", 16)];
    var color = "CornflowerBlue"
    var sig_of_number = 0.5;
    if (props.label !== undefined) {
        sig_of_number = sigmoid(props.label);
    } else if (props.colorHint !== undefined){
        sig_of_number = sigmoid(props.colorHint);
    }
    const rgb_color = interpolate(sig_of_number, neg_color, pos_color);
    console.log(rgb_color);
    const r = Math.floor(rgb_color[0]).toString(16);
    const g = Math.floor(rgb_color[1]).toString(16);
    const b = Math.floor(rgb_color[2]).toString(16);
    color = `#${r}${g}${b}`
    console.log(color);

    return (
        <Xarrow
            color={color}
            strokeWidth={3}
            labels={{
                middle: <div style={props.style}>
                    {(props.label === undefined) ? <></> :
                        <Paper style={{ minWidth: "20px", minHeight: "20px" }}>
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                {props.label}
                            </Box>
                        </Paper>
                    }
                </div>
            }}
            headSize={3}
            path="straight"
            curveness={0.3}
            // animateDrawing={true}
            start={props.start}
            end={props.end}
        />
    );
}

export default function NNEx1() {
    const [t] = useTranslation('translation');
    // -------------------------------- refs for arrows ---------------------------------
    const L2N1B = useRef(null);
    const L2N2B = useRef(null);
    const L3N1B = useRef(null);

    const L1N1 = useRef(null);
    const L1N2 = useRef(null);
    const L2N1 = useRef(null);
    const L2N2 = useRef(null);
    const L3N1 = useRef(null);

    // ------------------------------------- inputs -------------------------------------
    const [input1, setinput1] = React.useState(1);
    const handleInput1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        setinput1(Number(event.target.value));
    };

    const [input2, setinput2] = React.useState(1);
    const handleInput2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        setinput2(Number(event.target.value));
    };

    // ------------------------------------- biases -------------------------------------
    const [l2n1b, setl2n1b] = React.useState(-0.5);
    const handleL2N1BChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setl2n1b(Number(event.target.value));
    };

    const [l2n2b, setl2n2b] = React.useState(1.5);
    const handleL2N2BChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setl2n2b(Number(event.target.value));
    };

    const [l3n1b, setl3n1b] = React.useState(-1.5);
    const handleL3N1BChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setl3n1b(Number(event.target.value));
    };

    // ------------------------------------- weights -------------------------------------
    const [L1n1ToL2n1, setL1n1ToL2n1] = React.useState(1);
    const handleL1n1ToL2n1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        setL1n1ToL2n1(Number(event.target.value));
    };

    const [L1n1ToL2n2, setL1n1ToL2n2] = React.useState(-1);
    const handleL1n1ToL2n2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        setL1n1ToL2n2(Number(event.target.value));
    };

    const [L1n2ToL2n1, setL1n2ToL2n1] = React.useState(1);
    const handleL1n2ToL2n1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        setL1n2ToL2n1(Number(event.target.value));
    };

    const [L1n2ToL2n2, setL1n2ToL2n2] = React.useState(-1);
    const handleL1n2ToL2n2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        setL1n2ToL2n2(Number(event.target.value));
    };

    const [L2n1ToL3n1, setL2n1ToL3n1] = React.useState(1);
    const handleL2n1ToL3n1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        setL2n1ToL3n1(Number(event.target.value));
    };

    const [L2n2ToL3n1, setL2n2ToL3n1] = React.useState(1);
    const handleL2n2ToL3n1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        setL2n2ToL3n1(Number(event.target.value));
    };

    // ----------------------------------- is correct -----------------------------------
    const ep = 0.000001;
    function isCorrectL2N1(v: string): boolean {
        const correct_answer = sigmoid(L1n1ToL2n1 * input1 + L1n2ToL2n1 * input2 + l2n1b);
        const diff = Number(v) - correct_answer;
        return (-ep < diff && diff < ep);
    }
    function isCorrectL2N2(v: string): boolean {
        const correct_answer = sigmoid(L1n1ToL2n2 * input1 + L1n2ToL2n2 * input2 + l2n2b);
        const diff = Number(v) - correct_answer;
        return (-ep < diff && diff < ep);
    }
    function isCorrectL3N1(v: string): boolean {
        const l2n1 = sigmoid(L1n1ToL2n1 * input1 + L1n2ToL2n1 * input2 + l2n1b);
        const l2n2 = sigmoid(L1n1ToL2n2 * input1 + L1n2ToL2n2 * input2 + l2n2b);
        const correct_answer = sigmoid(L2n1ToL3n1 * l2n1 + L2n2ToL3n1 * l2n2 + l3n1b);
        const diff = Number(v) - correct_answer;
        return (-ep < diff && diff < ep);
    }

    return (<div>
        {t("NNEX1.first")}
        <Grid container rowSpacing={1} columnSpacing={0}>

            <Grid item xs={4}>
                <NumberTextField value={L1n1ToL2n1} onChange={handleL1n1ToL2n1Change} />
            </Grid>
            <Grid item xs={4}>
                <NumberTextField value={L1n1ToL2n2} onChange={handleL1n1ToL2n2Change} />
            </Grid>
            <Grid item xs={4}>
                <NumberTextField value={L2n1ToL3n1} onChange={handleL2n1ToL3n1Change} />
            </Grid>
            <Grid item xs={4}>
                <NumberTextField value={L1n2ToL2n1} onChange={handleL1n2ToL2n1Change} />
            </Grid>
            <Grid item xs={4}>
                <NumberTextField value={L1n2ToL2n2} onChange={handleL1n2ToL2n2Change} />
            </Grid>
            <Grid item xs={4}>
                <NumberTextField value={L2n2ToL3n1} onChange={handleL2n2ToL3n1Change} />
            </Grid>
        </Grid>
        <br />
        {t("NNEX1.second")}
        <br />
        <br />
        <LeftItem>
            <Grid container rowSpacing={5} columnSpacing={0}>

                {/* row 0 */}
                <Grid item xs={5}></Grid>
                <Grid item xs={2}>
                    <div ref={L2N1B}>
                        <NumberTextField value={l2n1b} onChange={handleL2N1BChange} />
                    </div>
                </Grid>
                <Grid item xs={5}></Grid>

                {/* row 1 */}
                <Grid item xs={1}></Grid>
                <Grid item xs={2}>
                    <div ref={L1N1}>
                        <NumberTextField value={input1} onChange={handleInput1Change} />
                    </div>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={2}>
                    <div ref={L2N1}>
                        <AnswerField label='answer' type='number' isCorrect={isCorrectL2N1} />
                    </div>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={2}>
                    <div ref={L3N1B}>
                        <NumberTextField value={l3n1b} onChange={handleL3N1BChange} />
                    </div>
                </Grid>
                <Grid item xs={1}></Grid>

                {/* row 2 */}
                <Grid item xs={5}></Grid>
                <Grid item xs={2}>
                    <div ref={L2N2B}>
                        <NumberTextField value={l2n2b} onChange={handleL2N2BChange} />
                    </div>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={2}>
                    <div ref={L3N1}>
                        <AnswerField label='answer' type='number' isCorrect={isCorrectL3N1} />
                    </div>
                </Grid>
                <Grid item xs={1}></Grid>

                {/* row 3 */}
                <Grid item xs={1}></Grid>
                <Grid item xs={2}>
                    <div ref={L1N2}>
                        <NumberTextField value={input2} onChange={handleInput2Change} />
                    </div>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={2}>
                    <div ref={L2N2}>
                        <AnswerField label='answer' type='number' isCorrect={isCorrectL2N2} />
                    </div>
                </Grid>
                <Grid item xs={5}></Grid>
            </Grid>


            <Arrow start={L2N1B} end={L2N1} colorHint={l2n1b} />
            <Arrow start={L2N2B} end={L2N2} colorHint={l2n2b} />
            <Arrow start={L3N1B} end={L3N1} colorHint={l3n1b} />


            <Arrow start={L1N1} end={L2N1} label={L1n1ToL2n1} />
            <Arrow start={L1N1} end={L2N2} label={L1n1ToL2n2} style={{ marginTop: '50px', marginLeft: '40px', }} />
            <Arrow start={L1N2} end={L2N1} label={L1n2ToL2n1} style={{ marginBottom: '50px', marginLeft: '40px', }} />
            <Arrow start={L1N2} end={L2N2} label={L1n2ToL2n2} />
            <Arrow start={L2N1} end={L3N1} label={L2n1ToL3n1} />
            <Arrow start={L2N2} end={L3N1} label={L2n2ToL3n1} />
        </LeftItem>
    </div>);
}

