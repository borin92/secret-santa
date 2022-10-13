
import { Button, Link } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { useMutation } from 'react-query'
import Cookies from 'universal-cookie';


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

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState("")


    const mutation = useMutation(checkAccount, {
        onSuccess: (data) => {
            if (data.status) {
                setErrors(data.message)
            }
            else {
                const cookies = new Cookies();

                cookies.set("santa", data[0].name, { path: '/' });
            }
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