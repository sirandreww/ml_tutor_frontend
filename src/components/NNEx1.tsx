
// ------------------------ IMPORTS ------------------------  
import React, { useRef } from "react";
import { getData2D, getGraph2D } from 'components/gradient_descent/GradientDescentHelper';
//@ts-ignore
import Graph from "react-graph-vis";
import ReactDOM from "react-dom";
import { layer } from "@tensorflow/tfjs-vis/dist/show/model";
import { Paper, TextField } from "@mui/material";
import { LeftItem } from "./LanguageAndButtonUtility";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AnswerField from "components/AnswerField";
import Xarrow from "react-xarrows";


// --------------------------------------------------------


type Props = {
    layers: number[],
    colors: String[],
    style: any
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function NNEx1() {
    const L1N1 = useRef(null);
    const L1N2 = useRef(null);
    const L2N1 = useRef(null);
    const L2N2 = useRef(null);
    const L3N1 = useRef(null);
    return (
        <LeftItem>
            <Grid container rowSpacing={0} columnSpacing={1}>

                {/* row 1 */}
                <Grid item xs={1}></Grid>
                <Grid item xs={2}>
                    <div ref={L1N1}>
                        <AnswerField label='answer' type='number' isCorrect={(_: any) => true} />
                    </div>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={2}>
                    <div ref={L2N1}>
                        <AnswerField label='answer' type='number' isCorrect={(_: any) => true} />
                    </div>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={1}></Grid>

                {/* row 2 */}
                <Grid item xs={1}></Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={2}>
                    <div ref={L3N1}>
                        <AnswerField label='answer' type='number' isCorrect={(_: any) => true} />
                    </div>
                </Grid>
                <Grid item xs={1}></Grid>

                {/* row 3 */}
                <Grid item xs={1}></Grid>
                <Grid item xs={2}>
                    <div ref={L1N2}>
                        <AnswerField label='answer' type='number' isCorrect={(_: any) => true} />
                    </div>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={2}>
                    <div ref={L2N2}>
                        <AnswerField label='answer' type='number' isCorrect={(_: any) => true} />
                    </div>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={1}></Grid>
            </Grid>
            <Xarrow
                strokeWidth={3}
                path="straight"
                labels={<div>w11 = 1</div>}
                start={L1N1}
                end={L2N1}
            />
            <Xarrow
                strokeWidth={3}
                labels={<div>w11 = -1</div>}
                path="straight"
                start={L1N1}
                end={L2N2}
            />
            <Xarrow
                strokeWidth={3}
                labels={<div>w11 = 1</div>}
                path="straight"
                start={L1N2}
                end={L2N1}
            />
            <Xarrow
                strokeWidth={3}
                labels={<div>w11 = -1</div>}
                path="straight"
                start={L1N2}
                end={L2N2}
            />
            <Xarrow
                strokeWidth={3}
                path="straight"
                start={L2N1}
                end={L3N1}
            />
            <Xarrow
                strokeWidth={3}
                path="straight"
                start={L2N2}
                end={L3N1}
            />
        </LeftItem>
    );
}

