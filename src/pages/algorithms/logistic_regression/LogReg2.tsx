// ------------------------ IMPORTS ------------------------  
import React from 'react';
import AlgorithmsDashboard from 'components/AlgorithmsDashboard';
import LogisticRegressionGeneric from 'components/logistic_regression/LogisticRegressionGeneric';

export default function LogReg2() {
    return (
        <AlgorithmsDashboard
            currentAlgorithmName="logreg"
            currentStep={2}
            component={
                <LogisticRegressionGeneric
                    includeVectorRepresentation={true}
                />
            }
        />
    );
}


