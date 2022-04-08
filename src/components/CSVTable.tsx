import * as React from 'react';
// @ts-ignore - if you want to remove FIX it before pushing to master
import { useDemoData } from '@mui/x-data-grid-generator';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

export default function CSVTable() {
  const { data, loading } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 4,
    maxColumns: 6,
  });

  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid {...data} loading={loading} components={{ Toolbar: GridToolbar }} />
    </div>
  );
}