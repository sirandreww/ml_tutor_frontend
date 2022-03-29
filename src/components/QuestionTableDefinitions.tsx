import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { mathJaxConfig, mathJaxStyle } from 'components/LanguageAndButtonUtility';
import { MathJax, MathJaxContext } from "better-react-mathjax";

// field: field,
// headerName: header, 
// editable: false, 
// sortable: false, 
// headerAlign: 'center', 
// flex: flex_percent, 
// align: 'center',
// cellClassName: 'super-app.default',
// headerClassName: 'super-app-theme--header',

export function getTwoDimensionsColumnNames(): GridColDef[] {
    const columnNames: GridColDef[] = [
        {
            field: 'step',
            // @ts-ignore
            headerName: <MathJax style={mathJaxStyle} inline>{"\\(Step\\)"}</MathJax>,
            flex: 1, editable: false
        },
        {
            field: 'x',
            // @ts-ignore
            headerName: <MathJax style={mathJaxStyle} inline>{"\\(x\\)"}</MathJax>,
            flex: 1, editable: false
        },
        {
            field: 'y',
            // @ts-ignore
            headerName: <MathJax style={mathJaxStyle} inline>{"\\(y\\)"}</MathJax>,
            flex: 1, editable: false
        },
        {
            field: 'dx',
            // @ts-ignore
            headerName: <MathJax style={mathJaxStyle} inline>{"\\(\\frac{df}{dx}\\)"}</MathJax>,
            flex: 1, editable: false
        },
        {
            field: 'dy',
            // @ts-ignore
            headerName: <MathJax style={mathJaxStyle} inline>{"\\(\\frac{df}{dy}\\)"}</MathJax>,
            flex: 1, editable: false
        },
        {
            field: 'a*dx',
            // @ts-ignore
            headerName: <MathJax style={mathJaxStyle} inline>{"\\(\\alpha*\\frac{df}{dx}\\)"}</MathJax>,
            flex: 2, editable: false
        },
        {
            field: 'a*dy',
            // @ts-ignore
            headerName: <MathJax style={mathJaxStyle} inline>{"\\(\\alpha*\\frac{df}{dy}\\)"}</MathJax>,
            flex: 2, editable: false
        },
        {
            field: 'newX',
            // @ts-ignore
            headerName: <MathJax style={mathJaxStyle} inline>{"\\(x_{new}\\)"}</MathJax>,
            flex: 1, editable: false
        },
        {
            field: 'newY',
            // @ts-ignore
            headerName: <MathJax style={mathJaxStyle} inline>{"\\(y_{new}\\)"}</MathJax>,
            flex: 1, editable: false
        },
    ];

    return columnNames;
}