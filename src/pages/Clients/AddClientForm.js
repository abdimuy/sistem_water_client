import { useState } from 'react';
import moment from 'moment';
import AddIcon from '@material-ui/icons/Add';
import clientsServices from '../../services/waterAPI/clientsService';
import { typeClient } from '../../services/waterAPI/contansts'
import Alert from '../../components/Alert';
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
  Divider,
  Typography,
} from '@material-ui/core';
import Picker from './Pickers';

const initialState = {
  name: '',
  lastName: '',
  disabled: 0,
  street: '',
  houseNumber: '',
  colonia: '',
  reference: '',
  idTypeClient: typeClient.PRINCIPAL,
  dateConnection: moment().format('YYYY-MM-DDTHH:mm:ss'),
  dateInitPayment: moment().format('YYYY-MM-DDTHH:mm:ss')
}

const AddClientForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState('')
  
  const handleDialog = () => setIsOpen(isOpen => {
    if(isOpen) {
      setFormData(initialState);
      setError('')
    };
    return !isOpen;
  });

  const handleSubmit = async (formDataSubmit) => {
    console.log(formDataSubmit)
    try {
      await clientsServices.setClient(formDataSubmit)
      console.log('Se ha subido con exito');
      setIsOpen(false);
    } catch(err) {
      setError('Asegurece de ingresar todos los datos obligatorios al formulario')
      console.log(err);
    };
  };

  const handleInputChange = (event) => {
    const { value, name } = event.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };
 
  return (
    <div>
      <div style={{display: 'flex', gap: '8px'}}>
        <Button
          variant='contained'
          color='primary'
          onClick={handleDialog}
          startIcon={<AddIcon />}
        >
          Agregar toma de agua
        </Button>
      </div>
      <Dialog maxWidth='sm' fullWidth open={isOpen} onClose={handleDialog} aria-labelledby="form-dialog-title">
      <div style={{padding: '25px'}}>
          <Typography style={{padding: '20px'}} variant='h5' align='center'>
            Agregar toma de agua
          </Typography>
          <DialogContent>
            <DialogContentText>
              Información del propietario
            </DialogContentText>
            <TextField
              required
              onChange={handleInputChange}
              name='name'
              value={formData.name}
              autoComplete='new-password'
              autoFocus
              variant='outlined'
              margin="dense"
              label="Nombre(s)"
              type="name"
              fullWidth
            />
            <TextField
              required
              onChange={handleInputChange}
              name='lastName'
              variant='outlined'
              margin="dense"
              label="Apellidos"
              type="lastName"
              fullWidth
            />
            <FormControl fullWidth size='small' variant="outlined" margin='dense'>
              <InputLabel id="demo-simple-select-outlined-label">Tiene alguna discapacidad</InputLabel>
              <Select
                onChange={handleInputChange}
                name='disabled'
                autoWidth
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="Tiene alguna discapacidad"
                defaultValue={0}
              >
                <MenuItem value={0}>No</MenuItem>
                <MenuItem value={1}>Sí</MenuItem>
              </Select>
            </FormControl>
            <Divider style={{margin: '25px 0'}} variant="fullWidth" />
            <DialogContentText>
              Información de la toma de agua
            </DialogContentText>
            <TextField
              required
              onChange={handleInputChange}
              name='street'
              variant='outlined'
              margin="dense"
              id="steet"
              label="Calle"
              type="street"
              fullWidth
            />
            <TextField
              onChange={handleInputChange}
              name='houseNumber'
              variant='outlined'
              margin="dense"
              id="steet"
              label="Número"
              type="text"
              fullWidth
            />
            <TextField
              required
              onChange={handleInputChange}
              name='colonia'
              variant='outlined'
              margin="dense"
              id="steet"
              label="Colonia"
              type="colonia"
              fullWidth
            />
            <TextField
              onChange={handleInputChange}
              name='reference'
              variant='outlined'
              margin="dense"
              id="steet"
              label="Referencias"
              type="referece"
              fullWidth
            />
            <Picker onInputChange={handleInputChange} />
            <Alert message='' isError error={error} isOpen={error} typeAlert='error'/>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialog} color="secondary" variant='contained'>
              Cancel
            </Button>
            <Button onClick={() => handleSubmit(formData)} color="primary" variant='contained'>
              Agregar
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

export default AddClientForm;