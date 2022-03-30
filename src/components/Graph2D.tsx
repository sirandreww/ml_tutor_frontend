// ------------------------ IMPORTS ------------------------  
import React from 'react';
import { getData2D, getGraph2D } from 'components/GradientDescentHelper';


// --------------------------------------------------------

type Props = {
    function: string,
}

export default function Graph2D(props: Props) {
    React.useEffect(() => {
        getGraph2D(getData2D(props.function), {x:[],y:[],z:[]})
    });
    
    return (<div id='graph2-board'></div>);
}

