import React, { useEffect, useState, useRef } from 'react';
import Axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';


async function getJSON(url: string) {
    const res = await fetch(url);
    return res.text();
}

export function Registration() {
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const fullnameRef = useRef<HTMLInputElement>(null)
    const numberOrEmailRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()

    console.log('registration page')

    function register() {
        Axios.post('http://localhost:3000/api/register', {
            username: usernameRef.current?.value,
            password: passwordRef.current?.value,
            fullname: fullnameRef.current?.value,
            email: numberOrEmailRef.current?.value
        }).then(res => {
            return Axios.post('http://localhost:3000/api/login', {
                username: usernameRef.current?.value,
                password: passwordRef.current?.value
            }, {withCredentials: true})
        })
        .then(res=>{
            navigate('/feed')
        })
        .catch(err => {
            console.log(err)
        })
    }
    return <div style={{ display: 'flex', flexDirection: 'column', margin: 'auto', padding: '1em', alignItems: 'center', width: 'fit-content', backgroundColor: 'white', border: '0.1em solid black' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Registration</h1>
            <label>mobile number or email</label>
            <input type='text' ref={numberOrEmailRef} />
            <label>full name</label>
            <input type='text' ref={fullnameRef} />
            <label>username</label>
            <input type='text' ref={usernameRef} />
            <label>password</label>
            <input type="password" ref={passwordRef} />
            <button onClick={register}>Sign Up</button>
        </div>
    </div>
}
