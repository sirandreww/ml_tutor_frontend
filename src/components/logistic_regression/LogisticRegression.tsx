import React from 'react';
import { create, all } from 'mathjs';
import Typography from '@mui/material/Typography';

export function sigmoid(value: number): number {
    let exp = math.exp(-value)
    return Number(math.evaluate("1/(1+exp)", {exp: exp}))
}

const math = create(all, {})
type Matrix = math.Matrix
export type Module = {
    W: Matrix,
    B: number
}

type ModuleInfos = {
    module: Module,
    costs: number[],
    ws: Matrix[],
    bs: number[]
}

export class LogisticRegressionModule {
    // Private Fields
    private readonly _X: number[][];
    private readonly _Y: number[];
    private readonly _ALPHA: number;
    private readonly _ITERATIONS: number;
    private readonly _MODULE: Module;
    private readonly _COSTS: number[];
    private readonly _WS: Matrix[];
    private readonly _BS: number[];


    constructor(data_batch: number[][], classifications: number[], learning_rate: number, total_iterations: number) {
        this._X = data_batch
        this._Y = classifications
        this._ALPHA = learning_rate
        this._ITERATIONS = total_iterations

        // console.log("_X:\n", data_batch)
        // console.log("_Y:\n", classifications)
        // console.log("_ALPHA:\n", learning_rate)
        // console.log("_ITERATIONS:\n", total_iterations)
        let tmp = LogisticRegressionModule.createModule(
            math.transpose(math.matrix(this._X)),
            math.matrix(this._Y),
            this._ALPHA,
            this._ITERATIONS)

        console.log("tmp = ", tmp)
        this._MODULE = tmp.module
        this._COSTS = tmp.costs
        this._WS = tmp.ws
        this._BS = tmp.bs
    }

    public getModule(): Module {
        return this._MODULE
    }

    public getCosts(): number[] {
        return this._COSTS
    }

    public getWs(): Matrix[] {
        return this._WS
    }

    public getBs(): number[] {
        return this._BS
    }
    public generateNewModule(
        data_batch: number[][] = this._X,
        classifications: number[] = this._Y,
        learning_rate: number = this._ALPHA,
        total_iterations: number = this._ITERATIONS
    ): LogisticRegressionModule {
        return new LogisticRegressionModule(data_batch, classifications, learning_rate, total_iterations)
    }

    public predict(X: number[]): number {
        let Z = Number(math.sum(math.multiply(math.transpose(this._MODULE.W), X))) + this._MODULE.B
        return (LogisticRegressionModule.sigmoid(Z) > 0.5) ? 1 : 0
    }

    public getAccuracy(test_batch: number[][], test_classifications: number[]): number {
        let total_mismatches = 0;
        for (let i = 0; i < test_batch.length; i++) {
            let prediction = this.predict(test_batch[i])
            if(prediction !== test_classifications[i])
                total_mismatches++
        }

        return 1 - (total_mismatches/ test_classifications.length)
    }

    // Private Static Methods
    private static sigmoid(value: number): number {
        let exp = math.exp(-value)
        return Number(math.evaluate("1/(1+exp)", {exp: exp}))
    }

    private static log(value: number): number {
        return math.log(value)
    }

    private static cost_function_segma(Y: Matrix, A: Matrix): number {
        let left = math.multiply(Y, math.map(A, LogisticRegressionModule.log))
        let right = math.multiply(math.map(Y, x => 1-x), math.map(A, x => LogisticRegressionModule.log(1-x)))

        return math.sum(math.add(left, right) as Matrix)
    }

    private static calc_dW(A: Matrix, Y: Matrix, X: Matrix, m: number): Matrix {
        let dot = math.multiply(math.subtract(A, Y) as Matrix, math.transpose(X))
        return math.map(dot, x => (x/m))
    }

    private static calc_dB(A: Matrix, Y: Matrix, m: number): number {
        return (math.sum(math.subtract(A, Y) as Matrix)) / m
    }

