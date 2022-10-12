import React from 'react';
import CardAdmin from './Card';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@mui/material';

const useStyles = makeStyles(theme => ({
     title: {
        textAlign: 'center',
        textTransform: 'capitalize'
    }
 
  }));

export default function Admin() { 
    const classes = useStyles();

  return (
    <div>
        <Typography sx={{  marginBottom: 10 }} variant="h3" className={classes.title} >Admin dashboard</Typography>
        <CardAdmin nom="benn" prenom="nabilight" gift="montre" message="aseggass ameggaz" />       
    </div>

  )
}
