import React, {useEffect, useState} from 'react';
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

function Verb({ status }) {
  if (status === 'pending') {
    return " souhaite offrir "
  } else if (status === 'approve') {
    return " offrira "
  } else {
    return " souhaitais offrir "
  }
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
  const [chip, setChip] = useState({});

  useEffect(() => {
    if ('reject' === status) {
      setChip({label: 'Refusée', color: 'error'})
    } else if ('approve' === status) {
      setChip({label: 'Acceptée', color: 'success'})
    } else {
      setChip({label: 'En attente', color: 'info'})
    }
  }, [status]);

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
    <div className={"userCard"}>
      <div className={"userInfo"}>
        <div>
          <Chip label={chip['label']} color={chip['color']} />
        </div>
        <div>
          <p className={"userInfoName"}>
            <strong><Username query={queryUser + santa} /></strong>
            <Verb status={status} />
            <strong>{gift}</strong> à <strong><Username query={queryUser + userGifted} /></strong>
          </p>
          <p className={"userInfoEmail"}><strong>Message :</strong> {message}</p>
        </div>
      </div>
      { status === 'pending' &&
        <div>
          <IconButton title='Rejeter' color="primary">
            <CloseIcon sx={{fontSize: 60, color: 'red'}} onClick={() => HandleClick(id, 'reject')}/>
          </IconButton>
          <IconButton title='Valider' color="primary">
            <DoneIcon sx={{fontSize: 60, color: 'green'}} onClick={() => HandleClick(id, 'approve')}/>
          </IconButton>
        </div>
      }
    </div>
  )
}

export default CardAdmin
