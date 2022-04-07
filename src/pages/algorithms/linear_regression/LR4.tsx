// ------------------------ IMPORTS ------------------------  
import React from 'react';
import AlgorithmsDashboard from 'components/AlgorithmsDashboard';
import CSVTable from 'components/CSVTable';

export default function LR4() {
    return (
        <AlgorithmsDashboard
            currentAlgorithmName="lr"
            currentStep={4}
            component={"empty"}
        />
    );
}
