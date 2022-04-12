// ------------------------ IMPORTS ------------------------  
import React from 'react';
import AlgorithmsDashboard from 'components/AlgorithmsDashboard';
import LogisticRegressionVectorRepresentation from 'components/logistic_regression/LogisticRegressionVectorRepresentation';


export default function LogReg2() {
    return (
        <AlgorithmsDashboard
            currentAlgorithmName="logreg"
            currentStep={2}
            component={
                <LogisticRegressionVectorRepresentation />
            }
        />
    );
}


