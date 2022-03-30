// ------------------------ IMPORTS ------------------------  
import React from 'react';
import AlgorithmsDashboard from 'components/AlgorithmsDashboard';
import Introduction1D from 'components/LinearRegressionIntroduction1D';

export default function LR1() {
    return (
        <AlgorithmsDashboard
            currentAlgorithmName="lr"
            currentStep={1}
            component={<Introduction1D />}
        />
    );
}
