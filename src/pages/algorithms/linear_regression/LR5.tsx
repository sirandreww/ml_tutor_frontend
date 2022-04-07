// ------------------------ IMPORTS ------------------------  
import React from 'react';
import AlgorithmsDashboard from 'components/AlgorithmsDashboard';
import CSVTable from 'components/CSVTable';

export default function LR5() {
    return (
        <AlgorithmsDashboard
            currentAlgorithmName="lr"
            currentStep={5}
            component={"empty"}
        />
    );
}
