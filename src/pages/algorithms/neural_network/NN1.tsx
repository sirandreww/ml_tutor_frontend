// ------------------------ IMPORTS ------------------------  
import React from 'react';
import AlgorithmsDashboard from 'components/AlgorithmsDashboard';
import NeuralNetworkGeneric from 'components/NeuralNetworkGeneric';

export default function NN1() {
    return (
        <AlgorithmsDashboard
            currentAlgorithmName="nn"
            currentStep={1}
            component={<NeuralNetworkGeneric/>}
        />
    );
}
