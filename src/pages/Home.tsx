import React, { useEffect, useState  } from 'react';
import './Home.css';
import { Link, Outlet, useLocation, useNavigate  } from "react-router-dom";
import  Navbar  from '../lib/components/elements/Navbar'
import { UserContext } from '..';
import UserProvider from '../store/context/UserContext';
import {Header} from '../lib/components/elements/Header'


function Home() {

  const userInfoUrl = 'http://localhost:3000/api/user-info'



  return <div style={{ backgroundColor:'#FAFAFA', height: '100vh'}}>
    {/* <Navbar/> */}
    <UserProvider>
    <Header/>
    {/* <nav>
      <ul>
        <li><Link to={'/register'}>Registration</Link></li>
        <li><Link to={'/login'}>Login</Link></li>
        <li><Link to={'/feed'}>Feed</Link></li>
        <li><Link to={'/user/:username'}>User</Link></li>
      </ul>
    </nav> */}
  
    <Outlet></Outlet>
    </UserProvider>

  </div>;
}

export default Home;