import React, { useEffect, useState } from 'react';
import { ListStyle } from './ListStyle';

interface ISugg {
    username: string;
    media: string;
    _id: string
}


const fileServerUrl = 'http://localhost:3000'


function Suggestion({ sugg, setUserClicked }: { sugg: ISugg, setUserClicked: (userClicked: string) => void }) {


    return <div>
        {sugg.media ?
            <div style={{ display: 'flex' }}>
                <img src={`${fileServerUrl}/${sugg.media}`} style={{ borderRadius: '10px', width: '3rem', height: '3rem' }} />
                <p>{sugg.username}</p>
                <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                    <button style={{ all: 'unset', cursor: 'pointer', color: 'hsl(206, 80%, 58%)' }} onClick={() => setUserClicked(sugg._id)}>follow</button>
                </div>
            </div> :
            <div style={{ display: 'flex' }}>
                <img src={`${fileServerUrl}/uploads/search-grey-1.png`} style={{ borderRadius: '10px', width: '3rem', height: '3rem' }} />
                <p>{sugg.username}</p>
                <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                    <button style={{ all: 'unset', cursor: 'pointer', color: 'hsl(206, 80%, 58%)' }} onClick={() => setUserClicked(sugg._id)}>follow</button>
                </div>
            </div>}

    </div>


}


export default Suggestion;
