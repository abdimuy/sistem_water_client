import React from 'react'
import Typography from '@material-ui/core/Typography';
import ChangeImagesSigning from './ChangeImagesSigning';
import Card from '@material-ui/core/Card';
import CreateUser from './CreateUser';

const Configuration = () => {
  
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 15}}>
      <Typography
        align='left'
        component='h1'
        variant='h5'
        color='primary'
      >
        Configuraciones
      </Typography>
      <Card variant='elevation' style={{maxWidth: 800, width: '-webkit-fill-available', padding: 20}}>
        <ChangeImagesSigning />
      </Card>
      <Card variant='elevation' style={{maxWidth: 800, width: '-webkit-fill-available', padding: 20}}>
        <CreateUser />
      </Card>
    </div>
  )
}

export default Configuration
