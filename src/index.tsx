import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/Home';
import reportWebVitals from './reportWebVitals';
import { Route, Routes, HashRouter } from "react-router-dom";
import { Feed } from './pages/Feed';
import Post from './lib/components/elements/Post';
import { Registration } from './pages/Registration'
import { Login } from './pages/Login';
import { User } from './pages/User'
import { createContext, useContext, useState, useMemo } from 'react';

export const UserContext = createContext<{username: string}>({username:''})
// <{username: string, email: string, following: string[]}>

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path='/' element={<Home></Home>}>
          <Route path='register' element={<Registration></Registration>}></Route>
          <Route path='login' element={<Login></Login>}></Route>
          <Route path='feed' element={<Feed></Feed>}></Route>
          <Route path='/user/:id' element={<User></User>}></Route>
          {/* <Route path='posts/:postId' element={<Post></Post>}></Route> */}
          {/* <Route path='api' element={<Api></Api>}></Route> */}
        </Route>
      </Routes>
    </HashRouter>

  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();