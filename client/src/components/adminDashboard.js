import React, {useState} from 'react';
import CardAdmin from './Card';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@mui/material';
import {useQuery} from "react-query";

const useStyles = makeStyles(theme => ({
     title: {
        textAlign: 'center',
        textTransform: 'capitalize'
    }
 
}));

export default function Admin() {
  const classes = useStyles();
  const { data: giftList, isLoading, refetch } = useQuery(['user', 'http://localhost:3000/gifts'], () => fetch('http://localhost:3000/gifts').then((res) => res.json()))

  return (
    <div>
        <Typography sx={{  marginBottom: 10 }} variant="h3" className={classes.title} >Admin dashboard</Typography>
        {(giftList || []).map(item => (
            <CardAdmin santa={ item.santa } userGifted={ item.userGifted } gift={item.gift} message={item.giftMessage} id={item.id}/>
        ))}
    </div>

  )
}
