import React, { Children } from 'react'
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
import  ChangeProps  from './changeProps';

    export function ChangePropsModal({toggle}: {toggle: ()=> void}) {
        return <>
            <div style={{
                position: 'absolute',
                top: '0px',
                left: '0px',
                bottom: '0px',
                right: '0px',
                zIndex: '10',
                backgroundColor: 'rgba(0,0,0,0.5)'
            }} onClick={()=>{toggle()}}>
    
            </div>
            <ChangeProps  toggle={toggle}/>
    
        </>
    }
    
    
    export default styled(ChangePropsModal)`
        position: absolute;
        top: 40px;
        left: 50%;
        width: 800px;
        transform: translateX(-50%); // relates to the width of the element
        z-index:20;
        height: 500px;
    `