import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import clientsServices from '../../services/waterAPI/clientsService';
import moment from 'moment';
import { Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  title: {
    flex: '1 1 100%',
    padding: '15px',
  },
  name: {
    cursor: 'pointer',
  }
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function DenseTable() {
  const [hidrantes, setHidrantes] = useState([]);
  const classes = useStyles();
  const { getHidrantes } = clientsServices;
  const history = useHistory();

  const getHidrantesFromAPI = async () => {
    try {
      const hidrantes = await getHidrantes();
      setHidrantes(hidrantes.body);
    } catch (error) {
      console.log(error);
    };
  };

  useEffect(() => {
    getHidrantesFromAPI();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Typography className={classes.title} variant='h6'>
        Hidrantes
      </Typography>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Numero de toma</TableCell>
            <TableCell align="right">Nombre</TableCell>
            <TableCell align="right">Domicilio</TableCell>
            <TableCell align="right">Referencias</TableCell>
            <TableCell align="right">Fecha de conexión</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hidrantes.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.numberWaterConnection}
              </TableCell>
              <TableCell
                className={classes.name}
                align="right"
                onClick={() => history.push(`/clients/${row.titular.id}`)}
              >
                {`${row.name} ${row.lastName}`}
              </TableCell>
              <TableCell align="right">
                {row.street} {row.houseNumber} {row.colonia}
              </TableCell>
              <TableCell align="right">{row.reference}</TableCell>
              <TableCell align="right">{moment(row.dateConnection).format('LL')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}