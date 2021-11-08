import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function TransitionAlerts({isOpen, typeAlert, isError, message, icon, error}) {
  const classes = useStyles();
  // const [open, setOpen] = React.useState(true);

  return (
    <div className={classes.root}>
      <Collapse in={isOpen}>
        <Alert
          severity={typeAlert}
          // action={
          //   <IconButton
          //     aria-label="close"
          //     color="inherit"
          //     size="small"
          //     onClick={() => {
          //       setOpen(false);
          //     }}
          //   >
          //     <CloseIcon fontSize="inherit" />
          //   </IconButton>
          // }
        >
          {isError ? error : message}
        </Alert>
      </Collapse>
      {/* <Button
        disabled={open}
        variant="outlined"
        onClick={() => {
          setOpen(true);
        }}
      >
        Re-open
      </Button> */}
    </div>
  );
}