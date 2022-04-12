import React from 'react';
import LogisticRegressionIntoduction from 'components/logistic_regression/LogisticRegressionIntoduction';
import LogisticRegressionVectorRepresentation from 'components/logistic_regression/LogisticRegressionVectorRepresentation';
import LogisticRegressionExercise1 from 'components/logistic_regression/LogisticRegressionBatchesExercise1';

type Props = {
    // includeIntroduction?: boolean,
    // includeVectorRepresentation?: boolean
    // includeExercise1?: boolean
}

// @ts-ignore
export default function LogisticRegressionGeneric(props: Props) {
    return (
        <div>
            {/* {props.includeIntroduction !== undefined && props.includeIntroduction ? <LogisticRegressionIntoduction />: <div /> }
            {props.includeVectorRepresentation !== undefined && props.includeVectorRepresentation ? <LogisticRegressionVectorRepresentation />: <div /> } */}
        </div>
    );
}
