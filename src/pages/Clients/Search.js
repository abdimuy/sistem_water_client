import React from 'react';
import { TextField } from '@material-ui/core';

const Search = ({search, setSearch}) => {
  const handleInputChange = (e) => {
    setSearch(e.target.value);
  }
  return (
    //input de busqueda
    // <input
    //   type='text'
    //   placeholder='Buscar por nombre, domicilio, colonia o referencia'
    //   value={search}
    //   onChange={handleInputChange}
    // />
    <TextField 
      label='Buscar por nombre, domicilio, colonia o referencia'
      value={search}
      onChange={handleInputChange}
      variant='outlined'
      // fullWidth
      size='small'
      style={{ width: '-webkit-fill-available'}}
    />
  )
}

export default Search
