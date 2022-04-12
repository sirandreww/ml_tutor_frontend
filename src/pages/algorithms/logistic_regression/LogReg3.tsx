// ------------------------ IMPORTS ------------------------  
import React from 'react';
import AlgorithmsDashboard from 'components/AlgorithmsDashboard';
import LogisticRegressionExercise1 from 'components/logistic_regression/LogisticRegressionBatchesExercise1';

export default function LogReg3() {
    return (
        <AlgorithmsDashboard
            currentAlgorithmName="logreg"
            currentStep={3}
            component={
                <LogisticRegressionExercise1 />
            }
        />
    );
}
