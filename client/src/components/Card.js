import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  CardContent,
  Box,
  Grid,
  IconButton,
  Stack,
  Chip
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { useMutation, useQuery } from "react-query";


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
  const { data: user } = useQuery(['user', query], () => fetch(query).then((res) => res.json()))

  return (
    <span>
      {user && user.name}
    </span>
  );
}



function giftAnswer(data) {
  const response = fetch("http://localhost:3000/gift/updateStatus", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      santaId: data.id,
      isValid: data.status,
    }),
  }).then((res) => res.json());
  return response;
};


const CardAdmin = ({ santa, userGifted, gift, message, id, status }) => {
  const queryUser = 'http://localhost:3000/user/';
  // const queryGift = 'http://localhost:3000/update/gift/';
  const classes = useStyles();

  const mutation = useMutation(giftAnswer, {
    onSuccess: (data) => {
      console.log(data);
      if (data.status === 500) {
      } else {
      }
    },
  });

  const HandleClick = async (id, status) => {
    mutation.mutate({
      id: id,
      status: status,
    });
  };

  return (
    <Box sx={{ minWidth: 275, maxWidth: 1000, margin: 'auto' }}>
      <React.Fragment>
        <Grid container spacing={2} sx={{ marginTop: 5, border: 1, borderRadius: 1 }}>
          <Grid item xs={8}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                <Username query={queryUser + santa}></Username> ==> <Username query={queryUser + userGifted}></Username>
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
          <Grid className={classes.root} sx={{ margin: 'auto' }} item xs={4}>
            <Grid container>
              <Stack direction="row" spacing={1}>
              {status === 'reject' ?
                  <Chip label="Refusé" color="error" />
                  :
                  <Chip label="Accepté" color="success" />
              }


                {/*<Chip label="success" color="success" />*/}
              </Stack>
              <Grid item xs={6}>
                <IconButton title='Rejeter' color="primary" >
                  <CloseIcon sx={{ fontSize: 60, color: 'red' }} onClick={() => HandleClick(id, 'reject')} />
                </IconButton>
              </Grid>
              <Grid item xs={6}>
                <IconButton title='Valider' color="primary" >
                  <DoneIcon sx={{ fontSize: 60, color: 'green' }} onClick={() => HandleClick(id, 'approve')} />
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
