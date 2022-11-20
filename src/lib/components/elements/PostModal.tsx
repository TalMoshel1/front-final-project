import React, { Children } from 'react'
// import InstagramIcon from '@mui/icons-material/Instagram';
// import SearchIcon from '@mui/icons-material/Search';
// import HomeIcon from '@mui/icons-material/Home';
// import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import NearMeIcon from '@mui/icons-material/NearMe';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import { useContext } from 'react';
import './Navbar.css'
import { UserContext } from '../../../store/context/UserContext';
import { serverUrl } from '../../../utils/FileServerIUrl'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Stack, TextField, InputAdornment, Button } from '@mui/material'
import { createTheme } from '@mui/material'
import { NONAME } from 'dns';
import Post from './Post';
import { useEffect, useState } from 'react';

function PostModal({ post, className, toggle }: { post: {}, className: string, toggle: () => void }) {

    useEffect(() => {
        console.log(post)
    })

    return <>
        <div style={{
            position: 'absolute',
            top: '0px',
            left: '0px',
            bottom: '0px',
            right: '0px',
            zIndex: '10',
            backgroundColor: 'rgba(0,0,0,0.5)'
        }} onClick={toggle}>

        </div>
        <div className={className}>
            <Post post={post} postContext='feed' className='d' />
        </div>
    </>
}




export default styled(PostModal)`
    position: absolute;
    top: 40px;
    left: 50%;
    width: 800px;
    transform: translateX(-50%); // relates to the width of the element
    z-index:20;
    height: 500px;
`
