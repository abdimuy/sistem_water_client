import { useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import Alert from '../../components/Alert';
import clientsServices from '../../services/waterAPI/clientsService';
import { typeClient } from '../../services/waterAPI/contansts'
import AutoComplete from '../../components/AutoComplete';
import toast from 'react-hot-toast';
import Picker from './AddHidrantePicker';
import moment from 'moment'
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

const initialState = {
  name: '',
  lastName: '',
  disabled: 0,
  idTypeClient: typeClient.HIDRANTE,
  idWaterConnection: null,
  dateInitPayment: moment().format('YYYY-MM-DDTHH:mm:ss'),
  dateStartPayment: moment().format('YYYY-MM-DDTHH:mm:ss'),
  active: 1
}

const AddHidranteForm = ({clients}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(initialState)
  const [waterConnections, setWaterConnections] = useState([]);
  const [selectedWaterConnection, setSelectedWaterConnection] = useState();
  const [error, setError] = useState('');

  const handleSubmit = async (formDataSubmit) => {
    console.log(formDataSubmit);
    try {
      await clientsServices.setHidrante(formDataSubmit);
      console.log('Se ha subido con exito');
      toast.success('Hidrante creado con exito', { duration: 5000 });
      setFormData(initialState)
      setSelectedWaterConnection();
      setIsOpen(false);
    } catch (err) {
      setError('Asegurece de ingresar todos los datos obligatorios al formulario')
      console.log(err);
    };
  };

  const handleDialog = () => setIsOpen(isOpen => {
    if (isOpen) {
      setFormData(initialState);
      setError('')
      setSelectedWaterConnection();
    };
    return !isOpen;
  });

  const handleGetWaterConnections = () => {
    clientsServices.getWaterConnections()
      .then(res => {
        console.log(res.body);
        setWaterConnections(res.body);
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (selectedWaterConnection) {
      setFormData(formData => ({
        ...formData,
        idWaterConnection: selectedWaterConnection.id
      }));
    };
  }, [selectedWaterConnection]);

  useEffect(() => {
    handleGetWaterConnections();
  }, []);

  const handleInputChange = (event) => {
    const { value, name } = event.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '8px', width: 'max-content' }}>
        <Button
          variant='contained'
          color='primary'
          onClick={handleDialog}
          startIcon={<AddIcon />}
        >
          Agregar hidrante
        </Button>
      </div>
      <Dialog maxWidth='sm' fullWidth open={isOpen} onClose={handleDialog} aria-labelledby="form-dialog-title">
        <div style={{ padding: '25px' }}>
          <Typography style={{ padding: '20px' }} variant='h5' align='center'>
            Agregar hidrante
          </Typography>
          <DialogContent>
            <DialogContentText>
              Información del hidrante
            </DialogContentText>
            <TextField
              // error
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
              onChange={handleInputChange}
              required
              value={formData.lastName}
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
            <Divider style={{ margin: '25px 0' }} variant="fullWidth" />
            <DialogContentText>
              Elija una toma de agua
            </DialogContentText>
            <AutoComplete
              // listWaterConnectionsWithourClient={waterConnections}
              listWaterConnectionsWithourClient={clients}
              setAutocompleteValue={setSelectedWaterConnection}
              autoCompleteValue={selectedWaterConnection}
            />
            <Picker onInputChange={handleInputChange} />
            <Alert message='' isError error={error} isOpen={error} typeAlert='error' />
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

export default AddHidranteForm;