import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import EditClient from './EditClient';
import { Divider } from '@material-ui/core';
import ChangeWaterConnection from './ChangeWaterConnection'
import History from './History';
import AddPayment from './AddPayment';
import LatePayment from './LatePayment'
import moment from 'moment'

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


export default function ClientInfo({ clientData }) {
  const {
    numberWaterConnection,
    id,
    name,
    lastName,
    clientLevel,
    idClientLevel,
    idTypeClient,
    typeClient,
    disabled,
    idWaterConnection,
    street,
    houseNumber,
    colonia,
    reference,
    dateConnection,
    latePayments,
    transactions,
  } = clientData;
  console.log({ latePayments });

  const personalInformation = {
    id,
    name,
    lastName,
    idClientLevel,
    idTypeClient,
    disabled,
    idWaterConnection
  };

  const dataWaterConnection = {
    numberWaterConnection,
    idWaterConnection,
    street,
    houseNumber,
    colonia,
    reference,
    dateConnection
  }
  const classes = useStyles();
   const [listPaymentsToPay, setListPaymentsToPay] = useState([]);

  const listDetailsClient = [
    {
      label: 'Nombre',
      text: `${name} ${lastName}`
    },
    {
      label: 'Categoria del cliente',
      text: clientLevel
    },
    {
      label: 'Tipo de cliente',
      text: typeClient
    },
    {
      label: 'Incapacidad',
      text: disabled ? 'Discapacitado' : 'Sin discapacidad',
    }
  ]

  const listWaterConnection = [
    {
      label: 'Numero de toma de agua',
      text: numberWaterConnection
    },
    {
      label: 'Dirección',
      text: `${street} ${houseNumber} ${colonia}`
    },
    {
      label: 'Referecias',
      text: reference
    },
    {
      label: 'Fecha de conexión',
      text: moment(dateConnection).format('DD/MM/YYYY')
    }
  ];

  return (
    <>
      <Card variant='elevation' className={classes.root}>
        <Typography
          align='left'
          // component='h2'
          // variant='subtitle1'
          color='primary'
          className={classes.title}
        >
          Datos personales
        </Typography>
        <Divider className={classes.divider} variant='fullWidth' />
        <CardContent>
          {listDetailsClient.map((item) => (
            <div className={classes.itemList}>
              <Typography align='left' className={classes.itemListLabel}>
                {item.label}:
              </Typography>
              <Typography align='left' className={classes.text}>
                {item.text}
              </Typography>
            </div>
          ))}
        </CardContent>
        <Divider className={classes.divider} variant='fullWidth' />
        <CardActions className={classes.cardAction}>
          <EditClient personalInformation={personalInformation} />
        </CardActions>
      </Card>
      <Card variant='elevation' className={classes.root}>
        <Typography
          align='left'
          // component='h2'
          // variant='subtitle1'
          color='primary'
          className={classes.title}
        >
          Toma de agua
        </Typography>
        <Divider className={classes.divider} variant='fullWidth' />
        <CardContent>
          {listWaterConnection.map((item) => (
            <div className={classes.itemList}>
              <Typography align='left' className={classes.itemListLabel}>
                {item.label}:
              </Typography>
              <Typography align='left' className={classes.text}>
                {item.text}
              </Typography>
            </div>
          ))}
        </CardContent>
        <Divider className={classes.divider} variant='fullWidth' />
        <CardActions className={classes.cardAction}>
          <ChangeWaterConnection dataWaterConnection={listWaterConnection} idClient={id} />
        </CardActions>
      </Card>
      <Card variant='elevation' className={classes.root}>
        <Typography
          align='left'
          // component='h2'
          // variant='subtitle1'
          color='primary'
          className={classes.title}
        >
          Historial de pagos
        </Typography>
        <Divider className={classes.divider} variant='fullWidth' />
        <CardContent>
          {transactions && <History transactions={transactions} />}
        </CardContent>
        <Divider className={classes.divider} variant='fullWidth' />
        <CardActions className={classes.cardAction}>
          {/* <AddPayment /> */}
        </CardActions>
      </Card>
      <Card variant='elevation' className={classes.root}>
        <Typography
          align='left'
          // component='h2'
          // variant='subtitle1'
          color='primary'
          className={classes.title}
        >
          Pagos pendientes
        </Typography>
        <Divider className={classes.divider} variant='fullWidth' />
        <CardContent>
          {latePayments && <LatePayment latePayments={latePayments} setListPaymentsToPay={setListPaymentsToPay} />}

        </CardContent>
        <Divider className={classes.divider} variant='fullWidth' />
        <CardActions className={classes.cardAction}>
          <AddPayment listPaymentsToPay={listPaymentsToPay}/>
        </CardActions>
      </Card>
    </>
  );
}