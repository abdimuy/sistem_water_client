import { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import { Typography } from '@material-ui/core';
import { FormGroup } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const FilterTemporary = ({ colonias, handleSelectColonias, selectedColonias }) => {
  const [open, setOpen] = useState(false);
  // console.log({colonias});

  const handleDrawerOpenOrClose = () => {
    setOpen(open => !open);
  };

  useEffect(() => {
    const coloniasChecket = {};
    colonias.forEach(colonia => {
      coloniasChecket[colonia.name] = true;
    })
    handleSelectColonias(coloniasChecket);
  }, [colonias])

  const handleChange = (event) => {
    handleSelectColonias({
      ...selectedColonias,
      [event.target.name]: event.target.checked,
    });
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      // onClick={handleDrawerOpenOrClose}
      // onKeyDown={handleDrawerOpenOrClose}
    >
      <List>
        <ListItem>
          <Typography
            variant="h6"
            align='center'
            style={{width: '-webkit-fill-available', fontWeight: '500'}}
          >
            Filtrar por colonia
          </Typography>
        </ListItem>
        <FormGroup>
        {colonias.map((colonia, index) => (
          <ListItem button key={colonia?.id}>
            {/* <ListItemText primary={colonia?.name} /> */}
            <FormControlLabel
              control={
                <Checkbox checked={selectedColonias[colonia?.name]} onChange={handleChange} name={colonia?.name} />
              }
              label={colonia?.name}
            />
          </ListItem>
        ))}
        </FormGroup>
      </List>
      <Divider />
    </Box>
  );

  return (
    <>
      <Button
        onClick={handleDrawerOpenOrClose}
        variant="outlined"
        color="primary"
      >
        Filtros
      </Button>
      <Drawer
        open={open}
        anchor={'right'}
        onClose={handleDrawerOpenOrClose}
      >
        {list()}
      </Drawer>
    </>
  )
}

export default FilterTemporary
