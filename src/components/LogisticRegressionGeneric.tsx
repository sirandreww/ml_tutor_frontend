import React from 'react';
import LogisticRegressionIntoduction from 'components/LogisticRegressionIntoduction';

type Props = {
    includeIntroduction: boolean,
}

export default function LogisticRegressionGeneric(props: Props) {
    return (
        <div>
            {props.includeIntroduction ? <LogisticRegressionIntoduction />: <div /> }
        </div>
    );
}