    private static createModule(X: Matrix, Y: Matrix, learning_rate: number, iterations: number): ModuleInfos {
        const n: number = X.size()[0]
        const m: number = X.size()[1]

        let W = math.zeros(n) as Matrix
        let B = 0
        let cost_per_iteration = []
        let ws_per_iteration = []
        let bs_per_iteration = []

        for (let i = 0; i < iterations; i++) {

            // A = sigmoid(transpose(W)*X + B)
            let Z = math.map(math.multiply(math.transpose(W), X), x => x + B)
            let A = math.map(Z, x => LogisticRegressionModule.sigmoid(x))

            // Loss Function
            let cost = Number(math.evaluate("((-1 * x)/m)", { m: m, x: LogisticRegressionModule.cost_function_segma(Y, A)}))

            // Gradiant Descent
            let dW = LogisticRegressionModule.calc_dW(A, Y, X, m)
            let dB = LogisticRegressionModule.calc_dB(A, Y, m)
            W = math.subtract(W, math.map(math.transpose(dW),  x => x*learning_rate)) as Matrix
            B = B - learning_rate*dB

            // Adding more Info for future tasks
            cost_per_iteration.push(cost)
            ws_per_iteration.push(W)
            bs_per_iteration.push(B)
        }

        return { module: {W: W, B: B} as Module,
            costs: cost_per_iteration,
            ws: ws_per_iteration,
            bs: bs_per_iteration
        }
    }
}

type Props = {
    data_batch: number[][],
    classifications: number[],
    learning_rate: number,
    total_iterations: number,
}

export default function LogisticRegression(props: Props) {
    const  {data_batch, classifications, learning_rate, total_iterations } = props
    const alg = new LogisticRegressionModule(data_batch, classifications, learning_rate, total_iterations)
    const module = alg.getModule()
    const costs = alg.getCosts()
    const bs = alg.getBs()
    const ws = alg.getWs()

    return(
        <div>


                <div>The Module Ws = {module.W.toString()}</div>
                <div>The Module B = {module.B}</div>
                <div>The Module Accuracy = {alg.getAccuracy(x_test, y_test)}</div>
                <div>
                    <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                        The Module bs = {bs[1]}
                    </Typography>
                </div>
                <div>
                    <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                        The Module bs = {costs[1]}
                    </Typography>
                </div>
                <div>
                    <Typography style={{ width: '100%', height: '2rem', fontSize: '1.2rem', color: 'black' }}>
                        The Module bs = {ws[1].toArray().join(" | ")}
                    </Typography>
                </div>
        </div>
    )
}

