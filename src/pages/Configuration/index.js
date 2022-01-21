import React from 'react'
import Typography from '@material-ui/core/Typography';
import ChangeImagesSigning from './ChangeImagesSigning';
import Card from '@material-ui/core/Card';

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
    </div>
  )
}

export default Configuration
