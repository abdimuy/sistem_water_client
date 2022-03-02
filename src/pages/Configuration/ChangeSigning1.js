import { useState, useRef, useEffect } from 'react';
import Alert from '../../components/Alert';
import clientsServices from '../../services/waterAPI/clientsService';
import toast from 'react-hot-toast';
import entrypoints from '../../services/waterAPI/entrypoints';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
  Divider
} from '@material-ui/core';

const ChangeWaterConnection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  console.log({ name, image })

  const inputImage = useRef(null);

  const handleSubmitName = (id, name) => {
    clientsServices.updateSigningName(name, id)
      .then(() => {
        toast.success('Nombre de firma actualizado', { duration: 5000 });
      })
      .catch(() => {
        toast.error('Error al actualizar el nombre de firma', { duration: 5000 });
      })
  };

  const handleSubmitImage = (image) => {
    let formData = new FormData();
    formData.append('image', image);
    clientsServices.updateSigningImage1(formData)
      .then(() => {
        toast.success('Imagen de la firma actualizada', { duration: 5000 });
      })
      .catch(() => {
        toast.error('Error al actualizar la imagen de la firma', { duration: 5000 });
      })
  }

  const handleDialog = () => setIsOpen(isOpen => {
    if (isOpen) {
      setError('')
    };
    return !isOpen;
  });

  const handleGetName = () => {
    clientsServices.getSigning(1)
      .then(name => {
        setName(name?.body?.name);
      })
      .catch(err => {
        console.log({ err });
        setError(err.message);
      })
  };

  useEffect(() => {
    handleGetName();
  }, [])

return (
  <div>
    <div style={{ display: 'flex', gap: '8px' }}>
      <Button
        variant='contained'
        color='primary'
        onClick={handleDialog}
      >
        Editar la primera firma
      </Button>
    </div>
    <Dialog maxWidth='sm' fullWidth open={isOpen} onClose={handleDialog} aria-labelledby="form-dialog-title">
      <div style={{ padding: '25px' }}>
        <Typography style={{ padding: '20px' }} variant='h5' align='center'>
          Editar la primera firma
        </Typography>
        <DialogContent
          style={{ display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center', alignItems: 'center' }}
        >
          {/* <form
              
            > */}
          <TextField
            // error
            required
            name='name'
            autoFocus
            onChange={(e) => setName(e.target.value)}
            variant='outlined'
            margin="dense"
            label="Nombre"
            type="text"
            fullWidth
            value={name}
          />
          <Button
            color="primary"
            variant='contained'
            onClick={() => handleSubmitName(1, { name })}
          >
            Actualizar nombre
          </Button>
          <Divider variant='inset' style={{ margin: 10 }} />
          <input
            type='file'
            style={{ display: 'none' }}
            ref={inputImage}
            name='image'
            onChange={(e) => setImage(e.target.files[0])}
          >
          </input>
          <DialogTitle>Firma actual</DialogTitle>
          <img
            src={`${entrypoints.BASE_URL}${entrypoints.FIRST_SIGNING}`}
            style={{ width: 300 }}
          />
          <Button
            variant='contained'
            color='primary'
            onClick={() => inputImage.current.click()}
            fullWidth
          >
            Seleccionar imagen
          </Button>
          <Button
            color="primary"
            variant='contained'
            onClick={() => handleSubmitImage(image)}
          >
            Actualizar firma
          </Button>
          {/* </form> */}
          <Alert message='' isError error={error} isOpen={error} typeAlert='error' />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialog} color="secondary" variant='contained'>
            Cancel
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  </div>
);
};

export default ChangeWaterConnection;