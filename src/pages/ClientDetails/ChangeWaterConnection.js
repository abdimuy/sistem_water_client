import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '../../components/Alert';
import clientsServices from '../../services/waterAPI/clientsService';
import { typeClient } from '../../services/waterAPI/contansts'
import AutoComplete from '../../components/AutoComplete';
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

const ChangeWaterConnection = ({ dataWaterConnection, idClient }) => {
  console.log({ idClient })
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(initialState)
  const [selectedWaterConnection, setSelectedWaterConnection] = useState();
  const [error, setError] = useState('');
  const [listWaterConnectionsWithourClient, setWaterConnectionsWithoutClient] = useState([])
  // const [newWaterConnection, setNeWaterConnection] = useState();
  // const [clientDataEdited, setClientDataEdited] = useState(personalInformation);

  const classes = useStyles();

  const handleChangeWaterConnection = async (editedClient, idClient) => {
    clientsServices.uptdateClient(editedClient, idClient)
      .then((res) => {
        console.log('Se ha subido con exito');
        toast.success('Toma de agua cambiada con exito', {duration: 5000});
        setIsOpen(false)
      })
      .catch((err) => console.log(err))
  };

  const handleDialog = () => setIsOpen(isOpen => {
    if (isOpen) {
      setFormData(initialState);
      setError('')
      setSelectedWaterConnection();
    };
    return !isOpen;
  });

  useEffect(() => {
    handleGetWaterConnectionsWithoutClient(setWaterConnectionsWithoutClient);
  }, [])

  // useEffect(() => {
  //   if (selectedWaterConnection) {
  //     setFormData(formData => ({
  //       ...formData,
  //       idWaterConnection: selectedWaterConnection.id
  //     }));
  //   };
  // }, [selectedWaterConnection]);

  const handleGetWaterConnectionsWithoutClient = (setFunction) => {
    clientsServices.getWaterConnectionWithoutClient()
      .then((waterConnections) => {
        setFunction(waterConnections.body);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const handleInputChange = (event) => {
  //   const { value, name } = event.target;
  //   console.log({value, name})
  //   setClientDataEdited((formData) => ({ ...formData, [name]: value }));
  // };

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
          Cambiar toma de agua
        </Button>
      </div>
      <Dialog maxWidth='sm' fullWidth open={isOpen} onClose={handleDialog} aria-labelledby="form-dialog-title">
        <div style={{ padding: '25px' }}>
          <Typography style={{ padding: '20px' }} variant='h5' align='center'>
            Cambiar toma de agua
          </Typography>
          <DialogContent>
            <DialogContentText>
              Toma de agua actual
            </DialogContentText>
            {dataWaterConnection.map((item) => (
              <div className={classes.itemList}>
                <Typography align='left' className={classes.itemListLabel}>
                  {item.label}:
                </Typography>
                <Typography align='left' className={classes.text}>
                  {item.text}
                </Typography>
              </div>
            ))}
            <Divider className={classes.divider} />
            <DialogContentText>
              Nueva toma de agua
            </DialogContentText>
            <AutoComplete
              setAutocompleteValue={setSelectedWaterConnection}
              autoCompleteValue={selectedWaterConnection}
              listWaterConnectionsWithourClient={listWaterConnectionsWithourClient}
            // idWaterConnection={personalInformation.idWaterConnection}
            />
            <Alert message='' isError error={error} isOpen={error} typeAlert='error' />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialog} color="secondary" variant='contained'>
              Cancel
            </Button>
            <Button
              onClick={() => handleChangeWaterConnection({ idWaterConnection: selectedWaterConnection.id }, idClient)}
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