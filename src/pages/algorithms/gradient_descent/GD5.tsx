// ------------------------ IMPORTS ------------------------  
import React from 'react';
import AlgorithmsDashboard from 'pages/algorithms/dashboard/AlgorithmsDashboard';
import Introduction2D from 'pages/algorithms/gradient_descent/slides/Introduction2D';

export default function GD5() {
    return (
        <AlgorithmsDashboard
            currentAlgorithmName="gd"
            currentStep={4}
            component={ <Introduction2D /> }
            previous="/algorithms/gd4"
            isPreviousDisabled={false}
            next="/algorithms/gd6"
            isNextDisabled={false}
        />
    );
}
