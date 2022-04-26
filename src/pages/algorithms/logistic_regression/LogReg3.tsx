// ------------------------ IMPORTS ------------------------  
import React from 'react';
import AlgorithmsDashboard from 'components/AlgorithmsDashboard';
import LogisticRegressionVectorRepresentation from 'components/logistic_regression/LogisticRegressionVectorRepresentation';

export default function LogReg3() {
    return (
        <AlgorithmsDashboard
            currentAlgorithmName="logreg"
            currentStep={3}
            component={
                <LogisticRegressionVectorRepresentation />
            }
        />
    );
}
