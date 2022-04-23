// ------------------------ IMPORTS ------------------------  
import React from 'react';
import AlgorithmsDashboard from 'components/AlgorithmsDashboard';
import CSVTable from 'components/CSVTable';
import LinearRegressionP6 from 'components/linear_regression/LinearRegressionPage6';


export default function LR5() {
    return (
        <AlgorithmsDashboard
            currentAlgorithmName="lr"
            currentStep={6}
            component={<LinearRegressionP6/>}
        />
    );
}
