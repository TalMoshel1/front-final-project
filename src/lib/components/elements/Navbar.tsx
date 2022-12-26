import React, { Children, useEffect, useMemo, useState, useReducer } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
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
import UploadPost from './UploadPost'
import UploadPostModal from './UploadPostModal'
import axios from 'axios';
import LogoutIcon from '@mui/icons-material/Logout';
import {USER, userReducer} from '../../../store/context/UserContext'

function Navbar({ className }: { className?: string }) {

    const [toggleModal, setToggleModal] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const userInfo = useContext(UserContext)
    const { user } = useContext(UserContext)
    const [userState, dispatch] = useReducer(userReducer,USER)

    // const memoizeduser = useMemo(()=>{return user}
    // ,[user])

    // useEffect(()=>{
    //     console.log(user?._id)
    // }, [user?._id])

    useEffect(()=>{
        dispatch({type:''})
        console.log(userState)
    }, [USER])
        
    async function logout() {
        fetch('http://localhost:4000/api/logout', { credentials: 'include' })
            .then((res) => {
                console.log(res)
                dispatch({type:'deleteUser'})
                // userInfo.signOut()
                navigate('/login')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    




    return <>
        {(location.pathname !== '/login' && location.pathname !== '/register') ?
            <div>
                <nav className={className}>
                    <div className='navChild'>
                        <div className='h1Container displayNone__phone'>
                            <h1 className='navChild__child header'><Link to='feed' className='headerLink'>INSTAGRAM</Link></h1>
                        </div>
                        <div className='navChild__child textField__container'><TextField sx={{ input: { color: '#5b5959' } }} className='textField' label='Search'
                            InputProps={{ startAdornment: <InputAdornment className='input' position='start'><SearchIcon></SearchIcon>Search</InputAdornment> }}> </TextField>
                        </div>
                        <ul className='navChild__ul icons_container changeOrder__phone'>
                            <li onClick={logout}><LogoutIcon className='navbarIcon__style'></LogoutIcon></li>
                            <li><Link to='/feed'><HomeIcon className='navbarIcon__style icon__home' /></Link></li>
                            <li><ChatBubbleOutlineIcon className='navbarIcon__style' /></li>
                            <li><AddCircleOutlineIcon className='navbarIcon__style' onClick={() => { setToggleModal(!toggleModal) }} /></li>
                            <li className='displayNone__phone'><NearMeIcon className='navbarIcon__style' /></li>
                            <li><FavoriteBorderIcon className='navbarIcon__style' /></li>
                            <li className='ulChild__imgContainer navbarIcon__style'>{userInfo?.user?.media ?
                                <Link to={`/user/${userInfo.user?._id}`}><img className='icon_img_smallfont' src={`${serverUrl}/${userInfo?.user?.media}`} /></Link> :
                                <Link to={`/user/${userInfo.user?._id}`}><img className='icon_img_smallfont' src={`http://localhost:4000/uploads/search-grey-1.png`} /></Link>}
                            </li>
                        </ul>
                    </div>
                </nav>
                {toggleModal && <UploadPostModal toggle={() => { setToggleModal(!toggleModal) }} />}
            </div> :
            <div style={{display: 'none'}}> </div>
        }

    </>


}

export default styled(Navbar)`

position: sticky;
top: 0px;
width: 100%;
display: flex;
align-items: center;
justify-content: space-between;
margin: auto;
background-color: white;
border: 1.5px solid #eeeeee;
height: 7.66625rem;
overflow: none;
box-shadow: rgba(220, 99, 204, 0.25) 0px 5px 30px;


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
        word-wrap: break-word;

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
@media (max-width: 72rem) {
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
    .navChild{
        justify-content: center;
    }
    .headerLink{
    font-size: 1.2rem;
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
        gap: 0.1em;
        padding-inline-start: 0px;

    }

    .navbarIcon__style {
    padding: 5px;
    border-radius: 16.5px;
}

.ulChild__imgContainer {
    // width: 25px;
    // height: 25px;
    width: 1.9em;
    height: 1.9em;
}

.icon_img_smallfont {
    width: 100%;
    height: 100%;
}
/* .ulChild__imgContainer > img {
    width: 100%;
} */

} 



.icon__home {
     color: black;
}

.navbarIcon__style:hover, img:hover, h1:hover  {
    box-shadow: rgba(220, 99, 204, 0.25) 0px 5px 30px;
    transition: 150ms;
}

img {
    height: 60px;
    width: 60px;
    border: 1px solid black;
    border-radius: 40px ;
}


`
