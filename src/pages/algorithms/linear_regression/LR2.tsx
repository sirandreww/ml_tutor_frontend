// ------------------------ IMPORTS ------------------------  
import React from 'react';
import AlgorithmsDashboard from 'components/AlgorithmsDashboard';
import CSVTable from 'components/CSVTable';

export default function LR2() {
    return (
        <AlgorithmsDashboard
            currentAlgorithmName="lr"
            currentStep={2}
            component={<CSVTable />}
        />
    );
}
