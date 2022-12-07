import {Avatar, Button, Grid, Link, Paper, Typography,} from '@material-ui/core';
import TextField from '@mui/material/TextField';
import {makeStyles} from '@material-ui/core/styles';
import React, {useState} from 'react';
import {useMutation} from 'react-query'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';


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


const createAccount = async (data) => {

    if (!data) return null

    return fetch('http://localhost:3000/user', {
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
function Signin() {
    const classes = useStyles();

    const [error, setError] = useState("");

    const [valid, setValid] = useState("");

    const mutation = useMutation(createAccount, {
        onSuccess: (data) => {
            console.log(data)
            if (data.status === 500) {
                setValid("")
                setError(data.message)
            }
            else {
                setError("");
                setValid("Votre compte a bien été crée")
            }
        },

    })

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerif, setPasswordVerif] = useState("");

    const HandleClick = async () => {
        mutation.mutate({
            email: email,
            password: password
        })
    }

    return (
        <Grid className={ classes.body}>
                    <Paper  className={classes.paperStyle}>
                        <Grid align='center'>
                            <Avatar className={classes.avatarStyle}><PersonAddAltIcon/></Avatar>
                            <h2>Sign In</h2>
                        </Grid>
                        <TextField  
                            sx={{ marginBottom: 5}}
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
                            sx={{ marginBottom: 5}}
                            label="password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); }}
                            type="password"
                            placeholder="Password"
                            fullWidth
                            variant="outlined"
                            required
                        />
                        <TextField                        
                            sx={{ marginBottom: 5}}
                            label="password"
                            value={passwordVerif}
                            onChange={(e) => { setPasswordVerif(e.target.value); }}
                            type="password"
                            placeholder="Password"
                            fullWidth
                            variant="outlined"
                            required
                        />
                        
                        {valid ? <> {valid} <Link href="/login">Inscription</Link></> : ""}
                        <Button type='submit' color='primary' variant="contained" className={classes.btnstyle} fullWidth onClick={HandleClick}>
                            submit
                        </Button>
 
                        <Typography > you have an account ?
                            <Link href="/">
                                Sign In
                            </Link>
                        </Typography>
                    </Paper>
            </Grid>
    )
}

export default Signin