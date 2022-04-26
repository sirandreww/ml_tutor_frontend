import React from 'react';
import {GridColDef} from '@mui/x-data-grid';
import {mathJaxStyle} from 'components/LanguageAndButtonUtility';
import {MathJax} from "better-react-mathjax";

// field: field,
// headerName: header, 
// editable: false, 
// sortable: false, 
// headerAlign: 'center', 
// flex: flex_percent, 
// align: 'center',
// cellClassName: 'super-app.default',
// headerClassName: 'super-app-theme--header',

export function getTwoDimensionalColumnNames(): GridColDef[] {
    return [
        {
            field: 'step',
            // @ts-ignore
            headerName: <MathJax style={mathJaxStyle} inline>{"\\(Step\\)"}</MathJax>,
            flex: 1, editable: false, align: "center"
        },
        {
            field: 'x',
            // @ts-ignore
            headerName: <MathJax style={mathJaxStyle} inline>{"\\(x\\)"}</MathJax>,
            flex: 1, editable: true
        },
        {
            field: 'y',
            // @ts-ignore
            headerName: <MathJax style={mathJaxStyle} inline>{"\\(y\\)"}</MathJax>,
            flex: 1, editable: true
        },
        {
            field: 'dx',
            // @ts-ignore
            headerName: <MathJax style={mathJaxStyle} inline>{"\\(\\frac{df}{dx}\\)"}</MathJax>,
            flex: 1, editable: true
        },
        {
            field: 'dy',
            // @ts-ignore
            headerName: <MathJax style={mathJaxStyle} inline>{"\\(\\frac{df}{dy}\\)"}</MathJax>,
            flex: 1, editable: true
        },
        {
            field: 'a*dx',
            // @ts-ignore
            headerName: <MathJax style={mathJaxStyle} inline>{"\\(\\alpha*\\frac{df}{dx}\\)"}</MathJax>,
            flex: 2, editable: true
        },
        {
            field: 'a*dy',
            // @ts-ignore
            headerName: <MathJax style={mathJaxStyle} inline>{"\\(\\alpha*\\frac{df}{dy}\\)"}</MathJax>,
            flex: 2, editable: true
        },
        {
            field: 'newX',
            // @ts-ignore
            headerName: <MathJax style={mathJaxStyle} inline>{"\\(x_{new}\\)"}</MathJax>,
            flex: 1, editable: true
        },
        {
            field: 'newY',
            // @ts-ignore
            headerName: <MathJax style={mathJaxStyle} inline>{"\\(y_{new}\\)"}</MathJax>,
            flex: 1, editable: true
        },
    ];
}

export function getOneDimensionalColumnNames(): GridColDef[] {
    return [
        {
            field: 'step',
            // @ts-ignore
            headerName: <MathJax style={mathJaxStyle} inline>{"\\(Step\\)"}</MathJax>,
            flex: 1, editable: false, align: "center"
        },
        {
            field: 'x',
            // @ts-ignore
            headerName: <MathJax style={mathJaxStyle} inline>{"\\(x\\)"}</MathJax>,
            flex: 1, editable: true
        },
        {
            field: 'dx',
            // @ts-ignore
            headerName: <MathJax style={mathJaxStyle} inline>{"\\(\\frac{df}{dx}(x)\\)"}</MathJax>,
            flex: 1, editable: true
        },
        {
            field: 'a*dx',
            // @ts-ignore
            headerName: <MathJax style={mathJaxStyle} inline>{"\\(\\alpha * \\frac{df}{dx}(x)\\)"}</MathJax>,
            flex: 1, editable: true
        },
        {
            field: 'newX',
            // @ts-ignore
            headerName: <MathJax style={mathJaxStyle} inline>{"\\(x_{new}\\)"}</MathJax>,
            flex: 1, editable: true
        },
    ];
}

