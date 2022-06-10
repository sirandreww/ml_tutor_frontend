// ------------------------ IMPORTS ------------------------  
import React from 'react';
import AlgorithmsDashboard from 'components/AlgorithmsDashboard';
import { Box, Typography } from '@mui/material';
import { languageAlign, languageDirection, LeftItem } from 'components/LanguageAndButtonUtility';
import GradientDescent1D from 'components/gradient_descent/GradientDescentGenericPage1D';
import Grid from "@mui/material/Grid";
import LinearRegressionP2 from 'components/linear_regression/LinearRegressionPage2';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import { useTranslation } from "react-i18next";

export default function LR2() {
    const [t] = useTranslation('translation');
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
                                {t("lr.p2_desc")}
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
