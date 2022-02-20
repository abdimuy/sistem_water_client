import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '../../components/Alert';
import clientsServices from '../../services/waterAPI/clientsService';
import { typeClient } from '../../services/waterAPI/contansts'
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/AuthContext';
import moment from 'moment';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
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

const ChangeWaterConnection = ({ idHidrante }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');

  const classes = useStyles();

  const handleDialog = () => setIsOpen(isOpen => {
    if (isOpen) {
      setError('')
    };
    return !isOpen;
  });

  const handleSubmit = (idHidrante) => {    
    clientsServices.unsubscribeHidrante(idHidrante)
      .then(response => {
        console.log(response);
        handleDialog();
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button
          size="small"
          variant='outlined'
          color='primary'
          onClick={handleDialog}
        >
          Dar de baja
        </Button>
      </div>
      <Dialog maxWidth='sm' fullWidth open={isOpen} onClose={handleDialog} aria-labelledby="form-dialog-title">
        <div style={{ padding: '25px' }}>
          <Typography style={{ padding: '20px' }} variant='h5' align='center'>
            Dar de baja hidrante
          </Typography>
          <DialogContent>
            <DialogContentText style={{ color: 'black', fontSize: 20 }}>
              ¿Estás seguro de que deseas dar de baja este hidrante?
            </DialogContentText>
            
            <Alert message='' isError error={error} isOpen={error} typeAlert='error' />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialog} color="secondary" variant='contained'>
              Cancel
            </Button>
            <Button
              onClick={() => handleSubmit(idHidrante)}
              color="primary"
              variant='contained'
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