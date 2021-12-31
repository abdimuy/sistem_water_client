import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Checkbox } from '@material-ui/core';
import moment from 'moment';

function createData(name, calories, efectivo) {
  return { name, calories, efectivo };
}


export default function BasicTable({ latePayments, setListPaymentsToPay, listPaymentsToPay }) {

  // const [selected, setSelected] = React.useState([]);

  // useEffect(() => {
  //   createRows();
  // }, []);

  // useEffect(() => {
  //   setListPaymentsToPay(selected);
  // }, [selected]);
  // useEffect(() => { 

  // }, [latePayments]);

  // const createRows = () => {
  //   const rows = [
  //     createData(new Date().toLocaleString(), 500, 10),
  //     createData(new Date().toLocaleString(), 237, 10),
  //     createData(new Date().toLocaleString(), 262, 10),
  //     createData(new Date().toLocaleString(), 305, 10),
  //     createData(new Date().toLocaleString(), 356, 10),
  //   ];
  //   setRows(rows);
  // };

  const selectTypePayment = {
    'Late Payment': 'Pago atrasado'
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = latePayments.map((n) => n.name);
      setListPaymentsToPay(newSelecteds);
      return;
    }
    setListPaymentsToPay([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = listPaymentsToPay.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(listPaymentsToPay, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(listPaymentsToPay.slice(1));
    } else if (selectedIndex === listPaymentsToPay.length - 1) {
      newSelected = newSelected.concat(listPaymentsToPay.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        listPaymentsToPay.slice(0, selectedIndex),
        listPaymentsToPay.slice(selectedIndex + 1),
      );
    }

    setListPaymentsToPay(newSelected);
  };

  const isSelected = (name) => listPaymentsToPay.indexOf(name) !== -1;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              {/* <Checkbox
                color="primary"
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={onSelectAllClick}
                inputProps={{
                  'aria-label': 'select all desserts',
                }}
              /> */}
            </TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell align="right">Cantidad</TableCell>
            <TableCell align='right'>Detalles</TableCell>
            <TableCell align="right">Tipo de pago</TableCell>
            <TableCell align="right">Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {latePayments.map((row, index) => {
            const isItemSelected = isSelected(row);
            const labelId = `enhanced-table-checkbox-${index}`;
            return <TableRow
              onClick={(event) => handleClick(event, row)}
              role="checkbox"
              selected={isItemSelected}
              key={row.date + row.price}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={isItemSelected}
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </TableCell>
              <TableCell component="th" scope="row">
                {moment(row.date).format('DD/MM/YYYY')}
              </TableCell>
              <TableCell align="right">${row.price}</TableCell>
              <TableCell align="right">{row.note}</TableCell>
              <TableCell align='right'>{row.name}</TableCell>
              <TableCell align="right">{row.typePayment}</TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}