// ------------------------ IMPORTS ------------------------  
import React from 'react';
import AlgorithmsDashboard from 'pages/algorithms/dashboard/AlgorithmsDashboard';
import Introduction1D from 'pages/algorithms/linear_regression/slides/Introduction1D';

export default function LR1() {
    return (
        <AlgorithmsDashboard
            currentAlgorithmName="lr"
            activeStep={0}
            component={<Introduction1D />}
            previous="/algorithms/lr1"
            isPreviousDisabled={true}
            next="/algorithms/lr1"
            isNextDisabled={false}
        />
    );
}
