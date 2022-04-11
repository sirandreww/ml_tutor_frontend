// ------------------------ IMPORTS ------------------------  
import React from 'react';
import AlgorithmsDashboard from 'components/AlgorithmsDashboard';
import { Box, Typography } from '@mui/material';
import { languageAlign, languageDirection, LeftItem } from 'components/LanguageAndButtonUtility';
import GradientDescent1D from 'components/GradientDescentGenericPage1D';
import { useTranslation } from "react-i18next";
import Grid from "@mui/material/Grid";
import LinearRegressionP3 from 'components/LinearRegressionPage3';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { randomInt } from '@mui/x-data-grid-generator';

export default function LR2() {

    let idCounter = 0;
    const createRandomRow = () => {
        idCounter += 1;
        return { id: idCounter, x: randomInt(0, 15), y: randomInt(0, 15) };
    };
    
    const [rows, setRows] = React.useState(() => [
        createRandomRow()
    ]);
    
      
    const handleDeleteRow = () => {
        setRows((prevRows) => {
        const rowToDeleteIndex = randomInt(0, prevRows.length - 1);
        return [
            ...rows.slice(0, rowToDeleteIndex),
            ...rows.slice(rowToDeleteIndex + 1),
        ];
        });
    };
      
    const handleAddRow = () => {
        setRows((prevRows) => [...prevRows, createRandomRow()]);
    };

    return (
        <AlgorithmsDashboard
            currentAlgorithmName="lr"
            currentStep={3}
            component={
                <Box>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, }}>
                <Grid item xs={12}>
                            <LeftItem>
                                <Typography sx={{ color: 'black', fontSize: '1rem', textAlign: languageAlign(), direction: languageDirection() }}>
                                In this example we will try to predict the housing prices (in millions) according to the number of rooms.
                                The table contains data of housing prices. below, there are the parameters needed in order to evaluate the prediction of the model, the Regression function, and finally, the graph with the regression line.
                                </Typography>
                            </LeftItem>
                        </Grid>
                        <Grid item xs={3}> 
                            <Stack
                                sx={{ width: '100%', mb: 1 }}
                                direction="row"
                                alignItems="flex-start"
                                columnGap={1}
                            >
                                <Button size="small" onClick={handleAddRow}>
                                Add a row
                                </Button>
                                <Button size="small" onClick={handleDeleteRow}>
                                Delete a row
                                </Button>
                            </Stack>
                            <Box sx={{ height: 400, bgcolor: 'background.paper' }}>
                                <DataGrid hideFooter 
                                rows={rows} 
                                columns={[
                                    { headerName:"x", field: 'x', editable: true,sortable: false, headerAlign:'center', align:'center' },
                                    { headerName:"y", field: 'y', editable: true,sortable: false, headerAlign:'center', align:'center' },
                                  ]} 

                                sx={{
                                    boxShadow: 2,
                                    border: 2,
                                    '.MuiDataGrid-columnSeparator': {
                                    display: 'none',
                                    },
                                    '&.MuiDataGrid-root': {
                                    border: 'none',
                                    },
                                    '.MuiDataGrid-columnHeaderTitle':{
                                        
                                    }
                                }} 
                                />
                            </Box>
                        </Grid>
                    <Grid item xs={12}>
                        <LinearRegressionP3/>
                    </Grid>
                </Grid>
            </Box>
            }
        />
    );
}
