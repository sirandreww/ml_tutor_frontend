// ------------------------ IMPORTS ------------------------  
import React from 'react';
import AlgorithmsDashboard from 'components/AlgorithmsDashboard';
import LogisticRegressionGeneric from 'components/logistic_regression/LogisticRegressionGeneric';

export default function LogReg1() {
    return (
        <AlgorithmsDashboard
            currentAlgorithmName="logreg"
            currentStep={1}
            component={
                <LogisticRegressionGeneric
                    includeIntroduction={true}
                />
            }
        />
    );
}
