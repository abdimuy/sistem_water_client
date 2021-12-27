import { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';

function createData(number, nombre, date, pago, typeClient) {
  return { number, nombre, date, pago, typeClient };
}


export default function ReportTable({ transactions, total }) {

  // const [rows, setRows] = useState([...transactions]);
  // console.log({transactions})

  useEffect(() => {
    // createRows();
  }, []);

  // const createRows = () => {
  //   const rows = [
  //     createData(2, 'Alberto Hernandez', new Date().toLocaleString(), 500, 'Dueño de toma'),
  //     createData(3, 'Jose Sanchez', new Date().toLocaleString(), 237, 'Dueño de toma'),
  //     createData(4, 'Juan Perez', new Date().toLocaleString(), 262, 'Dueño de toma'),
  //     createData(5, 'Ernesto Pacheco', new Date().toLocaleString(), 305, 'Dueño de toma'),
  //     createData(6, 'Esteban Alvez', new Date().toLocaleString(), 356, 'Dueño de toma'),
  //   ];
  //   setRows(rows)
  // }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size='small' aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Numero cliente</TableCell>
            <TableCell align="right" >Nombre</TableCell>
            <TableCell align="right">Fecha</TableCell>
            <TableCell align="right">Pago</TableCell>
            <TableCell align="right">Tipo de cliente</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((row) => {
            return <TableRow
              key={row.nombre}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.numberWaterConnection}
              </TableCell>
              <TableCell align="right">{row.clientName}</TableCell>
              <TableCell align="right">{moment(row.dateCreate).format('DD/MM/YYYY')}</TableCell>
              <TableCell align="right">${row.amount}</TableCell>
              <TableCell align="right">{row.typeClient}</TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
