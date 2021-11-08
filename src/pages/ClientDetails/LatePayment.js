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


export default function BasicTable({ latePayments, setListPaymentsToPay }) {

  const [rows, setRows] = useState([...latePayments]);
  const [selected, setSelected] = React.useState([]);
  console.log({ rows })

  useEffect(() => {
    createRows();
  }, []);

  useEffect(() => {
    setListPaymentsToPay(selected);
  }, [selected]);

  const createRows = () => {
    const rows = [
      createData(new Date().toLocaleString(), 500, 10),
      createData(new Date().toLocaleString(), 237, 10),
      createData(new Date().toLocaleString(), 262, 10),
      createData(new Date().toLocaleString(), 305, 10),
      createData(new Date().toLocaleString(), 356, 10),
    ];
    setRows(rows);
  };

  const selectTypePayment = {
    'Late Payment': 'Pago atrasado'
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

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
            <TableCell align="right">Tipo de pago</TableCell>
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
              key={row.date}
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
              <TableCell align="right">{row.typePayment}</TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}