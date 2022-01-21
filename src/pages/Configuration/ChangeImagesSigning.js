import React from 'react';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import ChangeSigning1 from './ChangeSigning1';
import ChangeSigning2 from './ChangeSigning2';

const changeImagesSigning = () => {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
      <Typography variant='h5'>
        Firmas del resivo
      </Typography>
      <div style={{display: 'flex', gap: 10}}>
        <ChangeSigning1 />
        <ChangeSigning2 />
      </div>
    </div>
  );
};

export default changeImagesSigning;
