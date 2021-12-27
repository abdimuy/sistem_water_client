import { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import PrintIcon from '@material-ui/icons/Print';
import moment from 'moment';

function createData(name, calories, efectivo) {
  return { name, calories, efectivo };
}


export default function BasicTable({ transactions }) {

  const [rows, setRows] = useState([])

  useEffect(() => {
    createRows()
  }, []);

  const handlePrint = (idReport) => {
    console.log({ idReport })
    let win = window.open('http://localhost:3000/report_pdf/' + idReport, '_blank');
    if (win) {
      //Browser has allowed it to be opened
      win.focus();
    } else {
      //Browser has blocked it
      alert('Please allow popups for this website');
    }
  }

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
      <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell align="right">Cantidad</TableCell>
            <TableCell align="right">Metodo de pago</TableCell>
            <TableCell align="right"></TableCell>
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
              <TableCell align="right">
                <Button
                  variant="text"
                  color="action"
                  size='small'
                  onClick={() => handlePrint(row.idReport)}
                >
                  <PrintIcon
                    fontSize="small"
                  />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}