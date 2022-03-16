import React from 'react'
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom'

const CreateUser = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/register');
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
      <Typography variant='h5'>
        Crear nuevo usuario
      </Typography>
      <Button
        variant='contained'
        color='primary'
        onClick={handleClick}
      >
        Crear usuario
      </Button>
    </div>
  )
}

export default CreateUser