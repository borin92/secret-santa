
import {
    Button,
    Link,
    Grid,
    Paper,
    Typography,
    Avatar,
} from '@material-ui/core';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { useMutation } from 'react-query'
import Cookies from 'universal-cookie';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    body: {
        minWidth: '75% !important',
        padding: '20px auto'

    },
    paperStyle: {
        padding: 30,
        marginTop: 30,
        height: '73vh',
        width: 450,
        margin: "0 auto"
    },
    avatarStyle: {
        backgroundColor: '#1bbd7e'
    },
    btnstyle: {
        margin: '8px 0'
    }


}));

const checkAccount = async (data) => {
    if (!data) return null
    const response = fetch('http://localhost:3000/user/connect', {
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
    return response

};
function Login() {
    const classes = useStyles();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState("")

    const navigate = useNavigate();

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

        <Grid className={classes.body}>
            <Paper className={classes.paperStyle}>
                <Grid align='center'>
                    <Avatar className={classes.avatarStyle}><LoginOutlinedIcon /></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField
                    sx={{ marginBottom: 5 }}
                    label="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); }}
                    type="email"
                    placeholder="Email"
                    fullWidth
                    variant="outlined"
                    required
                    autoFocus
                />

                <TextField

                    sx={{ marginBottom: 5 }}
                    label="password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); }}
                    type="password"
                    placeholder="Password"
                    fullWidth
                    variant="outlined"
                    required
                />
                {errors}

                <Button type='submit' color='primary' variant="contained" className={classes.btnstyle} fullWidth onClick={HandleClick}>Sign in</Button>

                <Typography > Do you have an account ?
                    <Link href="/signin">
                        Sign Up
                    </Link>
                </Typography>
            </Paper>
        </Grid>

    </>

}

export default Login