const x_test = [
    [3, 0, 34.5, 0, 0, 7.8292, 2],
    [3, 1, 47.0, 1, 0, 7.0, 1],
    [2, 0, 62.0, 0, 0, 9.6875, 2],
    [3, 0, 27.0, 0, 0, 8.6625, 1],
    [3, 1, 22.0, 1, 1, 12.2875, 1],
    [3, 0, 14.0, 0, 0, 9.225, 1],
    [3, 1, 30.0, 0, 0, 7.6292, 2],
    [2, 0, 26.0, 1, 1, 29.0, 1],
    [3, 1, 18.0, 0, 0, 7.2292, 0],
    [3, 0, 21.0, 2, 0, 24.15, 1],
    [3, 0, 0, 0, 0, 7.8958, 1],
    [1, 0, 46.0, 0, 0, 26.0, 1],
    [1, 1, 23.0, 1, 0, 82.2667, 1],
    [2, 0, 63.0, 1, 0, 26.0, 1],
    [1, 1, 47.0, 1, 0, 61.175, 1],
    [2, 1, 24.0, 1, 0, 27.7208, 0],
    [2, 0, 35.0, 0, 0, 12.35, 2],
    [3, 0, 21.0, 0, 0, 7.225, 0],
    [3, 1, 27.0, 1, 0, 7.925, 1],
    [3, 1, 45.0, 0, 0, 7.225, 0],
    [1, 0, 55.0, 1, 0, 59.4, 0],
    [3, 0, 9.0, 0, 1, 3.1708, 1],
    [1, 1, 0, 0, 0, 31.6833, 1],
    [1, 0, 21.0, 0, 1, 61.3792, 0],
    [1, 1, 48.0, 1, 3, 262.375, 0],
    [3, 0, 50.0, 1, 0, 14.5, 1],
    [1, 1, 22.0, 0, 1, 61.9792, 0],
    [3, 0, 22.5, 0, 0, 7.225, 0],
    [1, 0, 41.0, 0, 0, 30.5, 1],
    [3, 0, 0, 2, 0, 21.6792, 0],
    [2, 0, 50.0, 1, 0, 26.0, 1],
    [2, 0, 24.0, 2, 0, 31.5, 1],
    [3, 1, 33.0, 1, 2, 20.575, 1],
    [3, 1, 0, 1, 2, 23.45, 1],
    [1, 0, 30.0, 1, 0, 57.75, 0],
    [3, 0, 18.5, 0, 0, 7.2292, 0],
    [3, 1, 0, 0, 0, 8.05, 1],
    [3, 1, 21.0, 0, 0, 8.6625, 1],
    [3, 0, 25.0, 0, 0, 9.5, 1],
    [3, 0, 0, 0, 0, 56.4958, 1],
    [3, 0, 39.0, 0, 1, 13.4167, 0],
    [1, 0, 0, 0, 0, 26.55, 1],
    [3, 0, 41.0, 0, 0, 7.85, 1],
    [2, 1, 30.0, 0, 0, 13.0, 1],
    [1, 1, 45.0, 1, 0, 52.5542, 1],
    [3, 0, 25.0, 0, 0, 7.925, 1],
    [1, 0, 45.0, 0, 0, 29.7, 0],
    [3, 0, 0, 0, 0, 7.75, 2],
    [1, 1, 60.0, 0, 0, 76.2917, 0],
    [3, 1, 36.0, 0, 2, 15.9, 1],
    [1, 0, 24.0, 1, 0, 60.0, 1],
    [2, 0, 27.0, 0, 0, 15.0333, 0],
    [2, 1, 20.0, 2, 1, 23.0, 1],
    [1, 1, 28.0, 3, 2, 263.0, 1],
    [2, 0, 0, 0, 0, 15.5792, 0],
    [3, 0, 10.0, 4, 1, 29.125, 2],
    [3, 0, 35.0, 0, 0, 7.8958, 1],
    [3, 0, 25.0, 0, 0, 7.65, 1],
    [3, 0, 0, 1, 0, 16.1, 1],
    [1, 1, 36.0, 0, 0, 262.375, 0],
    [3, 0, 17.0, 0, 0, 7.8958, 1],
    [2, 0, 32.0, 0, 0, 13.5, 1],
    [3, 0, 18.0, 0, 0, 7.75, 1],
    [3, 1, 22.0, 0, 0, 7.725, 2],
    [1, 0, 13.0, 2, 2, 262.375, 0],
    [2, 1, 0, 0, 0, 21.0, 1],
    [3, 1, 18.0, 0, 0, 7.8792, 2],
    [1, 0, 47.0, 0, 0, 42.4, 1],
    [1, 0, 31.0, 0, 0, 28.5375, 0],
    [1, 1, 60.0, 1, 4, 263.0, 1],
    [3, 1, 24.0, 0, 0, 7.75, 2],
    [3, 0, 21.0, 0, 0, 7.8958, 1],
    [3, 1, 29.0, 0, 0, 7.925, 1],
    [1, 0, 28.5, 0, 0, 27.7208, 0],
    [1, 1, 35.0, 0, 0, 211.5, 0],
    [1, 0, 32.5, 0, 0, 211.5, 0],
    [3, 0, 0, 0, 0, 8.05, 1],
    [1, 1, 55.0, 2, 0, 25.7, 1],
    [2, 0, 30.0, 0, 0, 13.0, 1],
    [3, 1, 24.0, 0, 0, 7.75, 2],
    [3, 0, 6.0, 1, 1, 15.2458, 0],
    [1, 0, 67.0, 1, 0, 221.7792, 1],
    [1, 0, 49.0, 0, 0, 26.0, 1],
    [3, 0, 0, 0, 0, 7.8958, 1],
    [2, 0, 0, 0, 0, 10.7083, 2],
    [3, 0, 0, 1, 0, 14.4542, 0],
    [3, 1, 27.0, 0, 0, 7.8792, 2],
    [3, 1, 18.0, 0, 0, 8.05, 1],
    [3, 1, 0, 0, 0, 7.75, 2],
    [2, 0, 2.0, 1, 1, 23.0, 1],
    [3, 1, 22.0, 1, 0, 13.9, 1],
    [3, 0, 0, 0, 0, 7.775, 1],
    [1, 1, 27.0, 1, 2, 52.0, 1],
    [3, 0, 0, 0, 0, 8.05, 1],
    [1, 0, 25.0, 0, 0, 26.0, 0],
    [3, 0, 25.0, 0, 0, 7.7958, 1],
    [1, 1, 76.0, 1, 0, 78.85, 1],
    [3, 0, 29.0, 0, 0, 7.925, 1],
    [3, 1, 20.0, 0, 0, 7.8542, 1],
    [3, 0, 33.0, 0, 0, 8.05, 1],
    [1, 1, 43.0, 1, 0, 55.4417, 0],
    [2, 0, 27.0, 1, 0, 26.0, 1],
    [3, 0, 0, 0, 0, 7.75, 2],
    [3, 0, 26.0, 0, 0, 7.775, 1],
    [3, 1, 16.0, 1, 1, 8.5167, 0],
    [3, 0, 28.0, 0, 0, 22.525, 1],
    [3, 0, 21.0, 0, 0, 7.8208, 2],
    [3, 0, 0, 0, 0, 7.75, 2],
    [3, 0, 0, 0, 0, 8.7125, 1],
    [2, 0, 18.5, 0, 0, 13.0, 1],
    [2, 0, 41.0, 0, 0, 15.0458, 0],
    [3, 1, 0, 0, 0, 7.7792, 2],
    [1, 1, 36.0, 0, 0, 31.6792, 0],
    [3, 1, 18.5, 0, 0, 7.2833, 2],
    [1, 1, 63.0, 1, 0, 221.7792, 1],
    [3, 0, 18.0, 1, 0, 14.4542, 0],
    [3, 0, 0, 0, 0, 6.4375, 0],
    [3, 1, 1.0, 1, 1, 16.7, 1],
    [1, 0, 36.0, 0, 0, 75.2417, 0],
    [2, 1, 29.0, 1, 0, 26.0, 1],
    [2, 1, 12.0, 0, 0, 15.75, 1],
    [3, 0, 0, 1, 0, 7.75, 2],
    [1, 1, 35.0, 1, 0, 57.75, 0],
    [3, 0, 28.0, 0, 0, 7.25, 1],
    [3, 0, 0, 0, 0, 7.75, 2],
    [3, 1, 17.0, 0, 1, 16.1, 1],
    [3, 0, 22.0, 0, 0, 7.7958, 1],
    [3, 1, 0, 2, 0, 23.25, 2],
    [2, 0, 42.0, 0, 0, 13.0, 1],
    [3, 0, 24.0, 0, 0, 8.05, 1],
    [3, 0, 32.0, 0, 0, 8.05, 1],
    [1, 0, 53.0, 0, 0, 28.5, 0],
    [3, 1, 0, 0, 4, 25.4667, 1],
    [3, 0, 0, 1, 0, 6.4375, 0],
    [3, 0, 43.0, 0, 0, 7.8958, 1],
    [3, 0, 24.0, 0, 0, 7.8542, 1],
    [3, 0, 26.5, 0, 0, 7.225, 0],
    [2, 0, 26.0, 0, 0, 13.0, 1],
    [3, 1, 23.0, 0, 0, 8.05, 1],
    [3, 0, 40.0, 1, 6, 46.9, 1],
    [3, 1, 10.0, 5, 2, 46.9, 1],
    [1, 1, 33.0, 0, 0, 151.55, 1],
    [1, 0, 61.0, 1, 3, 262.375, 0],
    [2, 0, 28.0, 0, 0, 26.0, 1],
    [1, 0, 42.0, 0, 0, 26.55, 1],
    [3, 0, 31.0, 3, 0, 18.0, 1],
    [1, 0, 0, 0, 0, 51.8625, 1],
    [3, 0, 22.0, 0, 0, 8.05, 1],
    [1, 0, 0, 0, 0, 26.55, 1],
    [2, 0, 30.0, 1, 1, 26.0, 1],
    [1, 1, 23.0, 0, 1, 83.1583, 0],
    [3, 0, 0, 0, 0, 7.8958, 0],
    [3, 0, 60.5, 0, 0, 0, 1],
    [3, 1, 36.0, 0, 2, 12.1833, 1],
    [3, 0, 13.0, 4, 2, 31.3875, 1],
    [3, 0, 24.0, 0, 0, 7.55, 1],
    [1, 1, 29.0, 0, 0, 221.7792, 1],
    [3, 1, 23.0, 0, 0, 7.8542, 1],
    [1, 0, 42.0, 0, 0, 26.55, 1],
    [3, 1, 26.0, 0, 2, 13.775, 1],
    [3, 1, 0, 0, 0, 7.7333, 2],
    [3, 0, 7.0, 1, 1, 15.2458, 0],
    [2, 1, 26.0, 0, 0, 13.5, 1],
    [3, 0, 0, 0, 0, 7.0, 1],
    [2, 0, 41.0, 0, 0, 13.0, 1],
    [3, 1, 26.0, 1, 1, 22.025, 1],
    [1, 0, 48.0, 0, 0, 50.4958, 0],
    [3, 0, 18.0, 2, 2, 34.375, 1],
    [1, 1, 0, 0, 0, 27.7208, 0],
    [3, 1, 22.0, 0, 0, 8.9625, 1],
    [3, 0, 0, 0, 0, 7.55, 1],
    [3, 0, 27.0, 0, 0, 7.225, 0],
    [3, 0, 23.0, 1, 0, 13.9, 1],
    [3, 0, 0, 0, 0, 7.2292, 0],
    [3, 0, 40.0, 1, 5, 31.3875, 1],
    [2, 1, 15.0, 0, 2, 39.0, 1],
    [2, 1, 20.0, 0, 0, 36.75, 1],
    [1, 0, 54.0, 1, 0, 55.4417, 0],
    [2, 1, 36.0, 0, 3, 39.0, 1],
    [1, 1, 64.0, 0, 2, 83.1583, 0],
    [2, 0, 30.0, 0, 0, 13.0, 1],
    [1, 0, 37.0, 1, 1, 83.1583, 0],
    [1, 1, 18.0, 1, 0, 53.1, 1],
    [3, 0, 0, 0, 0, 7.75, 2],
    [1, 1, 27.0, 1, 1, 247.5208, 0],
    [2, 0, 40.0, 0, 0, 16.0, 1],
    [2, 1, 21.0, 0, 1, 21.0, 1],
    [3, 0, 17.0, 2, 0, 8.05, 1],
    [3, 1, 0, 8, 2, 69.55, 1],
    [2, 0, 40.0, 0, 0, 13.0, 1],
    [2, 0, 34.0, 1, 0, 26.0, 1],
    [1, 0, 0, 0, 0, 26.0, 1],
    [3, 0, 11.5, 1, 1, 14.5, 1],
    [2, 0, 61.0, 0, 0, 12.35, 2],
    [2, 0, 8.0, 0, 2, 32.5, 1],
    [3, 0, 33.0, 0, 0, 7.8542, 1],
    [1, 0, 6.0, 0, 2, 134.5, 0],
    [3, 1, 18.0, 0, 0, 7.775, 1],
    [2, 0, 23.0, 0, 0, 10.5, 1],
    [3, 1, 0, 0, 0, 8.1125, 1],
    [3, 1, 0, 0, 0, 15.5, 2],
    [3, 0, 0.33, 0, 2, 14.4, 1],
    [1, 0, 47.0, 1, 0, 227.525, 0],
    [2, 1, 8.0, 1, 1, 26.0, 1],
    [2, 0, 25.0, 0, 0, 10.5, 1],
    [1, 0, 0, 0, 0, 25.7417, 0],
    [3, 1, 35.0, 0, 0, 7.75, 2],
    [2, 0, 24.0, 0, 0, 10.5, 1],
    [1, 1, 33.0, 0, 0, 27.7208, 0],
    [3, 0, 25.0, 0, 0, 7.8958, 1],
    [3, 0, 32.0, 0, 0, 22.525, 1],
    [3, 0, 0, 0, 0, 7.05, 1],
    [2, 0, 17.0, 0, 0, 73.5, 1],
    [2, 1, 60.0, 1, 0, 26.0, 1],
    [3, 1, 38.0, 4, 2, 7.775, 1],
    [1, 0, 42.0, 0, 0, 42.5, 1],
    [3, 1, 0, 0, 0, 7.8792, 2],
    [1, 0, 57.0, 1, 1, 164.8667, 1],
    [1, 1, 50.0, 1, 1, 211.5, 0],
    [3, 0, 0, 0, 0, 8.05, 1],
    [2, 1, 30.0, 1, 0, 13.8583, 0],
    [3, 0, 21.0, 0, 0, 8.05, 1],
    [2, 1, 22.0, 0, 0, 10.5, 1],
    [3, 0, 21.0, 0, 0, 7.7958, 1],
    [1, 1, 53.0, 0, 0, 27.4458, 0],
    [3, 1, 0, 0, 2, 15.2458, 0],
    [3, 0, 23.0, 0, 0, 7.7958, 1],
    [3, 1, 0, 0, 0, 7.75, 2],
    [3, 0, 40.5, 0, 0, 15.1, 1],
    [2, 0, 36.0, 0, 0, 13.0, 1],
    [2, 0, 14.0, 0, 0, 65.0, 1],
    [1, 1, 21.0, 0, 0, 26.55, 1],
    [3, 0, 21.0, 1, 0, 6.4958, 1],
    [3, 0, 0, 0, 0, 7.8792, 2],
    [1, 0, 39.0, 1, 0, 71.2833, 0],
    [3, 0, 20.0, 0, 0, 7.8542, 1],
    [1, 0, 64.0, 1, 0, 75.25, 0],
    [3, 0, 20.0, 0, 0, 7.225, 0],
    [2, 1, 18.0, 1, 1, 13.0, 1],
    [1, 1, 48.0, 1, 0, 106.425, 0],
    [1, 1, 55.0, 0, 0, 27.7208, 0],
    [2, 1, 45.0, 0, 2, 30.0, 1],
    [1, 0, 45.0, 1, 1, 134.5, 0],
    [3, 0, 0, 0, 0, 7.8875, 1],
    [3, 0, 0, 1, 2, 23.45, 1],
    [1, 0, 41.0, 1, 0, 51.8625, 1],
    [2, 1, 22.0, 0, 0, 21.0, 1],
    [2, 0, 42.0, 1, 1, 32.5, 1],
    [2, 1, 29.0, 1, 0, 26.0, 1],
    [3, 1, 0, 1, 0, 14.4542, 0],
    [2, 1, 0.92, 1, 2, 27.75, 1],
    [3, 0, 20.0, 0, 0, 7.925, 1],
    [1, 0, 27.0, 1, 0, 136.7792, 0],
    [3, 0, 24.0, 0, 0, 9.325, 1],
    [3, 0, 32.5, 0, 0, 9.5, 1],
    [3, 0, 0, 0, 0, 7.55, 1],
    [3, 0, 0, 0, 0, 7.75, 2],
    [3, 0, 28.0, 0, 0, 8.05, 1],
    [2, 1, 19.0, 0, 0, 13.0, 1],
    [3, 0, 21.0, 0, 0, 7.775, 1],
    [3, 0, 36.5, 1, 0, 17.4, 1],
    [3, 0, 21.0, 0, 0, 7.8542, 1],
    [2, 1, 29.0, 0, 2, 23.0, 1],
    [3, 1, 1.0, 1, 1, 12.1833, 1],
    [2, 0, 30.0, 0, 0, 12.7375, 0],
    [3, 0, 0, 0, 0, 7.8958, 1],
    [1, 0, 0, 0, 0, 0.0, 1],
    [3, 0, 0, 0, 0, 7.55, 1],
    [3, 1, 0, 0, 0, 8.05, 1],
    [3, 0, 17.0, 0, 0, 8.6625, 1],
    [1, 0, 46.0, 0, 0, 75.2417, 0],
    [3, 0, 0, 0, 0, 7.75, 2],
    [1, 1, 26.0, 1, 0, 136.7792, 0],
    [3, 1, 0, 1, 0, 15.5, 2],
    [3, 0, 0, 0, 0, 7.225, 0],
    [2, 1, 20.0, 1, 0, 26.0, 1],
    [2, 0, 28.0, 0, 0, 10.5, 1],
    [2, 0, 40.0, 1, 0, 26.0, 1],
    [2, 0, 30.0, 1, 0, 21.0, 1],
    [2, 0, 22.0, 0, 0, 10.5, 1],
    [3, 1, 23.0, 0, 0, 8.6625, 1],
    [3, 0, 0.75, 1, 1, 13.775, 1],
    [3, 1, 0, 0, 0, 7.75, 2],
    [3, 1, 9.0, 1, 1, 15.2458, 0],
    [3, 1, 2.0, 1, 1, 20.2125, 1],
    [3, 0, 36.0, 0, 0, 7.25, 1],
    [3, 0, 0, 0, 0, 7.25, 1],
    [1, 0, 24.0, 1, 0, 82.2667, 1],
    [3, 0, 0, 0, 0, 7.2292, 0],
    [3, 0, 0, 0, 0, 8.05, 1],
    [1, 0, 0, 0, 0, 39.6, 1],
    [3, 1, 30.0, 0, 0, 6.95, 2],
    [3, 0, 0, 0, 0, 7.2292, 0],
    [1, 0, 53.0, 1, 1, 81.8583, 1],
    [3, 0, 36.0, 0, 0, 9.5, 1],
    [3, 0, 26.0, 0, 0, 7.8958, 1],
    [2, 1, 1.0, 1, 2, 41.5792, 0],
    [3, 0, 0, 2, 0, 21.6792, 0],
    [1, 0, 30.0, 0, 0, 45.5, 1],
    [3, 0, 29.0, 0, 0, 7.8542, 1],
    [3, 0, 32.0, 0, 0, 7.775, 1],
    [2, 0, 0, 0, 0, 15.0458, 0],
    [2, 0, 43.0, 0, 1, 21.0, 1],
    [3, 0, 24.0, 0, 0, 8.6625, 1],
    [3, 1, 0, 0, 0, 7.75, 2],
    [1, 1, 64.0, 1, 1, 26.55, 1],
    [1, 0, 30.0, 1, 2, 151.55, 1],
    [3, 0, 0.83, 0, 1, 9.35, 1],
    [1, 0, 55.0, 1, 1, 93.5, 1],
    [3, 1, 45.0, 1, 0, 14.1083, 1],
    [3, 0, 18.0, 0, 0, 8.6625, 1],
    [3, 0, 22.0, 0, 0, 7.225, 0],
    [3, 0, 0, 0, 0, 7.575, 1],
    [3, 1, 37.0, 0, 0, 7.75, 2],
    [1, 1, 55.0, 0, 0, 135.6333, 0],
    [3, 1, 17.0, 0, 0, 7.7333, 2],
    [1, 0, 57.0, 1, 0, 146.5208, 0],
    [2, 0, 19.0, 0, 0, 10.5, 1],
    [3, 0, 27.0, 0, 0, 7.8542, 1],
    [2, 0, 22.0, 2, 0, 31.5, 1],
    [3, 0, 26.0, 0, 0, 7.775, 1],
    [3, 0, 25.0, 0, 0, 7.2292, 0],
    [2, 0, 26.0, 0, 0, 13.0, 1],
    [1, 0, 33.0, 0, 0, 26.55, 1],
    [1, 1, 39.0, 0, 0, 211.3375, 1],
    [3, 0, 23.0, 0, 0, 7.05, 1],
    [2, 1, 12.0, 2, 1, 39.0, 1],
    [1, 0, 46.0, 0, 0, 79.2, 0],
    [2, 0, 29.0, 1, 0, 26.0, 1],
    [2, 0, 21.0, 0, 0, 13.0, 1],
    [2, 1, 48.0, 0, 2, 36.75, 1],
    [1, 0, 39.0, 0, 0, 29.7, 0],
    [3, 0, 0, 0, 0, 7.225, 0],
    [3, 1, 19.0, 1, 1, 15.7417, 0],
    [3, 0, 27.0, 0, 0, 7.8958, 1],
    [1, 0, 30.0, 0, 0, 26.0, 1],
    [2, 0, 32.0, 0, 0, 13.0, 1],
    [3, 0, 39.0, 0, 2, 7.2292, 0],
    [2, 0, 25.0, 0, 0, 31.5, 1],
    [3, 0, 0, 0, 0, 7.2292, 0],
    [2, 0, 18.0, 0, 0, 10.5, 1],
    [3, 0, 32.0, 0, 0, 7.5792, 1],
    [3, 0, 0, 1, 9, 69.55, 1],
    [1, 1, 58.0, 0, 1, 512.3292, 0],
    [3, 0, 0, 1, 1, 14.5, 1],
    [3, 1, 16.0, 0, 0, 7.65, 1],
    [2, 0, 26.0, 0, 0, 13.0, 1],
    [3, 1, 38.0, 0, 0, 7.2292, 0],
    [2, 0, 24.0, 0, 0, 13.5, 1],
    [2, 1, 31.0, 0, 0, 21.0, 1],
    [1, 1, 45.0, 0, 1, 63.3583, 0],
    [2, 0, 25.0, 0, 0, 10.5, 1],
    [2, 0, 18.0, 0, 0, 73.5, 1],
    [2, 0, 49.0, 1, 2, 65.0, 1],
    [3, 1, 0.17, 1, 2, 20.575, 1],
    [1, 0, 50.0, 0, 0, 26.0, 1],
    [1, 1, 59.0, 2, 0, 51.4792, 1],
    [3, 0, 0, 0, 0, 7.8792, 1],
    [3, 0, 0, 0, 0, 7.75, 2],
    [3, 1, 30.0, 1, 0, 15.55, 1],
    [3, 0, 14.5, 8, 2, 69.55, 1],
    [2, 1, 24.0, 1, 1, 37.0042, 0],
    [2, 1, 31.0, 0, 0, 21.0, 1],
    [3, 0, 27.0, 0, 0, 8.6625, 1],
    [1, 1, 25.0, 1, 0, 55.4417, 0],
    [3, 1, 0, 1, 9, 69.55, 1],
    [3, 0, 0, 1, 0, 14.4583, 0],
    [3, 1, 22.0, 0, 0, 39.6875, 1],
    [1, 1, 45.0, 0, 1, 59.4, 0],
    [2, 0, 29.0, 0, 0, 13.8583, 0],
    [2, 0, 21.0, 1, 0, 11.5, 1],
    [1, 1, 31.0, 0, 0, 134.5, 0],
    [1, 0, 49.0, 0, 0, 0.0, 1],
    [2, 0, 44.0, 0, 0, 13.0, 1],
    [1, 1, 54.0, 1, 1, 81.8583, 1],
    [1, 1, 45.0, 0, 0, 262.375, 0],
    [3, 1, 22.0, 2, 0, 8.6625, 1],
    [2, 0, 21.0, 0, 0, 11.5, 1],
    [1, 0, 55.0, 0, 0, 50.0, 1],
    [3, 0, 5.0, 4, 2, 31.3875, 1],
    [3, 0, 0, 0, 0, 7.75, 2],
    [3, 0, 26.0, 0, 0, 7.8792, 2],
    [3, 1, 0, 0, 0, 14.5, 1],
    [3, 1, 19.0, 1, 0, 16.1, 1],
    [2, 0, 0, 0, 0, 12.875, 1],
    [2, 1, 24.0, 1, 2, 65.0, 1],
    [3, 0, 24.0, 0, 0, 7.775, 1],
    [2, 0, 57.0, 0, 0, 13.0, 1],
    [3, 0, 21.0, 0, 0, 7.75, 2],
    [3, 0, 6.0, 3, 1, 21.075, 1],
    [1, 0, 23.0, 0, 0, 93.5, 1],
    [1, 1, 51.0, 0, 1, 39.4, 1],
    [3, 0, 13.0, 0, 2, 20.25, 1],
    [2, 0, 47.0, 0, 0, 10.5, 1],
    [3, 0, 29.0, 3, 1, 22.025, 1],
    [1, 1, 18.0, 1, 0, 60.0, 1],
    [3, 0, 24.0, 0, 0, 7.25, 2],
    [1, 1, 48.0, 1, 1, 79.2, 0],
    [3, 0, 22.0, 0, 0, 7.775, 1],
    [3, 0, 31.0, 0, 0, 7.7333, 2],
    [1, 1, 30.0, 0, 0, 164.8667, 1],
    [2, 0, 38.0, 1, 0, 21.0, 1],
    [1, 1, 22.0, 0, 1, 59.4, 0],
    [1, 0, 17.0, 0, 0, 47.1, 1],
    [1, 0, 43.0, 1, 0, 27.7208, 0],
    [2, 0, 20.0, 0, 0, 13.8625, 0],
    [2, 0, 23.0, 1, 0, 10.5, 1],
    [1, 0, 50.0, 1, 1, 211.5, 0],
    [3, 1, 0, 0, 0, 7.7208, 2],
    [3, 1, 3.0, 1, 1, 13.775, 1],
    [3, 1, 0, 0, 0, 7.75, 2],
    [1, 1, 37.0, 1, 0, 90.0, 2],
    [3, 1, 28.0, 0, 0, 7.775, 1],
    [3, 0, 0, 0, 0, 8.05, 1],
    [1, 1, 39.0, 0, 0, 108.9, 0],
    [3, 0, 38.5, 0, 0, 7.25, 1],
    [3, 0, 0, 0, 0, 8.05, 1],
    [3, 0, 0, 1, 1, 22.3583, 0],
]

