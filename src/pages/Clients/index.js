import { useState, useEffect } from 'react'
import Table from './Table';
import clientsServices from '../../services/waterAPI/clientsService';
import AddClientForm from './AddClientForm';
import { Button } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import AddHidranteForm from './AddHidrante';
import Search from './Search';
import Filters from './FilterTemporary';

const Clients = () => {

  const [clients, setClients] = useState([]);
  const [filterClients, setFilterClients] = useState([]);
  const [isLoadingClients, setIsLoadingClients] = useState(true);
  const [search, setSearch] = useState('');
  const [colonias, setColonias] = useState([]);
  const [selectedColonias, setSelectedColonias] = useState({});

  const getClients = async () => {
    try {
      setIsLoadingClients(true)
      const clients = await clientsServices.getAll();
      setClients(clients.body);
      setIsLoadingClients(false);
    } catch (err) {
      console.log(err);
    };
  };

  const handleGetColonias = () => {
    clientsServices.getColonias().then(res => {
      setColonias(res.body);
    }).catch(err => {
      console.log(err);
    });
  };

  const handleSelectColonias = (colonias) => {
    setSelectedColonias(colonias);
  };

  const handleFilter = ({ clients, search, colonias }) => {
    const filterClients = clients.filter(client => {
      const { name, lastName, street, houseNumber, reference, colonia } = client;
      const fullInfo = `${name} ${lastName} ${street} ${houseNumber} ${reference} ${colonia}`;

      if (search === '') {
        return colonias[colonia];
      } else {
        return fullInfo.toLowerCase().includes(search.toLowerCase()) && colonias[colonia];
      }
    });
    return filterClients;
  };

  useEffect(() => {
    // if (Object.entries(selectedColonias).length > 0) {
      const clientsFilter = handleFilter({ clients, search, colonias: selectedColonias });
      setFilterClients(clientsFilter);
    // } 
  }, [search, clients, selectedColonias]);

  const handleRefresh = () => getClients();

  useEffect(() => {
    getClients();
    handleGetColonias();
  }, [])


  return (
    <div style={{ display: 'flex', gap: '12px', flexDirection: 'column', alignItems: 'flex-end' }}>
      <div style={{ display: 'flex', gap: '8px', width: '-webkit-fill-available' }}>
        <Search setSearch={setSearch} search={search} />
        <Filters
          colonias={colonias}
          handleSelectColonias={handleSelectColonias}
          selectedColonias={selectedColonias}
        />
        <AddHidranteForm clients={clients}/>
        <AddClientForm />
        <Button
          color='primary'
          onClick={handleRefresh}
          disabled={isLoadingClients}
        >
          <RefreshIcon />
        </Button>
      </div>
      <Table data={filterClients}></Table>
    </div>
  )
}

export default Clients
