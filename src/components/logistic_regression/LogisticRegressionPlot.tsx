import React from 'react';
import { getGraph1D } from 'components/GradientDescentHelper';
import { sigmoid } from 'components/logistic_regression/LogisticRegression';

export default function LogisticRegressionPlot(props: {w1: number, x1: number, b:number}) {

    const [func, setFunc] = React.useState(`(1 / (1 + exp(-(${props.w1} * x + ${props.b})) ))`);
    const [point, setPoint] = React.useState([[props.x1, sigmoid(props.x1 * props.w1 + props.b)]]);

    // every time func changes re-draw the graph
    React.useEffect(() => {
        getGraph1D(func, point, "scatter");
    }, [func, point]);

    React.useEffect(() => {
        setFunc(`(1 / (1 + exp(-(${props.w1} * x + ${props.b})) ))`);
        setPoint([[props.x1, sigmoid(props.x1 * props.w1 + props.b)]]);
    }, [props.w1, props.x1, props.b]);

    return (<div id='graph-board' style={{pointerEvents: 'none'}}/>);
}
