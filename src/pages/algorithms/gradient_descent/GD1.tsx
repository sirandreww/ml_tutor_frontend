// ------------------------ IMPORTS ------------------------  
import React from 'react';
import AlgorithmsDashboard from 'components/AlgorithmsDashboard';
import Introduction1D from 'components/gradient_descent/GradientDescentIntroduction1D';

export default function GD1() {
    return (
        <AlgorithmsDashboard
            currentAlgorithmName="gd"
            currentStep={1}
            component={ <Introduction1D /> }
        />
    );
}
