
import { Button, Link } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import React, { useState, useCallback } from 'react';
function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerif, setPasswordVerif] = useState("");

    const HandleClick = useCallback(
        () => {
            first
        },
        [second],
    )

    return (
        <>
            <TextField
                variant="filled"
                label="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
            />
            <TextField
                variant="filled"
                label="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value) }}
            />
            <TextField
                variant="filled"
                label="password"
                value={passwordVerif}

                onChange={(e) => { setPasswordVerif(e.target.value) }}
            />
            <Button onClick={HandleClick}>submit</Button>
        </>
    )
}

export default Signin