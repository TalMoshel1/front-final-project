import React, { useEffect, useState, Suspense } from 'react';
import './Home.css';
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from '../lib/components/elements/Navbar'
import UserProvider from '../store/context/UserContext';
import { Header } from '../lib/components/elements/Header'
import io from 'socket.io-client'
function Home() {

  return <div style={{ backgroundColor: '#FAFAFA', height: '100vh', overflow: 'hidden' }}>
    {/* <Navbar/> */}
    <UserProvider>
      {/* <Header /> */}
      {/* <Suspense> */}
      <Outlet></Outlet>

      {/* </Suspense> */}
    </UserProvider>

  </div>;
}

export default Home;