import React from 'react';
import { create, all } from 'mathjs';

const math = create(all, {})
type Matrix = math.Matrix
type Array = math.MathArray
type Module = {
    W: Matrix,
    B: number
}

class LogisticRegressionModule {
    private _X: Matrix;
    private _Y: Matrix;
    private _ALPHA: number;
    private _ITERATIONS: number;
    private _MODULE: Module;

    constructor(data_batch: Matrix, classifications: Matrix, learning_rate: number, total_iterations: number) {
        this._X = data_batch
        this._Y = classifications
        this._ALPHA = learning_rate
        this._ITERATIONS = total_iterations

        // console.log("_X:\n", data_batch)
        // console.log("_Y:\n", classifications)
        // console.log("_ALPHA:\n", learning_rate)
        // console.log("_ITERATIONS:\n", total_iterations)
        this._MODULE = this.createModule(this._X, this._Y, this._ALPHA, this._ITERATIONS)
    }

    public getModule(): Module {
        return this._MODULE
    }

    public generateNewModule(
        data_batch: Matrix = this._X,
        classifications: Matrix = this._Y,
        learning_rate: number = this._ALPHA,
        total_iterations: number = this._ITERATIONS
    ): LogisticRegressionModule {
        return new LogisticRegressionModule(data_batch, classifications, learning_rate, total_iterations)
    }

    // public predict(X: Matrix): boolean {
    //     // TODO("CHANGE HERE TO CALCULATE THE PREDICTION")
    //     let Z = this._MODULE.B
    //     return LogisticRegressionModule.sigmoid(Z) > 0.5
    // }

    private static sigmoid(value: number): number {
        let exp = math.exp(-value)
        return Number(math.evaluate("1/(1+exp)", {exp: exp}))
    }

    private static log(value: number): number {
        return math.log(value)
    }

    private cost_function_segma(Y: Matrix, A: Matrix): number {
        let left = math.multiply(Y, math.map(A, LogisticRegressionModule.log))
        let right = math.multiply(math.map(Y, x => 1-x), math.map(A, x => LogisticRegressionModule.log(1-x)))

        return math.sum(math.add(left, right) as number)
    }

    private calc_dW(A: Matrix, Y: Matrix, X: Matrix, m: number): Matrix {
        let dot = math.multiply(math.subtract(A, Y) as Matrix, math.transpose(X))
        return math.map(dot, x => (x/m))
    }

    private calc_dB(A: Matrix, Y: Matrix, m: number): number {
        return (math.sum(math.subtract(A, Y) as number)) / m
    }

    private createModule(X: Matrix, Y: Matrix, learning_rate: number, iterations: number): Module {

        // n = the total number of features in the batch
        const n: number = X.size()[0]
        // m = the total number of samples in the batch
        const m: number = X.size()[1]

        // console.log("total number of features(n) = ", n)
        // console.log("total number of samples(m) = ", m)

        let W = math.zeros(n) as Matrix
        let B = 0

        // console.log("init W = ", W)
        // console.log("init B = ", B)
        // var cost_list = math.matrix()

        for (let i = 0; i < iterations; i++) {

            // Z = (W.transpose * X) + B
            // console.log("Calculating Z - ")
            let Z = math.map(math.multiply(math.transpose(W), X), x => x + B)
            // console.log(Z)
            // console.log("Calculating A - ")
            let A = math.map(Z, x => LogisticRegressionModule.sigmoid(x))
            // console.log(A)

            // Calculate the cost function
            // console.log("Calculating Cost - ")
            let cost = Number(math.evaluate("((-1 * x)/m)", { m: m, x: this.cost_function_segma(Y, A)}))
            // console.log(cost)

            // Gradiant Descent
            // console.log("Calculating dW - ")
            let dW = this.calc_dW(A, Y, X, m)
            // console.log(dW)
            // console.log("Calculating dB - ")
            let dB = this.calc_dB(A, Y, m)
            // console.log(dB)

            // Change W, B
            // console.log("Calculating new W - ")
            // console.log("dW.T = \n", math.transpose(dW))
            // console.log("learning_rate * dW.T = \n", math.map(math.transpose(dW),  x => x*learning_rate))
            W = math.subtract(W, math.map(math.transpose(dW),  x => x*learning_rate)) as Matrix
            // console.log(W)
            // console.log("Calculating new B - ")
            B = B - learning_rate*dB
            // console.log(B)
        }
        // console.log("final W - ")
        // console.log(W)
        // console.log("final B - ")
        // console.log(B)
        return {W: W, B: B} as Module
    }
}

type Props = {
    data_batch: Matrix,
    classifications: Matrix,
    learning_rate: number,
    total_iterations: number,
}

export default function LogisticRegression(props: Props) {
    const  {data_batch, classifications, learning_rate, total_iterations } = props
    const module = new LogisticRegressionModule(data_batch, classifications, learning_rate, total_iterations)

    return(
        <div>
            <span>The Module Ws = {module.getModule().W.toString()}</span>
            <span>The Module B = {module.getModule().B}</span>
        </div>
    )
}