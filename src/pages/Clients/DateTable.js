import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'Nombre',
    headerName: 'Nombre',
    flex: 1,
    description: 'This column has a value getter and is not sortable.',
    // sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue(params.id, 'name') || ''} ${
        params.getValue(params.id, 'lastName') || ''
      }`,
  },
  {
    field: 'firstName',
    headerName: 'First name',
    flex: 1,
    width: 150,
    editable: true,
  },
  // {
  //   field: 'lastName',
  //   headerName: 'Last name',
  //   flex: 1,
  //   width: 150,
  //   editable: true,
  // },
  // {
  //   field: 'age',
  //   headerName: 'Age',
  //   flex: 1,
  //   type: 'number',
  //   width: 110,
  //   editable: true,
  // },
  // {
  //   field: 'age',
  //   headerName: 'Age',
  //   flex: 1,
  //   type: 'number',
  //   width: 110,
  //   editable: true,
  // },
];

const rows = [
  { id: 1, lastName: 'Snow', name: 'Jon', age: 35, onRowClick: (params) => console.log('hola')},
  { id: 2, lastName: 'Lannister', name: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', name: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', name: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', name: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', name: null, age: 150 },
  { id: 7, lastName: 'Clifford', name: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', name: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', name: 'Harvey', age: 65 },
];


export default function DataTable({ data }) {
  // const [clients, setClients] = React.useState(data)
  // if(data) {
    // const newData = data[0].name
  // }
  // console.log(clients)

  return (data &&
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={3}
        // checkboxSelection
        disableSelectionOnClick
        density='compact'
      />
    </div>
  );
}
