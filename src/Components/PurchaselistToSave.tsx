import * as React from 'react';
import { ProductByMount } from "../utils/modals";

import {
//   DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  DataGrid,
  GridColumns
 
} from '@mui/x-data-grid';

import { useSelector } from 'react-redux';
export interface GridRowsProp{
name:string,
//date:Date,
id:Number,
amount:Number
}
// const rows: GridRowsProp = [
//   {
//     jobTitle: 'Head of Human Resources',
//     recruitmentDate: new Date(2020, 8, 12),
//     contract: 'full time',
//     id: 0,
//   },
//   {
//     jobTitle: 'Head of Sales',
//     recruitmentDate: new Date(2017, 3, 4),
//     contract: 'full time',
//     id: 1,
//   },
//   {
//     jobTitle: 'Sales Person',
//     recruitmentDate: new Date(2020, 11, 20),
//     contract: 'full time',
//     id: 2,
//   },
//   {
//     jobTitle: 'Sales Person',
//     recruitmentDate: new Date(2020, 10, 14),
//     contract: 'part time',
//     id: 3,
//   },
//   {
//     jobTitle: 'Sales Person',
//     recruitmentDate: new Date(2017, 10, 29),
//     contract: 'part time',
//     id: 4,
//   },
//   {
//     jobTitle: 'Sales Person',
//     recruitmentDate: new Date(2020, 7, 21),
//     contract: 'full time',
//     id: 5,
//   },
//   {
//     jobTitle: 'Sales Person',
//     recruitmentDate: new Date(2020, 7, 20),
//     contract: 'intern',
//     id: 6,
//   },
//   {
//     jobTitle: 'Sales Person',
//     recruitmentDate: new Date(2019, 6, 28),
//     contract: 'full time',
//     id: 7,
//   },
//   {
//     jobTitle: 'Head of Engineering',
//     recruitmentDate: new Date(2016, 3, 14),
//     contract: 'full time',
//     id: 8,
//   },
//   {
//     jobTitle: 'Tech lead front',
//     recruitmentDate: new Date(2016, 5, 17),
//     contract: 'full time',
//     id: 9,
//   },
//   {
//     jobTitle: 'Front-end developer',
//     recruitmentDate: new Date(2019, 11, 7),
//     contract: 'full time',
//     id: 10,
//   },
//   {
//     jobTitle: 'Tech lead devops',
//     recruitmentDate: new Date(2021, 7, 1),
//     contract: 'full time',
//     id: 11,
//   },
//   {
//     jobTitle: 'Tech lead back',
//     recruitmentDate: new Date(2017, 0, 12),
//     contract: 'full time',
//     id: 12,
//   },
//   {
//     jobTitle: 'Back-end developer',
//     recruitmentDate: new Date(2019, 2, 22),
//     contract: 'intern',
//     id: 13,
//   },
//   {
//     jobTitle: 'Back-end developer',
//     recruitmentDate: new Date(2018, 4, 19),
//     contract: 'part time',
//     id: 14,
//   },
// ];

const columns: GridColumns = [
  { field: 'Name', headerName: 'שם מוצר', type: 'string', width: 200 },
 
  {
    field: 'amount',
    headerName: 'כמות',
    type: 'Number',
    
    width: 150,
  },
   {
    field: 'recruitmentDate',
    headerName: 'תאריך קניה',
    type: 'date',
    width: 150,
  },
];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function PurchaselistToSave() {
  const stateRows:ProductByMount[]=   useSelector((st: any) => st.pro.productsList)||[]
let rows:GridRowsProp[]=stateRows.map((item: ProductByMount) => {
  let row: GridRowsProp
  row = {
    name:item.name,
//date:
id:item.id,
amount:item.amount
  }
  return row as  GridRowsProp
})

  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </div>
  );
}