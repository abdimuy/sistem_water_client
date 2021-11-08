import { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import ClientCard from './ClientCard';
import clientsServices from '../../services/waterAPI/clientsService';
import { useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';

const ClientDetails = () => {
  const { id: ID_CLIENT } = useParams();
  const [client, setClient] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const handleGetClient = (idClient, saveClient) => {
    clientsServices.getClient(idClient)
      .then((client) => {
        console.log({client});
        saveClient(client.body[0]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false)
      });
  };

  useEffect(() => {
    handleRefresh();
  }, []);

  const handleRefresh = () => {
    handleGetClient(ID_CLIENT, setClient);
  };

  return (
    <>
      {client &&
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', gap: '20px', flexDirection: 'column', alignItems: 'center', width: '-webkit-fill-available', maxWidth: 1000 }}>
            <Typography
              align='left'
              component='h1'
              variant='h5'
              color='primary'
            >
              Información del cliente
            </Typography>
            <Button
              color='primary'
              onClick={handleRefresh}
              disabled={isLoading}
            >
              <RefreshIcon />
            </Button>
            <ClientCard clientData={client} />
          </div>
        </div>
      }
    </>
  );
};

export default ClientDetails;
