import React from 'react';


export default function ColoredSquare(props: { color: string }) {
    return (
        <div style={{
            float: "left",
            height: "20px",
            width: '20px',
            marginBottom: '0px',
            marginRight: '2px',
            border: '1px solid black',
            clear: 'both',
            backgroundColor: props.color
        }}></div>
    );
}
