import { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';

function createData(name, calories, efectivo) {
  return { name, calories, efectivo};
}


export default function BasicTable({transactions}) {

  const [rows, setRows] = useState([])
  console.log({rows})

  useEffect(() => {
    createRows()
  }, []);
  
  const createRows = () => {
    const rows = [
      createData(new Date().toLocaleString(), 500, 'Efectivo'),
      createData(new Date().toLocaleString(), 237, 'Efectivo'),
      createData(new Date().toLocaleString(), 262, 'Efectivo'),
      createData(new Date().toLocaleString(), 305, 'Efectivo'),
      createData(new Date().toLocaleString(), 356, 'Efectivo'),
    ];
    setRows(rows)
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell align="right">Cantidad</TableCell>
            <TableCell align="right">Metodo de pago</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((row) => (
            <TableRow
              key={row.date}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {moment(row.date).format('DD/MM/YYYY')}
              </TableCell>
              <TableCell align="right">${row.amount}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}