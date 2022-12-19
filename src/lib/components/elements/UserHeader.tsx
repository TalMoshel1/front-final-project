import React from "react";
import Navbar from '../../../lib/components/elements/Navbar'
import { UserContext } from '../../../store/context/UserContext';
import { useContext } from 'react'
import { serverUrl } from '../../../utils/FileServerIUrl'
import { Link } from 'react-router-dom'


export function UserHeader() {

    const userInfoContext = useContext(UserContext)

    return <div>
        <div className='profilePic__container'>
            {userInfoContext?.user?.media ?
                <img src={`${serverUrl}/${userInfoContext.user?.media}`} /> :
                <img src={`http://localhost:3000/uploads/search-grey-1.png`} />
            }
        </div>
    </div>
}