import React, { Children } from 'react'
import './Navbar.css'
import { UserContext } from '../../../store/context/UserContext';
import { serverUrl } from '../../../utils/FileServerIUrl'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useEffect, useState } from 'react';

function ChangeProps({ toggle, className }: { toggle: () => void, className?: string }) {
    return <div className={className}>
        <ul>
            <li>Change Password</li>
            <li>Change User Name</li>
            <li onClick={toggle}>Cancel</li>
            <li>Log Out</li>
        </ul>
    </div>
}

export default styled(ChangeProps)`
    position: absolute;
    top: 40px;
    left: 50%;
    width: 800px;
    transform: translateX(-50%); // relates to the width of the element
    z-index:20;
    height: 500px;
    background-color: white;

`


