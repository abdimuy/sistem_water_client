import { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import RowTransaction from './RowTransaction';

function createData(number, nombre, date, pago, typeClient) {
  return { number, nombre, date, pago, typeClient };
}


export default function ReportTable({ transactions, total }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 750 }} size='small' aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Numero cliente</TableCell>
            <TableCell align="right" >Nombre</TableCell>
            <TableCell align="right">Fecha</TableCell>
            <TableCell align="right">Pago</TableCell>
            <TableCell align="right">Tipo de pago</TableCell>
            <TableCell align="right">Tipo de cliente</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((row) => {
            return <RowTransaction
              key={row.numberWaterConnection + row.clientName + row.dateCreate + row.amount + row.typeClient + row.id}
              row={row}
            />
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
