import { useState, useEffect } from 'react'
import Table from './Table';
import clientsServices from '../../services/waterAPI/clientsService';
import AddClientForm from './AddClientForm';
import { Button } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import AddHidranteForm from './AddHidrante';

const Clients = () => {

  const [clients, setClients] = useState([]);
  const [isLoadingClients, setIsLoadingClients] = useState(true);

  const getClients = async () => {
    try {
      setIsLoadingClients(true)
      const clients = await clientsServices.getAll();
      setClients(clients.body);
      setIsLoadingClients(false);
    } catch(err) {
      console.log(err);
    };
  };

  const handleRefresh = () => getClients();

  useEffect(() => {
    getClients();
  }, [])


  return (
    <div style={{display: 'flex', gap: '12px', flexDirection: 'column', alignItems: 'flex-end'}}>
      <div style={{display: 'flex', gap: '8px'}}>
        <AddHidranteForm />
        <AddClientForm />
        <Button
          color='primary'
          onClick={handleRefresh}
          disabled={isLoadingClients}
        >
          <RefreshIcon/>
        </Button>
      </div>
      <Table data={clients}></Table>
    </div>
  )
}

export default Clients
