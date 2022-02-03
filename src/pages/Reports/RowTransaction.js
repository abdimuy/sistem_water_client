import React, { useState } from 'react';
import { TableRow, TableCell } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

import moment from 'moment'

const RowTransaction = ({ row }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleDialog = () => setIsOpen(isOpen => !isOpen);
  return (
    <>
      <TableRow
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        style={{ cursor: 'pointer' }}
        onClick={handleDialog}
      >
        <TableCell component="th" scope="row">
          {row.numberWaterConnection}
        </TableCell>
        <TableCell align="right">{row.clientName}</TableCell>
        <TableCell align="right">{moment(row.dateCreate).format('DD/MM/YYYY')}</TableCell>
        <TableCell align="right">${row.amount}</TableCell>
        <TableCell align="right">{row.typeTransaction}</TableCell>
        <TableCell align="right">{row.typeClient}</TableCell>
      </TableRow>
      <Dialog maxWidth='sm' fullWidth open={isOpen} onClose={handleDialog} aria-labelledby="form-dialog-title">
        <div style={{ padding: '25px' }}>
          <Typography style={{ padding: '20px' }} variant='h5' align='center'>
            Información del pago
          </Typography>
          <DialogContent
            style={{ display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center', alignItems: 'center' }}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'flex-start', width: '100%'}}>
              <Typography style={{fontWeight: 'bold', height: '100%'}}>
                Numero de toma: 
              </Typography>
              <Typography style={{ height: '100%'}}>
                {row.numberWaterConnection}
              </Typography>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'flex-start', width: '100%'}}>
              <Typography style={{fontWeight: 'bold', height: '100%'}}>
                Nombre: 
              </Typography>
              <Typography style={{ height: '100%'}}>
                {row.clientName}
              </Typography>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'flex-start', width: '100%'}}>
              <Typography style={{fontWeight: 'bold', height: '100%'}}>
                Fecha limite de pago:
              </Typography>
              <Typography style={{ height: '100%'}}>
                {moment(row.date).format('LLLL').toUpperCase()}
              </Typography>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'flex-start', width: '100%'}}>
              <Typography style={{fontWeight: 'bold', height: '100%'}}>
                Fecha: 
              </Typography>
              <Typography style={{ height: '100%'}}>
                {moment(row.dateCreate).format('LLLL').toUpperCase()}
              </Typography>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'flex-start', width: '100%'}}>
              <Typography style={{fontWeight: 'bold', height: '100%'}}>
                Cantidad: 
              </Typography>
              <Typography style={{ height: '100%'}}>
                ${row.amount}
              </Typography>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'flex-start', width: '100%'}}>
              <Typography style={{fontWeight: 'bold', height: '100%'}}>
                Tipo de cliente:
              </Typography>
              <Typography style={{ height: '100%'}}>
                {row.typeClient}
              </Typography>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'flex-start', width: '100%'}}>
              <Typography style={{fontWeight: 'bold', height: '100%'}}>
                Nota:
              </Typography>
              <Typography style={{ height: '100%'}}>
                {row.note}
              </Typography>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'flex-start', width: '100%'}}>
              <Typography style={{fontWeight: 'bold', height: '100%'}}>
                Tipo de pago:
              </Typography>
              <Typography style={{ height: '100%'}}>
                {row.typeTransaction}
              </Typography>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialog} color="secondary" variant='contained'>
              Cerrar
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </>
  )
};

export default RowTransaction;
