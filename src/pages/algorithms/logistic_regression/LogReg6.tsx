// ------------------------ IMPORTS ------------------------  
import React from 'react';
import AlgorithmsDashboard from 'components/AlgorithmsDashboard';
import LogisticRegressionTraining from "../../../components/logistic_regression/LogisticRegressionTraining";

export default function LogReg6() {
    return (
        <AlgorithmsDashboard
            currentAlgorithmName="logreg"
            currentStep={6}
            component={
                <LogisticRegressionTraining />
            }
        />
    );
}
