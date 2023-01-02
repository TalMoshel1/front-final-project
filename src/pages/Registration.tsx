import React, { useEffect, useState, useRef, useContext } from 'react';
import Axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import RegisterStyle from '../lib/components/elements/registrationLoginStyle'
import { sendCookie } from "../functions/userFunctions";
import { UserContext } from "../store/context/UserContext";





async function getJSON(url: string) {
    const res = await fetch(url);
    return res.text();
}

function Registration({ className }: { className?: string }) {
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const fullnameRef = useRef<HTMLInputElement>(null)
    const numberOrEmailRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()
    const [errors, setErrors] = useState<[] | { message: string }[]>([])
    // const userContext = useContext(UserContext);
    const userContext = useContext(UserContext)



    function register() {
        Axios.post(`${process.env.REACT_APP_API}/api/register`, {
            username: usernameRef.current?.value,
            password: passwordRef.current?.value,
            fullname: fullnameRef.current?.value,
            email: numberOrEmailRef.current?.value
        })
            .then(res => {
                return Axios.post(`${process.env.REACT_APP_API}/api/login`, {
                    username: usernameRef.current?.value,
                    password: passwordRef.current?.value
                }, { withCredentials: true })
            })
            .then(res => {
                sendCookie(userContext)
                navigate('/feed')
            })
            .catch(err => {
                console.log(err)
                setErrors(err.response.data)

            })
    }

    useEffect(() => {
    }, [errors])
    return <RegisterStyle page='register'>
        <div className={className} >
            <h1>Registration</h1>
            <div className='container'>
                <label>mobile number or email</label>
                <input type='text' ref={numberOrEmailRef} />
            </div>
            <div className='container'>
                <label>full name</label>
                <input type='text' ref={fullnameRef} />
            </div>
            <div className='container'>
                <label>username</label>
                <input type='text' ref={usernameRef} />
            </div>
            <div className='container'>
                <label>password</label>
                <input type="password" ref={passwordRef} />
            </div>
            <button onClick={register}>Sign Up</button>
            {errors && <div>{errors.map((err: { message: string }) => {
                return <p>{err.message}</p>
            })}</div>}
            <h2 onClick={() => navigate('/login')}>Already has a user? click here</h2>
        </div>
    </RegisterStyle>
}

export default styled(Registration)`

        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        text-align: center;
        width: 100%;
        max-width: 300px;
        gap: 1em;

        .container {
            display: flex;
            flex-direction: column;
            max-width: 300px;
            width: 100%;
        }

        input {
            padding: 10px;
            border-radius: 8px;
            border: 1px solid #333333;
        }

        button {
            padding: 10px;
            border-radius: 8px;
            border: 1px solid #333333;
            max-width: 300px;
            width: 100%;
            background-color: #d475d4;

        }
    
`
