import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';

// @ts-ignore
function generateRows(rowsNum: number, headers: GridColDef[], exampleEnabled: boolean, correctAnswers: { [id: string]: string }[]): { [id: string]: string }[] {
    // var rows: { [id: string]: string }[] = []

    // if (exampleEnabled) {
    //     var tmp: { [id: string]: string } = {}
    //     tmp['id'] = currentRow.toString()

    //     for (let index = 0; index < headers.length; index++) {
    //         const field: string = (headers[index])[0];
    //         tmp[field] = (index === 0) ? "1" : example[index]
    //     }

    //     rows.push(tmp)
    //     currentRow += 1
    //     num += 1
    // }

    // for (; currentRow < num; currentRow++) {
    //     var tmp: { [id: string]: string } = {}
    //     tmp['id'] = currentRow.toString()

    //     for (let index = 0; index < headers.length; index++) {
    //         const field: string = (headers[index])[0];
    //         tmp[field] = (index === 0 && rowNumberingEnabled) ? (currentRow + 1).toString() : ""
    //     }

    //     rows.push(tmp)
    // }

    // return rows

    return correctAnswers;
}

type QuestionTableProps = {
    rowsNum: number,
    headers: GridColDef[],
    exampleEnabled: boolean,
    correctAnswers: { [id: string]: string }[],
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
                rows={generateRows(props.rowsNum, props.headers, props.exampleEnabled, props.correctAnswers)}
                isCellEditable={(params) => !props.exampleEnabled || params.row.id !== 0}
                disableColumnMenu={true}
                hideFooter={true}
                autoHeight={true}
                getRowId={(row) => Number(row.step)}
                getCellClassName={(params: GridCellParams<string>) => {
                    if (params.value === '' || params.field === "step") {
                        return '';
                    } else if (props.comparator(params.value, props.correctAnswers[Number(params.id)][params.field])){
                        return 'correct';
                    } else {
                        return 'wrong';
                    }
                }}
            />
        </Box>
    )
}



