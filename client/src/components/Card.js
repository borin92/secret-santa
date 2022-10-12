import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Typography,
    Card, 
    CardContent,
    Box,
    Grid,
    IconButton
 } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';

const useStyles = makeStyles(theme => ({
    body: {
        padding: "20px",
        
    },
    root: {
      width: "50%",
      margin: "0 auto"
    },
    title: {
        textAlign: 'center',
        textTransform: 'capitalize'
    }
 
  }));


const CardAdmin = ({nom, prenom, gift, message}) => {
    const classes = useStyles();
    console.log(nom)
  return (
    
    
    <Box sx={{ minWidth: 275, maxWidth: 1000, margin: 'auto' }}>
    <React.Fragment>
        <Grid container spacing={2} sx={{ marginTop: 5, border: 1, borderRadius: 1  }}>
            <Grid item xs={8}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                    Nom : <span> {nom}</span>
                    </Typography>
                    <Typography variant="h5" component="div">
                    Prénom : <span> {prenom}</span>
                    </Typography>
                    <Typography variant="h5" component="div">
                    Gift : <span> {gift}</span>
                    </Typography>
                    <Typography variant="h5" component="div">
                    message :
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {message}
                    </Typography>                
                </CardContent>
            </Grid>
            <Grid className={classes.root}  sx={{margin: 'auto'}} item xs={4}>
                <Grid container>
                        <Grid item xs={6}>
                            <IconButton title='Rejeter' color="primary" >                               
                                <CloseIcon sx={{ fontSize: 60, color: 'red' }}/>
                            </IconButton>
                            
                        </Grid>
                        
                        <Grid item xs={6}>
                            <IconButton title='Valider' color="primary" >                               
                                <DoneIcon sx={{ fontSize: 60, color: 'green' }}/>
                            </IconButton>
                        </Grid>
                </Grid>                           
                    
            </Grid>
        </Grid>
        
    </React.Fragment>
</Box>

      
  )
}

export default CardAdmin
