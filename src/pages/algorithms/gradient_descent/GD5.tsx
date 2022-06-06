// ------------------------ IMPORTS ------------------------  
import React from 'react';
import AlgorithmsDashboard from 'components/AlgorithmsDashboard';
import Introduction2D from 'components/gradient_descent/GradientDescentIntroduction2D';

export default function GD5() {
    return (
        <AlgorithmsDashboard
            currentAlgorithmName="gd"
            currentStep={5}
            component={ <Introduction2D /> }
        />
    );
}
