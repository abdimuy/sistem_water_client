import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import Alert from '../../components/Alert';
import clientsServices from '../../services/waterAPI/clientsService';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const MyCard = ({ error, setError, userData, setUserData }) => {
  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  //comprobar que un campo no este vacio
  const checkField = (field) => {
    if (field === '') {
      // setError('Todos los campos son obligatorios');
      return false;
    };
    return true;
  };

  const checkFields = (userData) => {
    for (let key in userData) {
      if (!checkField(userData[key])) {
        return false;
      }
    }
    return true;
  }

  //comprobar que password y confirmPassword son iguales y que los campos no esten vacios
  const handleSubmit = (e) => {
    // e.preventDefault();
    console.log(userData);
    if (userData.password !== userData.repetPassword) {
      setError('Las contraseñas no coinciden');
      return null
    } else {
      setError(false);
    };

    let userDataToSend = {};
    for (let key in userData) {
      if (checkField(userData[key])) {
        userDataToSend[key] = userData[key].trim();
      }
    }
    delete userDataToSend.repetPassword;
    console.log(userDataToSend);

    if (!checkFields(userDataToSend)) {
      setError('Todos los campos son obligatorios');
      return null
    };


    clientsServices.setUser(userDataToSend)
      .then(res => {
        console.log(res);
        toast.success('Usuario creado con exito', {duration: 5000});
        setUserData(userDataInitialState);
      })
      .catch(err => {
        console.log(err);
      });

  };


  return <React.Fragment>
    {/* <div style={{display: 'flex', flexDirection:'column', width: 300}}> */}
    <CardContent>

      <Typography variant="h4" component="div">
        Registrarse
      </Typography>
      <br />
      <br />
      <TextField
        required
        onChange={handleInputChange}
        name='name'
        value={userData.name}
        autoFocus
        variant='outlined'
        margin="dense"
        label="Nombre"
        type="name"
        fullWidth
      />
      <br />
      <TextField
        required
        onChange={handleInputChange}
        name='lastName'
        value={userData.lastName}
        variant='outlined'
        margin="dense"
        label="Apellidos"
        type="lastName"
        fullWidth
      />
      <br />
      <TextField
        required
        onChange={handleInputChange}
        name='nameUser'
        value={userData.nameUser}
        variant='outlined'
        margin="dense"
        label="Nombre de usuario"
        type="user"
        fullWidth
      />
      <br />
      <TextField
        required
        onChange={handleInputChange}
        name='password'
        value={userData.password}
        variant='outlined'
        margin="dense"
        label="Contraseña"
        type="password"
        fullWidth
      />
      <br />
      <TextField
        // required
        onChange={handleInputChange}
        name='repetPassword'
        value={userData.repetPassword}
        variant='outlined'
        margin="dense"
        label="Escribir de nuevo la contraseña"
        type="password"
        fullWidth
      />
      <br />
      <br />
      <Alert message='' isError error={error} isOpen={error} typeAlert='error' />
    </CardContent>
    <CardActions style={{display: 'flex', flexDirection: 'column', gap: 10}}>
      <Button
        variant='contained'
        color='primary'
        size="medium"
        style={{ width: '100%' }}
        onClick={handleSubmit}
      >
        Registrarse
      </Button>
      <Link to='/login'>Iniciar sesión</Link>
    </CardActions>
    {/* </div> */}
  </React.Fragment>
}

export default function Register() {
  const [userData, setUserData] = useState(userDataInitialState)
  const [error, setError] = useState(false);
  return (
    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* <Box sx={{ display: 'flex', minWidth: 275, maxWidth: 600 }}> */}
      <Card
        variant="outlined"
        style={{ maxWidth: 900, width: 400, padding: 15 }}

      >
        <MyCard
          userData={userData}
          setUserData={setUserData}
          error={error}
          setError={setError}
        />
      </Card>
    </Box>
  );
};

const userDataInitialState = {
  name: '',
  lastName: '',
  nameUser: '',
  password: '',
  repetPassword: ''
}