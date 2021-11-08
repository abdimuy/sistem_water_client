import { useState } from 'react';
import Alert from '../../components/Alert';
import clientsServices from '../../services/waterAPI/clientsService';
import toast from 'react-hot-toast';
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
} from '@material-ui/core';

const EditClient = ({ personalInformation }) => {
  console.log({ personalInformation })

  const {
    id: ID_CLIENT,
    name,
    lastName,
    idClientLevel,
    idTypeClient,
    disabled
  } = personalInformation;

  const initialState = {
    name,
    lastName,
    idClientLevel,
    idTypeClient,
    disabled
  }

  const [isOpen, setIsOpen] = useState(false);
  // const [formData, setFormData] = useState(initialState)
  const [selectedWaterConnection, setSelectedWaterConnection] = useState();
  const [error, setError] = useState('');
  const [clientDataEdited, setClientDataEdited] = useState(initialState);
  console.log({ clientDataEdited })


  const handleSubmit = async (formDataSubmit, idClient) => {
    console.log(formDataSubmit);
    try {
      // await clientsServices.setHidrante(formDataSubmit);
      await clientsServices.uptdateClient(formDataSubmit, idClient)
      console.log('Se ha subido con exito');
      toast.success('Cliente editado con exito', { duration: 5000 });
      // setFormData(initialState)
      setSelectedWaterConnection();
      setIsOpen(false);
    } catch (err) {
      setError('Asegurece de ingresar todos los datos obligatorios al formulario')
      console.log(err);
    };
  };

  const handleDialog = () => setIsOpen(isOpen => {
    if (isOpen) {
      // setFormData(initialState);
      setError('')
      setSelectedWaterConnection();
    };
    return !isOpen;
  });

  // useEffect(() => {
  //   if(selectedWaterConnection) {
  //     setFormData(formData => ({
  //       ...formData,
  //       idWaterConnection: selectedWaterConnection.id
  //     }));
  //   };
  // }, [selectedWaterConnection]);

  const handleInputChange = (event) => {
    const { value, name } = event.target;
    console.log({ value, name })
    setClientDataEdited((formData) => ({ ...formData, [name]: value }));
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
          Editar datos personales
        </Button>
      </div>
      <Dialog maxWidth='sm' fullWidth open={isOpen} onClose={handleDialog} aria-labelledby="form-dialog-title">
        <div style={{ padding: '25px' }}>
          <Typography style={{ padding: '20px' }} variant='h5' align='center'>
            Actualizar información del cliente
          </Typography>
          <DialogContent>
            <DialogContentText>
              Datos personales
            </DialogContentText>
            <TextField
              // error
              required
              onChange={e => handleInputChange(e)}
              name='name'
              value={clientDataEdited.name}
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
              value={clientDataEdited.lastName}
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

                defaultValue={personalInformation.disabled}
              >
                <MenuItem value={0}>No</MenuItem>
                <MenuItem value={1}>Sí</MenuItem>
              </Select>
            </FormControl>
            {/* <AutoComplete
              setAutocompleteValue={setSelectedWaterConnection}
              autoCompleteValue={selectedWaterConnection}
              idWaterConnection={personalInformation.idWaterConnection}
            /> */}

            <Alert message='' isError error={error} isOpen={error} typeAlert='error' />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialog} color="secondary" variant='contained'>
              Cancel
            </Button>
            <Button onClick={() => handleSubmit(clientDataEdited, ID_CLIENT)} color="primary" variant='contained'>
              Agregar
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

export default EditClient;