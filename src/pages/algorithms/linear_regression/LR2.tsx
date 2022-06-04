// ------------------------ IMPORTS ------------------------  
import React from 'react';
import AlgorithmsDashboard from 'components/AlgorithmsDashboard';
import { Box, Typography } from '@mui/material';
import { languageAlign, languageDirection, LeftItem } from 'components/LanguageAndButtonUtility';
import GradientDescent1D from 'components/gradient_descent/GradientDescentGenericPage1D';
import { useTranslation } from "react-i18next";
import Grid from "@mui/material/Grid";
import LinearRegressionP2 from 'components/linear_regression/LinearRegressionPage2';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';

export default function LR2() {
    return (
        <AlgorithmsDashboard
            currentAlgorithmName="lr"
            currentStep={2}
            component={
                <Box>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, }}>
                    <Grid item xs={9}>
                            <LeftItem>
                                <Typography sx={{ color: 'black', fontSize: '1rem', textAlign: languageAlign(), direction: languageDirection() }}>
                                In this example we will try to predict the housing prices (in millions) according to the number of rooms.
                                The table contains data of housing prices. below, there are the parameters needed in order to evaluate the prediction of the model, the Regression function, and finally, the graph with the regression line.
                                </Typography>
                            </LeftItem>
                        </Grid>
                        <Grid item xs={3} justifyContent="end"> 
                            <DataGrid
                                columns={[{ headerName:"x (#rooms)", field: 'x', editable: false,sortable: false, headerAlign:'center', align:'center' },
                                { headerName:"y (price)",field: 'y', editable: false, sortable: false, headerAlign:'center', align:'center' }]} 
                                rows={[
                                    { id: 1, x: '1', y:'3'},
                                    { id: 2, x: '2', y:'4'}, 
                                    { id: 3, x: '3', y:'8'},
                                    { id: 4, x: '4', y:'9'},
                                ]}
                                disableColumnMenu={true}
                                hideFooter={true}
                                autoHeight={true}
                                
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
                        </Grid>
                    <Grid item xs={12}>
                        <LinearRegressionP2/>
                    </Grid>
                </Grid>
            </Box>
            }
        />
    );
}
