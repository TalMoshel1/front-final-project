import React, { Children } from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import NearMeIcon from '@mui/icons-material/NearMe';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useContext } from 'react';
import './Navbar.css'
import { UserContext } from '../../../store/context/UserContext'; 
import { serverUrl } from '../../../utils/FileServerIUrl'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Stack, TextField, InputAdornment, Button } from '@mui/material'
import { createTheme } from '@mui/material'
import { NONAME } from 'dns';

function Navbar({ className }: { className?: string }) {
    const userInfo = useContext(UserContext)
    return <>
        <nav className={className} style={{ position: 'sticky', top: '0px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: 'auto', backgroundColor: 'white', border: '1.5px solid #eeeeee', height: '7.66625rem'
 , overflow: 'none' }}>
            <div className='navChild'>
                <div className='h1Container'>
                    <h1 className='navChild__child header'><Link to='feed' className='headerLink'>INSTAGRAM</Link></h1>
                </div>
                <div className='navChild__child textField__container'><TextField sx={{ input: { color: '#5b5959' } }} className='textField' label='Search'
                    InputProps={{ startAdornment: <InputAdornment position='start'><SearchIcon></SearchIcon>Search</InputAdornment> }}> </TextField>
                </div>
                <ul className='navChild__ul icons_container changeOrder__phone'>
                    <li className='displayNone__phone'><Link to='/feed'><HomeIcon className='navbarIcon__style icon__home' /></Link></li>
                    <li><ChatBubbleOutlineIcon className='navbarIcon__style' /></li>
                    <li><Link to={'/Upload'}><AddCircleOutlineIcon className='navbarIcon__style' /></Link></li>
                    <li className='displayNone__phone'><NearMeIcon className='navbarIcon__style' /></li>
                    <li><FavoriteBorderIcon className='navbarIcon__style' /></li>
                    <li className='displayNone__phone ulChild__imgContainer'>{userInfo?.user?.media ?
                        <Link to='/user/:username'><img src={`${serverUrl}/${userInfo?.user?.media}`} /></Link> :
                        <Link to='/user/:username'><img src={`http://localhost:3000/uploads/search-grey-1.png`} /></Link>}
                    </li>
                </ul>
            </div>
        </nav>
    </>


}

export default styled(Navbar)`

.navChild {
     width: 100%;
      display: flex;
      flex-direction: row;
       justify-content: space-between;

}

.navChild__ul, .navChild__child {
    display: flex;
    align-items: center;
    list-style-type: none;

}



.headerLink{
    width: 50%;
    font-size: 2rem;
     text-decoration: none;
      color: black;
    }


h1 {
        border-radius: 20px;
        padding: 15px;

    }
.textField__container {
    display: flex;
     flex-grow: 1;
      align-items: center;
       justify-content: center; 
}

.textField{
        width: 50%;
        border-width: 0px;
        background-color: #EFEFEF;
        border-radius: 20px;
        outline: none;
        color: #5b5959;
    }

.list_item {
        margin-right: 3em;
}

    .icons_container {
    justify-content: space-between;
}

.navbarIcon__style {
    padding: 15px;
    border-radius: 50px;
}

@media (min-width: 62.5rem) {
    .navbarIcon__style {
    font-size: 2.1875rem;
}
}
@media (max-width: 62.5rem) {
    .textField__container {
        display: none;
    }

}

@media (min-width: 36.0625rem) {
    .navChild__ul {
        padding-right: 40px;
}
    .icons_container {
        gap: 3em;
    }
     .h1Container {
        padding-left: 40px;
    } 

}
@media (max-width: 36.0625rem) {
    .headerLink{
    font-size: 1.8rem;
}
    .changeOrder__phone {
        order: -1;
    }

    .displayNone__phone {
        display: none;
    }

    nav {
        padding-inline-start: 40px;
    }

    .navChild__ul {
        flex-shrink: 1;
    }

    .icons_container {
        gap: 1em;
        padding-inline-start: 0px;

    }
} 

.icon__home {
     color: black;
}

.navbarIcon__style:hover, img:hover, h1:hover  {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 15px;
    transition: 150ms;
}

img {
    height: 60px;
    width: 60px;
    border: 1px solid black;
    border-radius: 40px ;
}


`
