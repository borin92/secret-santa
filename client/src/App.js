import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    width: "50%",
    margin: "0 auto"
  }
}));
function App() {
  const classes = useStyles();

  return (
    <React>
      <div className={classes.root}>
      </div>
    </React>
  );
}

export default App;
