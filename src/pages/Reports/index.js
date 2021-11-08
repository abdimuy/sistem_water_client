import { useState } from 'react';
import { Typography } from '@material-ui/core';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { makeStyles } from '@material-ui/core/styles';
import ReportTable from './ReportTable';

const Reports = () => {

  const [dateRange, setDateRange] = useState([new Date(), new Date()]);

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
      margin: '0px 0'
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
  
  const classes = useStyles();

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ display: 'flex', gap: '20px', flexDirection: 'column', alignItems: 'center', width: '-webkit-fill-available', maxWidth: 1000 }}>
        <Typography
          align='left'
          component='h1'
          variant='h5'
          color='primary'
        >
          Reportes
        </Typography>
        <DateRangePicker
          onChange={setDateRange}
          value={dateRange}
        />
        <ReportTable />
        
      </div>
    </div>
  );
};

export default Reports;