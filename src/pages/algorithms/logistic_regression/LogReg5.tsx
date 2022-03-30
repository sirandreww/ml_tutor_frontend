// ------------------------ IMPORTS ------------------------  
import React from 'react';
import AlgorithmsDashboard from 'components/AlgorithmsDashboard';

export default function LogReg5() {
    return (
        <AlgorithmsDashboard
            currentAlgorithmName="logreg"
            currentStep={5}
            component={ "logreg" }
        />
    );
}
