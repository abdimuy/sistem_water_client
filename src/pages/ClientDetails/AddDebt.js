import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '../../components/Alert';
import clientsServices from '../../services/waterAPI/clientsService';
import { typeClient } from '../../services/waterAPI/contansts'
import toast from 'react-hot-toast';
import moment from 'moment';
import PickerAddDebt from './PickerAddDebt'
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


const ChangeWaterConnection = ({ dataWaterConnection, idTimeConnection, listPaymentsToPay, handleRefresh }) => {
  const initialState = {
    idTimeConnection: idTimeConnection,
    idTypeDebts: 3,
    price: 0,
    note: '',
    dateToPay: moment()
  }
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(moment());
  const [formData, setFormData] = useState(initialState)
  const [error, setError] = useState('');
  // console.log({formData})
  
  const classes = useStyles();
  
  const handleDialog = () => setIsOpen(isOpen => {
    if (isOpen) {
      setError('')
    };
    return !isOpen;
  });

  const handleSubmit = (bodyJSON, idTimeConnection) => {
    console.log({ bodyJSON, idTimeConnection })
    clientsServices.setDebt(bodyJSON, idTimeConnection)
      .then(res => {
        if (res.status === 200) {
          handleRefresh();
          handleDialog();
          toast.success('Se ha agregado la multa', { duration: 5000 });
        };
      })
    .catch(err => {
      setError(err.error);
    })
  }

  const handleInputChange = (event) => {
    const { value, name } = event.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

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
          Agregar pago
        </Button>
      </div>
      <Dialog maxWidth='sm' fullWidth open={isOpen} onClose={handleDialog} aria-labelledby="form-dialog-title">
      <div style={{padding: '25px'}}>
          <Typography style={{padding: '20px'}} variant='h5' align='center'>
            Agregar pago
          </Typography>
          <DialogContent>
            <TextField
              // error
              required
              onChange={handleInputChange}
              name='price'
              value={formData.price}
              autoFocus
              variant='outlined'
              margin="dense"
              label="Cantidad"
              type="number"
              fullWidth
            />
            <TextField
              onChange={handleInputChange}
              required
              value={formData.note}
              name='note'
              variant='outlined'
              margin="dense"
              label="Nota"
              type="note"
              fullWidth
            />
            <FormControl fullWidth size='small' variant="outlined" margin='dense'>
              <PickerAddDebt setDate={setDate} date={date}/>
            </FormControl>
            <Alert message='' isError error={error} isOpen={error} typeAlert='error'/>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialog} color="secondary" variant='contained'>
              Cancel
            </Button>
            <Button
              onClick={() => handleSubmit({...formData, dateToPay: moment(date).format('YYYY-MM-DD HH:mm:ss')}, idTimeConnection)}
              color="primary"
              variant='contained'
            >
              Agregar
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

export default ChangeWaterConnection;