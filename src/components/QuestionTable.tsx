import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';

// @ts-ignore
function generateRows(headers: GridColDef[], exampleEnabled: boolean, correctAnswers: { [id: string]: string }[]): { [id: string]: string }[] {
    let length = correctAnswers.length
    const IS_DEBUG_MODE = false;
    var generated: { [id: string]: string }[] = [];
    for(var i = 0; i < length; i += 1){
        if (i === 0 && exampleEnabled) {
            generated.push({...correctAnswers[0]});
        } else {
            var tmp:{ [id: string]: string } = {}
            for(var key in correctAnswers[i]) {
                if (key === "step" || IS_DEBUG_MODE){
                    tmp[key] = correctAnswers[i][key];
                } else {
                    tmp[key] = "";
                }
                
            }
            generated.push(tmp);
        }
    }

    return generated;
}

type QuestionTableProps = {
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
                rows={generateRows(props.headers, props.exampleEnabled, props.correctAnswers)}
                isCellEditable={(params) => !props.exampleEnabled || params.row.id !== 0}
                disableColumnMenu={true}
                hideFooter={true}
                autoHeight={true}
                getRowId={(row) => Number(row.step)}
                getCellClassName={(params: GridCellParams<string>) => {
                    if (params.value === '' || params.field === "step" || (props.exampleEnabled && params.row["step"] === "0")) {
                        return '';
                    } else if (props.comparator(params.value === undefined? "" : params.value, props.correctAnswers[Number(params.id)][params.field])){
                        return 'correct';
                    } else {
                        return 'wrong';
                    }
                }}
            />
        </Box>
    )
}



