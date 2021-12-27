import { useState } from 'react';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers({ date, setDate }) {

  const handleDateChange = (date) => {
    console.log({date})
    setDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      {/* <DatePicker value={selectedDateConnection} onChange={setSelectedDateConnection} /> */}
      <KeyboardDatePicker
        margin="normal"
        label="Fecha"
        format="DD/MM/yyyy"
        value={date}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
        fullWidth
        variant='dialog'
      />
    </MuiPickersUtilsProvider>
  );
}