const y_test = [
    0,
    1,
    0,
    0,
    1,
    0,
    1,
    0,
    1,
    0,
    0,
    0,
    1,
    0,
    1,
    1,
    0,
    0,
    1,
    1,
    0,
    0,
    1,
    0,
    1,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    0,
    0,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    0,
    0,
    0,
    1,
    1,
    0,
    0,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    1,
    0,
    1,
    1,
    0,
    0,
    1,
    1,
    0,
    1,
    0,
    1,
    0,
    0,
    1,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    0,
    1,
    0,
    1,
    0,
    0,
    0,
    1,
    0,
    1,
    0,
    1,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    0,
    0,
    1,
    0,
    1,
    1,
    0,
    1,
    0,
    0,
    1,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    0,
    0,
    1,
    0,
    0,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    0,
    1,
    1,
    0,
    0,
    1,
    0,
    1,
    0,
    1,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    1,
    1,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    1,
    0,
    1,
    0,
    1,
    0,
    1,
    0,
    1,
    0,
    1,
    1,
    0,
    1,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    1,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    1,
    1,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    1,
    0,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    1,
    0,
    1,
    0,
    1,
    1,
    0,
    0,
    0,
    1,
    0,
    1,
    0,
    0,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    0,
    0,
    1,
    0,
    0,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    1,
    0,
    1,
    0,
    0,
    1,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    0,
    0,
    0,
]