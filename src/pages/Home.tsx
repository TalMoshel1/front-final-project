import React, { useEffect, useState  } from 'react';
import './Home.css';
import { Link, Outlet, useLocation, useNavigate  } from "react-router-dom";
import { Navbar } from '../lib/components/Navbar'
import { UserContext } from '..';


function App() {

  const userInfoUrl = 'http://localhost:3000/api/user-info'
  // const realServerUrl = 'https://instegram.onrender.com/'
  // const [serverText, setServerText] = useState('no text yet')
  const [userInfo, setUserInfo] = useState({username:''})
  const [finishedLoading, setFinishedLoading] = useState(false)
  const navigate = useNavigate() // redirect to other components
  const location = useLocation() // react router hook

  useEffect(()=>{
    fetch(userInfoUrl, {credentials: 'include'}).then(async res=>{
      if(res.status!==200){
        navigate('/login')
        
        return
      }
      const data = await res.json()
      debugger
      setUserInfo(data)
      navigate('/feed')
    }).catch(err=>{
      navigate('/login')
    }).finally(()=>{
      setFinishedLoading(true)
    })
  },[])

  useEffect(()=>{
    if (finishedLoading && !userInfo && location.pathname !== '/login') {
      navigate('/login')
    }
  },[location])


  return <div style={{ backgroundColor:'#FAFAFA', height: '100vh'}}>
    {/* <Navbar/> */}
    <UserContext.Provider value={userInfo}>
    <nav>
      <ul>
        <li><Link to={'/register'}>Registration</Link></li>
        <li><Link to={'/login'}>Login</Link></li>
        <li><Link to={'/feed'}>Feed</Link></li>
        <li><Link to={'/user/:username'}>User</Link></li>
      </ul>
    </nav>
  
    <Outlet></Outlet>
    </UserContext.Provider>


  </div>;
}

export default App;