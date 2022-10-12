
import { Button, Link } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import * as React from 'react';
function Login() {
    return <>
        <Link href="/signin">Inscription</Link>
        <TextField
            variant="filled"
        />
        <TextField
            variant="filled"
        />
        <Button>submit</Button>
    </>

}

export default Login