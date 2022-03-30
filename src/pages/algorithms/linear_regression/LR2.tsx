// ------------------------ IMPORTS ------------------------  
import React from 'react';
import AlgorithmsDashboard from 'components/AlgorithmsDashboard';
import CSVTable from 'components/CSVTable';

export default function LR2() {
    return (
        <AlgorithmsDashboard
            currentAlgorithmName="lr"
            currentStep={1}
            component={<CSVTable />}
            previous="/algorithms/lr1"
            isPreviousDisabled={false}
            next="/algorithms/lr2"
            isNextDisabled={false}
        />
    );
}
