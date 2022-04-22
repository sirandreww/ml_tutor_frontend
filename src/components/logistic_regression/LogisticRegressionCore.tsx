import {all, create} from "mathjs";

export function sigmoid(value: number): number {
    let exp = math.exp(-value)
    return Number(math.evaluate("1/(1+exp)", {exp: exp}))
}

export const math = create(all, {})
export type Matrix = math.Matrix
export type Module = {
    W: Matrix,
    B: number
}

export type ModuleInfos = {
    module: Module,
    costs: number[],
    ws: Matrix[],
    bs: number[],
    ys: Matrix[],
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
    private readonly _YS: Matrix[];


    constructor(data_batch: number[][], classifications: number[], learning_rate: number, total_iterations: number) {
        this._X = data_batch
        this._Y = classifications
        this._ALPHA = learning_rate
        this._ITERATIONS = total_iterations

        // console.log("_X:\n", data_batch)
        // console.log("_Y:\n", classifications)
        // console.log("_ALPHA:\n", learning_rate)
        // console.log("_ITERATIONS:\n", total_iterations)
        console.log("data_batch = \n", data_batch)
        console.log("classifications = \n", classifications)
        let tmp = LogisticRegressionModule.createModule(
            math.transpose(math.matrix(this._X)),
            math.matrix(this._Y),
            this._ALPHA,
            this._ITERATIONS)

        console.log("tmp = \n", tmp)
        this._MODULE = tmp.module
        this._COSTS = tmp.costs
        this._WS = tmp.ws
        this._BS = tmp.bs
        this._YS = tmp.ys
    }

    public getModule(): Module {
        return this._MODULE
    }

    public getModuleInfo(): ModuleInfos {
        return {
            module: this._MODULE,
            costs: this._COSTS,
            ws: this._WS,
            bs: this._BS,
            ys: this._YS,
        }
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
        // console.log("test_batch = " + test_batch)
        // console.log("test_classifications = " + test_classifications)

        let total_mismatches = 0;
        for (let i = 0; i < test_batch.length; i++) {
            let prediction = this.predict(test_batch[i])
            if(prediction !== test_classifications[i])
                total_mismatches++
        }

        // console.log("total_mismatches = " + total_mismatches)
        // console.log("test_classifications.length = " + test_classifications.length)
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
        let ys_per_iteration = []

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
            ys_per_iteration.push(A)
            cost_per_iteration.push(cost)
            ws_per_iteration.push(W)
            bs_per_iteration.push(B)
        }

        return {
            module: {W: W, B: B} as Module,
            costs: cost_per_iteration,
            ws: ws_per_iteration,
            bs: bs_per_iteration,
            ys: ys_per_iteration
        }
    }
}