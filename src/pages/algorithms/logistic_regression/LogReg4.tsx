// ------------------------ IMPORTS ------------------------  
import React from 'react';
import AlgorithmsDashboard from 'components/AlgorithmsDashboard';
import LogisticRegressionMultiInputs from "../../../components/logistic_regression/LogisticRegressionMultiInputs";

export default function LogReg4() {
    return (
        <AlgorithmsDashboard
            currentAlgorithmName="logreg"
            currentStep={4}
            component={
                <LogisticRegressionMultiInputs />
            }
        />
    );
}
