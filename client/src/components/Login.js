<<<<<<< Updated upstream
import { Button, Link } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { useMutation } from 'react-query'
import Cookies from 'universal-cookie';
=======
import {Avatar, Button, Grid, Link, Paper, Typography,} from '@material-ui/core';
import TextField from '@mui/material/TextField';
import {makeStyles} from '@material-ui/core/styles';
import React, {useState} from 'react';
import {useMutation} from 'react-query'
import Cookies from 'universal-cookie';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    body: {
        minWidth: '75% !important',
        padding: '20px auto'

    },
    paperStyle: {
        padding :30,
        marginTop:30,
        height:'73vh',
        width:450, 
        margin:"0 auto"
   },
   avatarStyle: {
    backgroundColor:'#1bbd7e'
   },
   btnstyle: {
    margin:'8px 0'
   }


 }));
>>>>>>> Stashed changes

const checkAccount = async (data) => {
    if (!data) return null
    return fetch('http://localhost:3000/user/connect', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: data.email,
            password: data.password
        })
    }).then(res => res.json())

};
function Login() {
<<<<<<< Updated upstream

=======
    const classes = useStyles();
>>>>>>> Stashed changes
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState("");
    const navigate = useNavigate();

    // matthieu.brehamel@my-digital-school.org


    const mutation = useMutation(checkAccount, {
        onSuccess: (data) => {
            if (data.status) {
                setErrors(data.message)
            }
            else {
                const cookies = new Cookies();
                cookies.set("santa", data[0].name, { path: '/' });
                cookies.set("santaId", data[0].id, { path: '/' });
            }

            navigate("/admin");
        },
    })
    const HandleClick = async () => {

        mutation.mutate({
            email: email,
            password: password
        })


    }

    return <>
        <Link href="/signin">Inscription</Link>
        <TextField
            variant="filled"
            label="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); }} />
        <TextField
            variant="filled"
            label="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); }} />
        {errors}
        <Button onClick={HandleClick}>submit</Button>
    </>

}

export default Login
