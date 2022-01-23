// ------------------------ IMPORTS ------------------------  
import * as React from 'react';
import AlgorithmsDashboard from 'pages/algorithms/dashboard/AlgorithmsDashboard';
import GDStepper from 'pages/algorithms/gradient_descent/slides/GDStepper';
import Introduction1D from 'pages/algorithms/gradient_descent/slides/Introduction1D';

export default function GD1() {
    return (
        <AlgorithmsDashboard 
            stepper={<GDStepper activeStep={0} />}
            component={<Introduction1D />}
            previous="/algorithms/gd1"
            isPreviousDisabled={true}
            next="/algorithms/gd2"
            isNextDisabled={false}
         />
    );
}
