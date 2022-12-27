// import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { serverUrl } from '../../utils/FileServerIUrl'
import { UserInterface } from '../../interfaces/interfaces'
import React, { useContext, useEffect, useState, useRef } from 'react';
// import { UserContext, USER, userReducer } from '../../store/context/UserContext';
import { UserContext } from '../../store/context/UserContext';

import {useNavigate} from 'react-router-dom'


function Suggestion({ sugg, setUserClicked, className, follow }: { sugg: UserInterface, setUserClicked: (userClicked: string | undefined) => void, className?: string, follow: (string | undefined | any)}) {
    const userInfoContext = useContext(UserContext)
    const navigate = useNavigate()

    async function toFollow() {
        if (userInfoContext) {
            const updatedUser = await follow(sugg._id)
            // userInfoContext.updateUser(updatedUser, 'feed')
        }
        return
    }
    

    return <li className={className}>
        {sugg.media ? <img src={`${serverUrl}/${sugg.media}`} /> : <img src={`${serverUrl}/uploads/search-grey-1.png`} />}
        <p onClick={()=>{navigate(`/user/${sugg._id}`)}}>{sugg.username}</p>
        <div className='buttonContainer'>
            <button onClick={() => toFollow()}>follow</button>
        </div>
    </li>
}

export default styled(Suggestion)`
     
        display: flex;
        flex-direction: row;
        width: 100%;
        background-color: #FFFFFF;
        border-radius: 30px;
    

    img {
        border-radius: 10px;
        width: 3rem;
        height: 3rem;
    };

    .buttonContainer { 
        flex-grow: 1;
        display: flex;
        justify-content: flex-end;
    }

    button {
        all: unset;
        cursor: pointer;
        color: hsl(206, 80%, 58%);
    }


`