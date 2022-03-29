// ------------------------ IMPORTS ------------------------  
import React from 'react';
import AlgorithmsDashboard from 'pages/algorithms/dashboard/AlgorithmsDashboard';
import Introduction1D from 'pages/algorithms/gradient_descent/slides/Introduction1D';

export default function GD1() {
    return (
        <AlgorithmsDashboard
            currentAlgorithmName="gd"
            currentStep={0}
            component={ <Introduction1D /> }
            previous="/algorithms/gd1"
            isPreviousDisabled={true}
            next="/algorithms/gd2"
            isNextDisabled={false}
        />
    );
}
