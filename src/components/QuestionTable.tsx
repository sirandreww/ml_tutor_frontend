import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

// function generateColumns(formater: [string, JSX.Element, number][]): GridColDef[] {
//     var columns: GridColDef[] = [];
//     for (let col = 0; col < formater.length; col++) {
//         const [field, header, flex_percent] = formater[col];

//         const current_col: GridColDef = {
//             field: field,
//             // @ts-ignore
//             headerName: header,
//             editable: false,
//             sortable: false,
//             headerAlign: 'center',
//             flex: flex_percent,
//             align: 'center',
//             cellClassName: 'super-app.default',
//             headerClassName: 'super-app-theme--header',
//         }

//         columns.push(current_col)
//     }
//     return columns;
// }

function generateRows(num: number, headers: [string, JSX.Element, number][], example: string[],
    exampleEnabled: boolean, rowNumberingEnabled: boolean): { [id: string]: string }[] {
    var rows: { [id: string]: string }[] = []
    var currentRow = 0

    if (exampleEnabled) {
        var tmp: { [id: string]: string } = {}
        tmp['id'] = currentRow.toString()

        for (let index = 0; index < headers.length; index++) {
            const field: string = (headers[index])[0];
            tmp[field] = (index === 0) ? "1" : example[index]
        }

        rows.push(tmp)
        currentRow += 1
        num += 1
    }

    for (; currentRow < num; currentRow++) {
        var tmp: { [id: string]: string } = {}
        tmp['id'] = currentRow.toString()

        for (let index = 0; index < headers.length; index++) {
            const field: string = (headers[index])[0];
            tmp[field] = (index === 0 && rowNumberingEnabled) ? (currentRow + 1).toString() : ""
        }

        rows.push(tmp)
    }

    return rows
}

type QuestionTableProps = {
    rowsNum: number,
    headers: GridColDef[],
    exampleEnabled: boolean,
    correctAnswers: {[id: string]: string[]},
    comparator: (a: string, b: string) => boolean,
};

export default function QuestionTable(props: QuestionTableProps) {
    return (
        <Box sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            '& .default': {
                backgroundColor: '#e8e8e8',
                color: '#1a3e72',
                fontSize: '1rem',
                fontWeight: '600',
            },
            '& .correct': {
                backgroundColor: 'rgba(157, 255, 118, 0.49)',
                color: '#1a3e72',
                fontSize: '1rem',
                fontWeight: '600',
            },
            '& .wrong': {
                backgroundColor: '#d47483',
                color: '#1a3e72',
                fontSize: '1rem',
                fontWeight: '600',
            },
            '& .super-app-theme--header': {
                backgroundColor: 'rgb(60, 78, 118, 0.5)',
                color: 'black',
                fontSize: '1.2rem',
                fontWeight: '1000',
            },
        }}
        >
            <DataGrid
                columns={props.headers}
                rows={generateRows(props.rowsNum, props.headers, props.example, props.exampleEnabled, props.rowNumbersEnabled)}
                isCellEditable={(params) => !props.exampleEnabled || params.row.id !== 0}
                disableColumnMenu={true}
                hideFooter={true}
                autoHeight={true}
                getCellClassName={(params) => {
                    if (params.row(params.id, params.field) === "" || (props.exampleEnabled && params.id === 0) || (props.rowNumbersEnabled && params.field === props.headers[0][0])) {
                        return 'default';
                    }
                    if (props.comparator(params.row(params.id, params.field), props.correctAnswers[params.field][Number(params.id)].toString())) {
                        return 'correct'
                    }
                    else {
                        return 'wrong'
                    }
                }}
            />
        </Box>
    )
}



