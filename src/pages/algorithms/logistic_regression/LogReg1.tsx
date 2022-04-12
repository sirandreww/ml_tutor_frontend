// ------------------------ IMPORTS ------------------------  
import React from 'react';
import AlgorithmsDashboard from 'components/AlgorithmsDashboard';
import LogisticRegressionIntoduction from 'components/logistic_regression/LogisticRegressionIntoduction';

export default function LogReg1() {
    return (
        <AlgorithmsDashboard
            currentAlgorithmName="logreg"
            currentStep={1}
            component={
                <LogisticRegressionIntoduction />
            }
        />
    );
}
