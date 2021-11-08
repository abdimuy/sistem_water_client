import { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function createData(number, nombre, date, pago, typeClient) {
  return { number, nombre, date, pago, typeClient};
}


export default function ReportTable() {

  const [rows, setRows] = useState([]);
  console.log({rows})

  useEffect(() => {
    createRows();
  }, []);
  
  const createRows = () => {
    const rows = [
      createData(2, 'Alberto Hernandez', new Date().toLocaleString(), 500, 'Dueño de toma'),
      createData(3, 'Jose Sanchez', new Date().toLocaleString(), 237, 'Dueño de toma'),
      createData(4, 'Juan Perez', new Date().toLocaleString(), 262, 'Dueño de toma'),
      createData(5, 'Ernesto Pacheco', new Date().toLocaleString(), 305, 'Dueño de toma'),
      createData(6, 'Esteban Alvez', new Date().toLocaleString(), 356, 'Dueño de toma'),
    ];
    setRows(rows)
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
          {rows.map((row) => (
            <TableRow
              key={row.nombre}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.number}
              </TableCell>
              <TableCell align="right">{row.nombre}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">${row.pago}</TableCell>
              <TableCell align="right">{row.typeClient}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
