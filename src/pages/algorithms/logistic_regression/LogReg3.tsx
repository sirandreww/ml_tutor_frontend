// ------------------------ IMPORTS ------------------------  
import React from 'react';
import AlgorithmsDashboard from 'components/AlgorithmsDashboard';

export default function LogReg3() {
    return (
        <AlgorithmsDashboard
            currentAlgorithmName="logreg"
            currentStep={3}
            component={ "logreg" }
        />
    );
}
