// ------------------------ IMPORTS ------------------------  
import React from 'react';
import AlgorithmsDashboard from 'components/AlgorithmsDashboard';
import LogisticRegressionTraining from "../../../components/logistic_regression/LogisticRegressionTraining";

export default function LogReg5() {
    return (
        <AlgorithmsDashboard
            currentAlgorithmName="logreg"
            currentStep={5}
            component={
                <LogisticRegressionTraining />
            }
        />
    );
}
