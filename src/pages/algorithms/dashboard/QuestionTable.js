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
            cellClassName: 'super-app-theme--cell',
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
function generateRows(num, formater, example, exampleEnabled) {
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
            tmp[field] = (index === 0) ? currentRow + 1 : null
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
 * @param {Boolean} props.exampleEnabled if ture you must provide an example of the answer
 * @param {any[]} props.example if exampleEnabled is true the first line will be filled with the example answer (won't be editable), otherwise it will be ignored
 * @returns the desired table functionality
 */
 export default function QuestionTable({rowsNum, headers, exampleEnabled, example}) {
    const cs = generateColumns(headers)
    const rs = generateRows(rowsNum, headers, example, exampleEnabled)

    return (
        <Box sx={{
                justifyContent: 'space-between',
                alignItems: 'center',
                pt: '5%',
                pb: '5%',
                pr: '5%',
                pl: '5%',
                '& .super-app-theme--cell': {
                    backgroundColor: '#e8e8e8',
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
            />
        </Box>
    )
}