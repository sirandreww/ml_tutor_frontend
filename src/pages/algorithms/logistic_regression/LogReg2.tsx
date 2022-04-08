// ------------------------ IMPORTS ------------------------  
import React from 'react';
import AlgorithmsDashboard from 'components/AlgorithmsDashboard';
import LogisticRegression from "components/LogisticRegression/LogisticRegression";
import { create, all } from 'mathjs';

const math = create(all, {})

export default function LogReg2() {
    return (
        <AlgorithmsDashboard
            currentAlgorithmName="logreg"
            currentStep={2}
            component={ <LogisticRegression
                data_batch={x_train}
                classifications={y_train}
                learning_rate={0.0015}
                total_iterations={1000}
            />
            }
        />
    );
}

const x_train = math.transpose(math.matrix([
    [3,0,22.0,1,0,7.25,1],
    [1,1,38.0,1,0,71.2833,0],
    [3,1,26.0,0,0,7.925,1],
    [1,1,35.0,1,0,53.1,1],
    [3,0,35.0,0,0,8.05,1],
    [3,0,20.0,0,0,8.4583,2],
    [1,0,54.0,0,0,51.8625,1],
    [3,0,2.0,3,1,21.075,1],
    [3,1,27.0,0,2,11.1333,1],
    [2,1,14.0,1,0,30.0708,0],
]))

const y_train = math.matrix([0, 1, 1, 1, 0, 0, 0, 0, 1, 1])
