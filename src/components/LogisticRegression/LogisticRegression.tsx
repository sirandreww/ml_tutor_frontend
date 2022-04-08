import React from 'react';
import { create, all } from 'mathjs';

const math = create(all, {})
type Matrix = math.Matrix
type Array = math.MathArray

function sigmoid(value: number): number {
    let exp = math.exp(-value)
    return Number(math.evaluate("1/(1+exp)", {exp: exp}))
}

function log(value: number): number {
    return math.log(value)
}

function cost_function_segma(Y: Array, A: Array): number {
    let left = math.multiply(Y, math.map(A, log))
    let right = math.multiply(math.map(Y, x => 1-x), math.map(A, x => log(1-x)))

    return math.sum(math.add(left, right) as number)
}

function calc_dW(A: Array, Y: Array, X: Matrix, m: number): Matrix {
    let dot = math.multiply(math.subtract(A, Y) as Matrix, math.transpose(X))
    return math.map(dot, x => (x/m))
}

function calc_dB(A: Array, Y: Array, m: number): number {
    return (math.sum(math.subtract(A, Y) as number)) / m
}

type Module = {
    W: Array,
    B: number
}

function createModule(X: Matrix, Y: Array, learning_rate: number, iterations: number): Module {

    // n = the total number of features in the batch
    const n: number = X.size()[0]
    // m = the total number of samples in the batch
    const m: number = X.size()[1]

    let W = math.zeros(n) as math.MathArray
    let B = 0

    // var cost_list = math.matrix()

    for (let i = 0; i < iterations; i++) {

        // Z = (W.transpose * X) + B
        let Z = math.map(math.multiply(math.transpose(W), X), x => x + B)
        let A = math.map(Z, x => sigmoid(x))

        // Calculate the cost function
        let cost = Number(math.evaluate("((-1 * x)/m)", { m: m, x: cost_function_segma(Y, A)}))

        // Gradiant Descent
        let dW = calc_dW(A, Y, X, m)
        let dB = calc_dB(A, Y, m)

        // Change W, B
        W = math.subtract(W, math.map(math.transpose(dW) , x => x*learning_rate)) as Array
        B = B - learning_rate*dB
    }

    return {W: W, B: B} as Module
}


type Props = {
    data_batch: any,
    classifications: any
    learning_rate: number,
    total_iterations: number,
}

export default function LogisticRegressionModule(props: Props) {
    const  {data_batch, classifications, learning_rate, total_iterations } = props
    const module = createModule(data_batch, classifications, learning_rate, total_iterations)

    return(
        <div>
            <div>{props}</div>
            <div>{module}</div>
        </div>
    )
}