// ------------------------ IMPORTS ------------------------  
import React from 'react';
import AlgorithmsDashboard from 'components/AlgorithmsDashboard';
import CSVTable from 'components/CSVTable';
import LinearRegressionP5 from 'components/linear_regression/LinearRegressionPage5';


export default function LR5() {
    return (
        <AlgorithmsDashboard
            currentAlgorithmName="lr"
            currentStep={5}
            component={<LinearRegressionP5/>}
        />
    );
}
