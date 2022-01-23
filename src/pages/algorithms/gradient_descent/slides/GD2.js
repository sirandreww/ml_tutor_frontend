// ------------------------ IMPORTS ------------------------  
import * as React from 'react';
import AlgorithmsDashboard from 'pages/algorithms/dashboard/AlgorithmsDashboard';
import GDStepper from './GDStepper';
import Introduction1D from './Introduction1D';

export default function GD1() {
    return (
        <AlgorithmsDashboard 
            stepper={<GDStepper activeStep={0} />}
            component={<Introduction1D />}
            previous="/algorithms"
            isPreviousDisabled={true}
            next="/algorithms/gd2"
            isNextDisabled={false}
         />
    );
}
