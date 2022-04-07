// ------------------------ IMPORTS ------------------------  
import React from 'react';
import AlgorithmsDashboard from 'components/AlgorithmsDashboard';
import CSVTable from 'components/CSVTable';

export default function LR3() {
    return (
        <AlgorithmsDashboard
            currentAlgorithmName="lr"
            currentStep={3}
            component={"empty"}
        />
    );
}
