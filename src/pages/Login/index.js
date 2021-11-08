import React, { useState, useRef } from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import Alert from '../../components/Alert';
import clientsServices from '../../services/waterAPI/clientsService';
import { useAuth } from '../../hooks/AuthContext';
import { Link, useHistory } from 'react-router-dom';

const MyCard = ({ error, setError, userData, setUserData }) => {

  const { handleIsAuthenticated } = useAuth();
  const history = useHistory();

  const formRef = useRef();
  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
    // formRef.current.submit()

    clientsServices.login(userData)
      .then(async (res) => {
        if (res.status === 200) {
          // setUserData(res.data);
          console.log(res);
          document.cookie = `token=${res.data.token}`;
          // setUserData(userInitialState);
          await handleIsAuthenticated();
          setError(null);
        } else {
          setError(res.error || 'Error al iniciar sesión');
        }
      })
      .then(() => {
        console.log('Sesión iniciada correctamente')
        history.push('/home');
      })
      .catch((err) => {
        console.log(err);
        setError('Error al iniciar sesión');
      })
  };

  return <React.Fragment>
    {/* <div style={{display: 'flex', flexDirection:'column', width: 300}}> */}
    <CardContent>

      <Typography variant="h4" component="div">
        Iniciar sesión
      </Typography>
      <br />
      <br />
      <form ref={formRef} action='http://localhost:3000/login' method='POST'>
        <TextField
          required
          onChange={handleInputChange}
          name='user'
          value={userData.user}
          autoFocus
          variant='outlined'
          margin="dense"
          label="Usuario"
          type="name"
          fullWidth
        />
        <br />
        <TextField
          required
          onChange={handleInputChange}
          name='password'
          value={userData.password}
          autoComplete='new-password'
          variant='outlined'
          margin="dense"
          label="Contraseña"
          type="password"
          fullWidth
        />

      </form>
      <br />
      <Alert message='' isError error={error} isOpen={error} typeAlert='error' />
      <br />
    </CardContent>
    <CardActions style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <Button
        variant='contained'
        color='primary'
        size="medium"
        style={{ width: '100%' }}
        onClick={handleSubmit}
      >
        Ingresar
      </Button>
      <Link to='/register'>Registrarse</Link>
    </CardActions>
    {/* </div> */}
  </React.Fragment>
}

export default function Login() {
  const [userData, setUserData] = useState(userInitialState);
  const [error, setError] = useState(false);
  return (
    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* <Box sx={{ display: 'flex', minWidth: 275, maxWidth: 600 }}> */}
      <Card
        variant="outlined"
        style={{ maxWidth: 900, width: 400, padding: 15 }}

      >
        <MyCard
          error={error}
          setError={setError}
          userData={userData}
          setUserData={setUserData}
        />
      </Card>
    </Box>
  );
};

const userInitialState = {
  user: '',
  password: ''
}