export function getLogisticRegressionDataColumnNames(): GridColDef[] {
    return [
        {
            field: 'step',
            // @ts-ignore
            headerName: <MathJax style={mathJaxStyle} inline>{"\\(Step\\)"}</MathJax>,
            flex: 1, editable: false, align: "center"
        },
        {
            field: 'epoch',
            // @ts-ignore
            headerName: <MathJax style={mathJaxStyle} inline>{"\\(Epoch\\)"}</MathJax>,
            flex: 1, editable: true
        },
        {
            field: 'sid',
            // @ts-ignore
            headerName: <MathJax style={mathJaxStyle} inline>{"\\(Sample_{id}\\)"}</MathJax>,
            flex: 1, editable: true
        },
        {
            field: 'xOne',
            // @ts-ignore
            headerName: <MathJax style={mathJaxStyle} inline>{"\\(x_1\\)"}</MathJax>,
            flex: 1, editable: true
        },
        {
            field: 'xTwo',
            // @ts-ignore
            headerName: <MathJax style={mathJaxStyle} inline>{"\\(x_2\\)"}</MathJax>,
            flex: 1, editable: true
        },
        {
            field: 'yi',
            // @ts-ignore
            headerName: <MathJax style={mathJaxStyle}
                                 inline>{"\\(y_i = \\sigma(\\vec{w} \\cdot {X_{idXn}}^{t} + b) \\)"}</MathJax>,
            flex: 2, editable: true
        },
        {
            field: 'dbi',
            // @ts-ignore
            headerName: <MathJax style={mathJaxStyle} inline>{"\\(db_i = y_i - c_i\\)"}</MathJax>,
            flex: 2, editable: true
        },
    ];
}

export function getLogisticRegressionModuleInfoColumns(): GridColDef[] {
    return [
        {
            field: 'step',
            // @ts-ignore
            headerName: <MathJax style={mathJaxStyle} inline>{"\\(Step\\)"}</MathJax>,
            flex: 1, editable: false, align: "center"
        },
        {
            field: 'epoch',
            // @ts-ignore
            headerName: <MathJax style={mathJaxStyle} inline>{"\\(Epoch\\)"}</MathJax>,
            flex: 1, editable: true
        },
        {
            field: 'wOne',
            // @ts-ignore
            headerName: <MathJax style={mathJaxStyle} inline>{"\\(w_1\\)"}</MathJax>,
            flex: 1, editable: true
        },
        {
            field: 'wTwo',
            // @ts-ignore
            headerName: <MathJax style={mathJaxStyle} inline>{"\\(w_2\\)"}</MathJax>,
            flex: 1, editable: true
        },
        {
            field: 'b',
            // @ts-ignore
            headerName: <MathJax style={mathJaxStyle} inline>{"\\(b\\)"}</MathJax>,
            flex: 1, editable: true
        },
        {
            field: 'dwOne',
            // @ts-ignore
            headerName: <MathJax style={mathJaxStyle} inline>{"\\(dw_1\\)"}</MathJax>,
            flex: 1, editable: true
        },
        {
            field: 'dwTwo',
            // @ts-ignore
            headerName: <MathJax style={mathJaxStyle} inline>{"\\(dw_2\\)"}</MathJax>,
            flex: 1, editable: true
        },
        {
            field: 'dB',
            // @ts-ignore
            headerName: <MathJax style={mathJaxStyle} inline>{"\\(dB\\)"}</MathJax>,
            flex: 1, editable: true
        },
        {
            field: 'wOneNew',
            // @ts-ignore
            headerName: <MathJax style={mathJaxStyle} inline>{"\\(w_{1_{new}}\\)"}</MathJax>,
            flex: 1, editable: true
        },
        {
            field: 'wTwoNew',
            // @ts-ignore
            headerName: <MathJax style={mathJaxStyle} inline>{"\\(w_{2_{new}}\\)"}</MathJax>,
            flex: 1, editable: true
        },
        {
            field: 'bNew',
            // @ts-ignore
            headerName: <MathJax style={mathJaxStyle} inline>{"\\(b_{new}\\)"}</MathJax>,
            flex: 1, editable: true
        },
    ];
}