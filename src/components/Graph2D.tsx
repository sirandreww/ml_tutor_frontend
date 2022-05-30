// ------------------------ IMPORTS ------------------------  
import React from 'react';
import { getData2D, getGraph2D } from 'components/GradientDescentHelper';


// --------------------------------------------------------

type Props = {
    function: string,
    y_i: number,
    y_f: number,
    x_i: number, 
    x_f: number
}

export default function Graph2D(props: Props) {
    React.useEffect(() => {
        getGraph2D(getData2D(props.function, props.y_i, props.y_f, props.x_i, props.x_f), {x:[],y:[],z:[]})
    });
    
    return (<div id='graph2-board'></div>);
}

