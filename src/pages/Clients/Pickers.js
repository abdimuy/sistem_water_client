import { useState } from 'react';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers({ onInputChange }) {
  // The first commit of Material-UI
  const [selectedDateConnection, setSelectedDateConnection] = useState(moment());
  const [selectedDateInitPayment, setSelectedDateInitPayment] = useState(moment());
  // console.log(selectedDateConnection.format('YYYY-MM-DDTHH:mm:ss'))
  // console.log(selectedDateInitPayment.format('YYYY-MM-DDTHH:mm:ss'))

  const handleDateConnectionChange = (date) => {
    setSelectedDateConnection(date);
    onInputChange({target: {
      name: 'dateConnection',
      value: date.format('YYYY-MM-DDTHH:mm:ss')
    }});
  };

  const handleDateInitPaymentChange = (date) => {
    setSelectedDateInitPayment(date);
    const container = {
      target: {
        name: 'dateInitPayment',
        value: date.format('YYYY-MM-DDTHH:mm:ss')
      }
    };
    onInputChange(container);
  }

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      {/* <DatePicker value={selectedDateConnection} onChange={setSelectedDateConnection} /> */}
      <KeyboardDatePicker
        margin="normal"
        label="Fecha de conexión de la toma"
        format="DD/MM/yyyy"
        value={selectedDateConnection}
        onChange={handleDateConnectionChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
        fullWidth
        variant='dialog'
      />
      <KeyboardDatePicker
        margin="normal"
        label="Fecha de inicio de cobro"
        format="DD/MM/yyyy"
        value={selectedDateInitPayment}
        onChange={handleDateInitPaymentChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
        fullWidth
        variant='dialog'
      />
    </MuiPickersUtilsProvider>
  );
}