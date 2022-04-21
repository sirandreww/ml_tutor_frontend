import React from 'react';
import { getGraph1D } from 'components/GradientDescentHelper';
import { sigmoid } from 'components/logistic_regression/LogisticRegressionCore';
import {all, create} from "mathjs";

const math = create(all, {})

function getPointValue(ws: number[], xs: number[], b: number): number[][] {
    let z = Number(math.sum(math.multiply(math.transpose(ws), xs))) + b
    return [[z, sigmoid(z)]];
}
export default function LogisticRegressionPlot(props: {ws: number[], xs: number[], b: number}) {
    const [func, setFunc] = React.useState(`(1 / (1 + exp(-x)))`);
    const [point, setPoint] = React.useState(getPointValue(props.ws, props.xs, props.b));

    // every time func changes re-draw the graph
    React.useEffect(() => {
        getGraph1D(func, point, "scatter", "");
    }, [func, point]);

    React.useEffect(() => {
        setFunc(`(1 / (1 + exp(-x)))`);
        setPoint(getPointValue(props.ws, props.xs, props.b));
    }, [props.ws, props.xs, props.b]);

    return (<div id='graph-board' style={{pointerEvents: 'none'}}/>);
}
