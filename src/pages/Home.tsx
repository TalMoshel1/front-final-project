import React, { useEffect, useState  } from 'react';
import './Home.css';
import { Link, Outlet, useLocation, useNavigate  } from "react-router-dom";
import  Navbar  from '../lib/components/elements/Navbar'
import UserProvider from '../store/context/UserContext';
import {Header} from '../lib/components/elements/Header'


function Home() {

  const userInfoUrl = 'http://localhost:3000/api/user-info'

  console.log('home')

  return <div style={{ backgroundColor:'#FAFAFA'}}>
    {/* <Navbar/> */}
    <UserProvider>
    <Header/>
    <Outlet></Outlet>
    </UserProvider>

  </div>;
}

export default Home;