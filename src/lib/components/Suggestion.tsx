// import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { serverUrl } from '../../utils/FileServerIUrl'

interface ISugg {
    username: string;
    media: string;
    _id: string
}


function Suggestion({ sugg, setUserClicked, className }: { sugg: ISugg, setUserClicked: (userClicked: string) => void, className?: string }) {


    return <li className={className}>
        {sugg.media ? <img src={`${serverUrl}/${sugg.media}`} /> : <img src={`${serverUrl}/uploads/search-grey-1.png`} />}
        <p>{sugg.username}</p>
        <div className='buttonContainer'>
            <button onClick={() => setUserClicked(sugg._id)}>follow</button>
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