import { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { makeStyles } from '@material-ui/core/styles';
import ReportTable from './ReportTable';
import clientServices from '../../services/waterAPI/clientsService'
import { Chip } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import entrypoints from '../../services/waterAPI/entrypoints';

const Reports = () => {

  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState('');
  const { BASE_URL } = entrypoints;

  const handleGetTrasactions = () => {

    clientServices.getTransactions(
      moment(dateRange[0]).format('YYYY-MM-DD HH:mm:ss'),
      moment(dateRange[1]).format('YYYY-MM-DD HH:mm:ss')
    )
      .then(res => {
        // console.log(res.body)
        setTransactions(res.body)
        setTotal(res.body.reduce((acc, cur) => acc + cur.amount, 0))
      })
      .catch(err => {
        console.log(err)
        setError(err.response.data.message)
      })
  };

  useEffect(() => {
    if (dateRange !== null) {
      handleGetTrasactions()
    }
  }, [dateRange]);

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

  const handlePrint = (dateInit, dateEnd) => {
    let win = window.open(`${BASE_URL}transactions/reportTransactions?dateStart=${dateInit}&dateEnd=${dateEnd}`, '_blank');
    if (win) {
      //Browser has allowed it to be opened
      win.focus();
    } else {
      //Browser has blocked it
      alert('Please allow popups for this website');
    }
  }

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
        <Chip size='medium' color='primary' label={`Total ingresos: $${total}`} style={{ fontSize: 16, padding: '10px 15px' }} />
        <Button
          variant='contained'
          color='primary'
          onClick={() => handlePrint(moment(dateRange[0]).format('YYYY-MM-DD HH:mm:ss'), moment(dateRange[1]).format('YYYY-MM-DD HH:mm:ss'))}
        >
          Imprimir reporte
        </Button>
        <ReportTable transactions={transactions} />

      </div>
    </div>
  );
};

export default Reports;