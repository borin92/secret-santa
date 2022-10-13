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
import {useQuery} from "react-query";

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

function Username({ query }) {
  const {data: user, isLoading, refetch} = useQuery(['user', query], () => fetch(query).then((res) => res.json()))
  console.log(user, query)
  return (
      <span>
        {user && user.name}
      </span>
  );
}

function GiftAnswer({ query, status }) {
  const response = fetch(query, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      isValid: status,
    }),
  }).then((res) => res.json());
}

const CardAdmin = ({santa, userGifted, gift, message, id}) => {
  const queryUser = 'http://localhost:3000/user/';
  const queryGift = 'http://localhost:3000/update/gift/';
  const classes = useStyles();
  console.log(id)

  return (
    <Box sx={{ minWidth: 275, maxWidth: 1000, margin: 'auto' }}>
    <React.Fragment>
        <Grid container spacing={2} sx={{ marginTop: 5, border: 1, borderRadius: 1  }}>
            <Grid item xs={8}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                    <Username query={queryUser + santa}></Username> => <Username query={queryUser + userGifted}></Username>
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
                                <CloseIcon sx={{ fontSize: 60, color: 'red' }} onClick={<GiftAnswer query={queryGift + id} status={'reject'}/>}/>
                            </IconButton>
                            
                        </Grid>
                        
                        <Grid item xs={6}>
                            <IconButton title='Valider' color="primary" >                               
                                <DoneIcon sx={{ fontSize: 60, color: 'green' }} onClick={<GiftAnswer query={queryGift + id} status={'approve'}/>}/>
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
