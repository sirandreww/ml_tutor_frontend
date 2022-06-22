
// ------------------------ IMPORTS ------------------------  
import React, { useState } from "react";
// import { getData2D, getGraph2D } from 'components/gradient_descent/GradientDescentHelper';
//@ts-ignore
import Graph from "react-graph-vis";
// import ReactDOM from "react-dom";
// import { layer } from "@tensorflow/tfjs-vis/dist/show/model";
// import { Paper } from "@mui/material";
import { LeftItem } from "./LanguageAndButtonUtility";

// --------------------------------------------------------


const options = {
    layout: {
        hierarchical: {
            direction: "LR",
            sortMethod: "directed"
        }
    },
    edges: {
        color: "#000000"
    }
};

// function randomColor() {
//     const red = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
//     const green = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
//     const blue = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
//     return `#${red}${green}${blue}`;
// }

type Props = {
    layers: number[],
    colors: String[],
    style: any
}


export default function NNGraph2d(props: Props) {

    function getNodesAndEdges(props: Props): [{ id: number; label: string; color: string; }[], { from: number, to: number }[]] {
        var cid = 0
        var nodes: { id: number; label: string; color: string; }[] = []
        var edges: { from: number, to: number }[] = []
        for (var i = 0; i < props.layers.length; i += 1) {
            const first_id_in_current_layer = cid;
            for (var j = 0; j < props.layers[i]; j += 1) {
                nodes = nodes.concat({ id: cid, label: `Layer ${i + 1}, Neuron ${j + 1}`, color: `${props.colors[i]}` });
                if (i > 0) {
                    // not first layer
                    for (var k = first_id_in_current_layer - 1; k >= (first_id_in_current_layer - props.layers[i - 1]); k -= 1) {
                        edges = edges.concat({ from: k, to: cid });
                    }
                }
                cid += 1;
            }
        }
        return [nodes, edges];
    }

    const nn = getNodesAndEdges(props);

    // const createNode = (x: any, y: any) => {
    //     const color = randomColor();
    //     setState(({ graph: { nodes, edges }, counter, ...rest }) => {
    //         const id = counter + 1;
    //         const from = Math.floor(Math.random() * (counter - 1)) + 1;
    //         return {
    //             graph: {
    //                 nodes: [
    //                     ...nodes,
    //                     { id, label: `Node ${id}`, color, x, y }
    //                 ],
    //                 edges: [
    //                     ...edges,
    //                     { from, to: id }
    //                 ]
    //             },
    //             counter: id,
    //             ...rest
    //         }
    //     });
    // }
    const [state, setState] = useState({
        counter: 5,
        graph: {
            nodes: nn[0],
            // [
            //     { id: 2, label: "Node 2", color: "#e09c41" },
            //     { id: 3, label: "Node 3", color: "#e0df41" },
            //     { id: 4, label: "Node 4", color: "#7be041" },
            //     { id: 5, label: "Node 5", color: "#41e0c9" }
            // ],
            edges: nn[1]
        },
        events: {
            select: ({ nodes, edges }: { nodes: any, edges: any }) => {
                console.log("Selected nodes:");
                console.log(nodes);
                console.log("Selected edges:");
                console.log(edges);
                // alert("Selected node: " + nodes);
            },
            // doubleClick: ({ pointer: { canvas } }: {pointer: { canvas:any }}) => {
            //     createNode(canvas.x, canvas.y);
            // }
        }
    })
    const { graph, events } = state;



    return (
        <LeftItem>
            <Graph graph={graph} options={options} events={events} style={props.style} />
        </LeftItem>
    );
}

