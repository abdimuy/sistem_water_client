import { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import clientsServices from '../../services/waterAPI/clientsService';

export default function ComboBox({ setAutocompleteValue, idWaterConnection, listWaterConnectionsWithourClient }) {

  const [autoCompleteValue, setAutoCompleteValue] = useState()
  console.log({listWaterConnectionsWithourClient})
  // const [listWaterConnections, setWaterConnections] = useState(listWaterConnectionsWithourClient || []);

  // const getListWaterConnections = async (setFunction) => {
  //   const waterConnections = await clientsServices.getWaterConnections();
  //   setFunction(waterConnections.body);
  // };

  const getWaterConnectionClient = async (setFunction) => {
    const waterConnection = await clientsServices.getWaterConnection(idWaterConnection);
    console.log(waterConnection)
    setFunction(waterConnection.body)
  }

  useEffect(() => {
    getWaterConnectionClient(setAutoCompleteValue)
    // getListWaterConnections(setWaterConnections);
  }, [])

  return (
    <Autocomplete
      value={autoCompleteValue}
      onChange={(event, newValue) => {
        setAutocompleteValue(newValue);
      }}
      size='small'
      id="combo-box-demo"
      options={listWaterConnectionsWithourClient}
      getOptionLabel={(option) => `${option.id} - ${option.street} ${option.houseNumber} ${option.colonia} - ${option.reference}`}
      // style={{ width: 300 }}
      fullWidth
      renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
    />
  );
};