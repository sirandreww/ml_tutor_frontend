import React from 'react';
import LogisticRegressionIntoduction from 'components/logistic_regression/LogisticRegressionIntoduction';
import LogisticRegressionVectorRepresentation from 'components/logistic_regression/LogisticRegressionVectorRepresentation';

type Props = {
    includeIntroduction?: boolean,
    includeVectorRepresentation?: boolean
}

export default function LogisticRegressionGeneric(props: Props) {
    return (
        <div>
            {props.includeIntroduction !== undefined && props.includeIntroduction ? <LogisticRegressionIntoduction />: <div /> }
            {props.includeVectorRepresentation !== undefined && props.includeVectorRepresentation ? <LogisticRegressionVectorRepresentation />: <div /> }
        </div>
    );
}
