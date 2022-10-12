
import { Button, Link } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import React, { useState, useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query'

const createAccount = async (data) => {


    if (!data) return null

    const response = fetch('http://localhost:3000/user', {
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
function Signin() {

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
        <><>
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
            <TextField
                variant="filled"
                label="password"
                value={passwordVerif}

                onChange={(e) => { setPasswordVerif(e.target.value); }} />
            {error}
            {valid ? <> {valid} <Link href="/login">Inscription</Link></> : ""}</><Button onClick={HandleClick}>submit</Button></>

    )
}

export default Signin