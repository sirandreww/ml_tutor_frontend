// ------------------------ IMPORTS ------------------------  
import React from 'react';
import AlgorithmsDashboard from 'components/AlgorithmsDashboard';
import LogisticRegressionIntroduction from 'components/logistic_regression/LogisticRegressionIntroduction';

export default function LogReg1() {
    return (
        <AlgorithmsDashboard
            currentAlgorithmName="logreg"
            currentStep={1}
            component={
                <LogisticRegressionIntroduction />
            }
        />
    );
}
