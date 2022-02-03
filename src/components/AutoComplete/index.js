import { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import clientsServices from '../../services/waterAPI/clientsService';

export default function ComboBox({ setAutocompleteValue, autoCompleteValue, idWaterConnection, listWaterConnectionsWithourClient }) {
  console.log(autoCompleteValue)

  // const [autoCompleteValue, setAutoCompleteValue] = useState()
  // console.log({listWaterConnectionsWithourClient})
  // const [listWaterConnections, setWaterConnections] = useState(listWaterConnectionsWithourClient || []);

  // const getListWaterConnections = async (setFunction) => {
  //   const waterConnections = await clientsServices.getWaterConnections();
  //   setFunction(waterConnections.body);
  // };

  // const getWaterConnectionClient = async (setFunction) => {
  //   const waterConnection = await clientsServices.getWaterConnection(idWaterConnection);
  //   console.log(waterConnection)
  //   setFunction(waterConnection.body)
  // }

  // useEffect(() => {
  //   getWaterConnectionClient(setAutoCompleteValue)
  //   // getListWaterConnections(setWaterConnections);
  // }, [])
  const handleExistValue = (value) => {
    if (value !== undefined) {
      return value
    } else {
      return ''
    }
  }

  return (
    <Autocomplete
      value={autoCompleteValue}
      onChange={(event, newValue) => {
        setAutocompleteValue(newValue);
      }}
      size='small'
      id="combo-box-demo"
      options={listWaterConnectionsWithourClient}
      getOptionLabel={(option) => `${handleExistValue(option.numberWaterConnection)} - ${handleExistValue(option.name)} ${handleExistValue(option.lastName)} - ${handleExistValue(option.street)} ${handleExistValue(option.houseNumber)} ${handleExistValue(option.colonia)} - ${handleExistValue(option.reference)}`}
      // style={{ width: 300 }}
      fullWidth
      renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
    />
  );
};