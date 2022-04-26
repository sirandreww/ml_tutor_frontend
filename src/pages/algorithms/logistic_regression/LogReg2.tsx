// ------------------------ IMPORTS ------------------------  
import React from 'react';
import AlgorithmsDashboard from 'components/AlgorithmsDashboard';
import LogisticRegressionExercise1 from 'components/logistic_regression/LogisticRegressionExercise1';

export default function LogReg2() {
    return (
        <AlgorithmsDashboard
            currentAlgorithmName="logreg"
            currentStep={2}
            component={
                <LogisticRegressionExercise1 />
            }
        />
    );
}


