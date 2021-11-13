import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '../../components/Alert';
import clientsServices from '../../services/waterAPI/clientsService';
import { typeClient } from '../../services/waterAPI/contansts'
import AutoComplete from '../../components/AutoComplete';
import toast from 'react-hot-toast';
import moment from 'moment';
import {
  FormControl,
  Button,
  TextField,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Select,
  MenuItem,
  Typography,
  Divider,
} from '@material-ui/core';

const initialState = {
  name: '',
  lastName: '',
  disabled: 0,
  idTypeClient: typeClient.HIDRANTE,
  idWaterConnection: null,
}

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    width: '-webkit-fill-available'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 18,
    padding: 15
  },
  text: {
    fontSize: 16
  },
  pos: {
    marginBottom: 12,
  },
  divider: {
    margin: '10px 0'
  },
  itemList: {
    display: 'grid',
    gridTemplateColumns: '180px 1fr'
  },
  itemListLabel: {
    fontWeight: 600
  },
  cardAction: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
});

const ChangeWaterConnection = ({ dataWaterConnection, idTimeConnection, listPaymentsToPay }) => {
  // console.log({ idClient })
  console.log({ listPaymentsToPay })
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');
  // const [newWaterConnection, setNeWaterConnection] = useState();
  // const [clientDataEdited, setClientDataEdited] = useState(personalInformation);

  const classes = useStyles();

  const handleDialog = () => setIsOpen(isOpen => {
    if (isOpen) {
      setError('')
    };
    return !isOpen;
  });

  const handleSubmit = (idTimeConnection, listPayments) => {
    //order array by date
    const newListPayments = listPayments.sort((a, b) => {
      return a.order - b.order;
    });
    console.log({listPayments});
    console.log({idTimeConnection});
    const report = {
      idTimeConnection,
      idTypeReport: 1,
      dateReport: moment().format('YYYY-MM-DD hh:mm:ss'),
      transactionsArray: newListPayments 
    }
    console.log({report});
    clientsServices.setReport(report)
      .then(res => {
        console.log({ res });
        handleDialog();
      })
      .catch(err => {
        console.log({ err });
        setError(err.error);
      })
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: '8px' }}>
        {/* <Button
          variant='contained'
          color='primary'
          onClick={handleDialog}
          startIcon={<AddIcon />}
        >
          Agregar hidrante
        </Button> */}
        <Button
          size="small"
          variant='outlined'
          color='primary'
          onClick={handleDialog}
        >
          Cobro de agua
        </Button>
      </div>
      <Dialog maxWidth='sm' fullWidth open={isOpen} onClose={handleDialog} aria-labelledby="form-dialog-title">
        <div style={{ padding: '25px' }}>
          <Typography style={{ padding: '20px' }} variant='h5' align='center'>
            Cobro de agua
          </Typography>
          <DialogContent>
            <DialogContentText style={{color: 'black', fontSize: 20}}>
              Numero de pagos: {listPaymentsToPay.length}
            </DialogContentText>
            <DialogContentText style={{color: 'black', fontSize: 20}}>
              Total a pagar: ${listPaymentsToPay.reduce((total, current) => total + current.price, 0)}
            </DialogContentText>
            <Alert message='' isError error={error} isOpen={error} typeAlert='error' />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialog} color="secondary" variant='contained'>
              Cancel
            </Button>
            <Button
              onClick={() => handleSubmit(idTimeConnection, listPaymentsToPay)}
              color="primary"
              variant='contained'
              disabled={listPaymentsToPay.length === 0}
            >
              Aceptar
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

export default ChangeWaterConnection;