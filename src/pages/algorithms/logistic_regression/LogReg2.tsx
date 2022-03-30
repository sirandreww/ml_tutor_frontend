// ------------------------ IMPORTS ------------------------  
import React from 'react';
import AlgorithmsDashboard from 'components/AlgorithmsDashboard';

export default function LogReg2() {
    return (
        <AlgorithmsDashboard
            currentAlgorithmName="logreg"
            currentStep={2}
            component={ "logreg" }
        />
    );
}
