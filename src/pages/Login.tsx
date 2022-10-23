import React, { useEffect, useState, useRef, createContext } from 'react';
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';


// async function getJSON(url: string) {
//     const res = await fetch(url);
//     return res.text();
// }

export function Login() {
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const [loggedUser, setLoggedUser] = useState('')
    const [error, setError] = useState('')
    const [isShowPassword, setisShowPassword] = useState(false)
    const navigate = useNavigate()


    function login() {
        Axios.post('http://localhost:3000/api/login', {
            username: usernameRef.current?.value || '',
            password: passwordRef.current?.value || ''
        }, {withCredentials: true}).then(res => {
            setLoggedUser(res.data)
            console.log(res.data)
            return res
        }).then((res)=>{
            console.log('navigating despite error')
            navigate('/feed')
        }).catch(err => {
            setError(err)
            console.log(`error: ${err}`)
        })

    }
    console.log(loggedUser)

    return <div style={{ display: 'flex', flexDirection: 'column', margin:'auto', padding: '1em', alignItems: 'center', width: 'fit-content', backgroundColor:'white', border: '0.1em solid black' }}>
        <h1>INSTAGRAM</h1>
        <div className="registration" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Login</h1>
            <label>Username</label>
            <input style={{ width: '100%', padding: '0px' }} type='text' ref={usernameRef} /><br></br>
            <label>Password</label>
            <div style={{ display: 'inline' }}>
                <input style={{ width: '70%', padding: '0px' }} type={isShowPassword ? "text" : "password"} ref={passwordRef} />
                <button style={{ display: 'inline', borderWidth: '0px', width: '27%' }} onClick={() => setisShowPassword(!isShowPassword)}>hide</button>
                <button style={{ backgroundColor: 'blue', borderRadius: '0px', display: 'block', width: '100%' }} onClick={login}>Login</button>
            </div> 

            {loggedUser ? <h1>{loggedUser}</h1> : <h1></h1>}
        </div>
    </div>
}
