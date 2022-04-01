import React from 'react';
import { getGraph1D } from 'components/GradientDescentHelper';
// import { create, all } from 'mathjs';

// export const math = create(all, {})

// function assert(condition: boolean) {
//     if (condition === false){
//         throw Error("essertion error");
//     }
// }

// function performGradientDescentStep(derivatives: string[], vars: string[], varValues: number[], alpha: number) : number[]{
//     assert(vars.length === varValues.length);
//     assert(vars.length === derivatives.length);

//     let var_to_value: {[id:string]: number} = {"alpha" : alpha}
//     for (let i = 0; i < vars.length; i++) {
//         var_to_value[vars[i]] = varValues[i]
//     }

//     var result: number[] = [];
//     for (let i = 0; i < vars.length; i++) {
//         let nextValueOfCurrentVariable: string = ''.concat(vars[i]).concat(" - alpha * (").concat(derivatives[i]).concat(")")
//         console.log("nextValueOfCurrentVariable = ", nextValueOfCurrentVariable);
//         result.push(Number(math.evaluate(nextValueOfCurrentVariable, var_to_value)));
//     }
    
//     return result;
// }

// function performGradientDescent(f: string, vars: string[], steps:number, alpha: number): number[][]{
//     // variable_values_for_each_step contains the initial variable values
//     var variable_values_for_each_step: number[][] = [Array(vars.length).fill(Math.random())];

//     // get derivative using all variables
//     var derivatives: string[] = [];
//     for (let v in vars) {
//         derivatives.push(math.derivative(f, v).toString())
//     }

//     for (let index = 0; index < steps; index++) {
//         let nextStep = performGradientDescentStep(derivatives, vars, variable_values_for_each_step[index], alpha);
//         variable_values_for_each_step.push(nextStep);
//     }

//     return variable_values_for_each_step;
// }

function getRandomPoints(): [number, number][] {
    var result: [number, number][] =  [];
    for (var i = -5; i <= 5; i += 0.1){
        result.push([i, (Math.random() * (i + 5) / 4) > 0.5 ? 1 : 0])
    }

    return result;
}

// @ts-ignore
function performLogisticRegression(points: [number, number][], count:number) : string {
    let a = (Math.round(Math.random() * 100) / 100).toString()
    let b = (Math.round(Math.random() * 100) / 100).toString()
    let logregFunction = "(1 / (1 + (2.7182)^(-((".concat(a).concat(") + (").concat(b).concat(") * (x))) ))");
    console.log("logregFunction = ", logregFunction)
    return logregFunction;
}

export default function LogisticRegressionPlot() {
    
    const [count, setCount] = React.useState(0)
    const [points, setPoints] = React.useState(getRandomPoints());
    const [func, setFunc] = React.useState(performLogisticRegression(points, count));

    // every time count changes re-draw the graph
    React.useEffect(() => {
        getGraph1D(func, points, "scatter");
    }, [count, points, func]);

    // increment count each second and round to 0 of reached 10
    React.useEffect(() => {
        let new_count = 0;
        (count < 10) ? new_count = count + 1 : new_count = 0;
        const timer = setTimeout(() => {
            setCount(new_count);
            if (new_count === 0){
                setPoints(getRandomPoints());
            }
            setFunc(performLogisticRegression(points, new_count))
        }, 1e3)
        return () => clearTimeout(timer)
    });

    return (<div id='graph-board' style={{pointerEvents: 'none'}}/>);
}
