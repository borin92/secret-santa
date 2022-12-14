import React, { useState } from 'react';
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

  const { data: giftList, isLoading } = useQuery(['user', 'http://localhost:3000/gifts'], () => fetch('http://localhost:3000/gifts').then((res) => res.json()))
  if (isLoading || giftList.length === 0) {
    return (<p>Chargement...</p>)
  }
  return (
    <div>
      <Typography sx={{ marginBottom: 5, marginTop: 5 }} variant="h3" className={classes.title} >Dashboard Administrateur</Typography>
      <div className={"wrapper"}>
        <div className={"panel"}>
          <h1 className={"panel-title"}>Cadeaux en attente</h1>
          {giftList.filter(e => e.isValid === "pending").map(item => (
            <CardAdmin santa={item.santa} userGifted={item.userGifted} gift={item.gift} message={item.giftMessage} id={item.id} status={item.isValid} />
          ))}
        </div>
      </div>
      <div className={"wrapper"}>
        <div className={"panel"}>
          <h1 className={"panel-title"}>Traités</h1>
          {giftList.filter(e => e.isValid !== "pending").map(item => (
            <CardAdmin santa={item.santa} userGifted={item.userGifted} gift={item.gift} message={item.giftMessage} id={item.id} status={item.isValid} />
          ))}
        </div>
      </div>
    </div>

  )
}
