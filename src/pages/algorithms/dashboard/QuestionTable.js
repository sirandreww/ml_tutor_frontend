import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

/**
 * Creates the header of the table
 * @param {Number} num The number of rows
 * @param {String[][]} formater [['field name', 'header name'],['field name', 'header name'],...], the first is the field name and the second is the header name (header name is what will be present to the user)
 * @returns 
 */
function generateColumns(formater) {
    var columns = []
    for (let col = 0; col < formater.length; col++) {
        const [field, header] = formater[col];
        const editable = col !== 0

        columns.push({
            field: field, 
            headerName: header, 
            editable: editable, 
            sortable: false, 
            headerAlign: 'center', 
            flex: header.length, 
            align: 'center',
            cellClassName: 'super-app.default',
            headerClassName: 'super-app-theme--header',
        })
    }

    return columns
}

/**
 * Creates an empty rows of the table
 * @param {Number} num The number of rows
 * @param {String[][]} formater [['field name', 'header name'],['field name', 'header name'],...], the first is the field name and the second is the header name (header name is what will be present to the user)
 * @param {Boolean} exampleEnabled if ture you must provide an example of the answer
 * @param {any[]} example if exampleEnabled is true the first line will be filled with the example answer (won't be editable), otherwise it will be ignored
 * @returns 
 */
function generateRows(num, formater, example, exampleEnabled, rowNumberingEnabled) {
    var rows = []
    var tmp = {}
    var currentRow = 0
    
    if (exampleEnabled) {
        tmp['id'] = currentRow
        
        for (let index = 0; index < formater.length; index++) {
            const [field, ] = formater[index];
            tmp[field] = (index === 0) ? currentRow + 1 : example[index]
        }

        rows.push(tmp)
        currentRow += 1
        num += 1
    }

    for (; currentRow < num; currentRow++) {
        tmp = {'id': currentRow}

        for (let index = 0; index < formater.length; index++) {
            const [field, ] = formater[index];
            tmp[field] = (index === 0 && rowNumberingEnabled) ? currentRow + 1 : null
        }    
        
        rows.push(tmp)
    }

    return rows
}

/**
 * Table for users to enter their answers and check them on button click!
 * @param {object} props Component props
 * @param {Number} props.rowsNum The number of rows
 * @param {String[][]} props.headers [['field name', 'header name'],['field name', 'header name'],...], the first is the field name and the second is the header name (header name is what will be present to the user)
 * @param {Boolean} props.rowNumbersEnabled if ture the first column will be numbered automatically
 * @param {Boolean} props.exampleEnabled if ture you must provide an example of the answer
 * @param {any[]} props.example if exampleEnabled is true the first line will be filled with the example answer (won't be editable), otherwise it will be ignored
 * @param {{[Key: String]: any[]}} props.correctAnswers the key is the column header while the value is an array of the correct answers of that column (if exampleEnabled is true so include its answers).
 * @returns the desired table functionality
 */
 export default function QuestionTable({rowsNum, headers, rowNumbersEnabled, exampleEnabled, example, correctAnswers}) {
    const cs = generateColumns(headers)
    const rs = generateRows(rowsNum, headers, example, exampleEnabled, rowNumbersEnabled)
    console.log(
        '\nrowsNum=', rowsNum,
        '\nheaders=', headers,
        '\nexampleEnabled=', exampleEnabled,
        '\nexample=', example,
        '\ncs=', cs,
        '\nrs=', rs,
        '\ncorrectAnswers=', correctAnswers,
    )
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
                columns = { cs }
                rows = { rs }
                isCellEditable = { (params) => !exampleEnabled || params.row.id !== 0 }
                disableColumnMenu = { true }
                hideFooter = { true }
                autoHeight = { true }
                getCellClassName={(params) => {
                    // if(params.id === 0){
                    //     console.log(
                    //         '\nparams.getValue(params.id, params.field)=', params.getValue(params.id, params.field),
                    //         '\ncorrectAnswers[params.field][params.id]=', correctAnswers[params.field][params.id],
                    //         '\nparams.id', params.id,
                    //         '\nparams.field', params.field,
                    //         '\nparams.headerName', params.headerName,
                    //         '\nequals? ', params.getValue(params.id, params.field) === correctAnswers[params.field][params.id]
                    //     )
                    // }
                    if (params.getValue(params.id, params.field) === null || (exampleEnabled && params.id === 0) || (rowNumbersEnabled && params.field === headers[0][0])) {
                        return 'default';
                    }
                    if(params.getValue(params.id, params.field) === correctAnswers[params.field][params.id]){
                        return 'correct'
                    }
                    else{
                        return 'wrong'
                    }
                }}
            />
        </Box>
    )
}