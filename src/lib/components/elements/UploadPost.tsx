import React, { useContext, useEffect, useState, useRef } from 'react';
import './Navbar.css'
import { UserContext } from '../../../store/context/UserContext';
import { serverUrl } from '../../../utils/FileServerIUrl'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Stack, TextField, InputAdornment, Button } from '@mui/material'
import { createTheme } from '@mui/material'
import { NONAME } from 'dns';
import Axios from 'axios';
import socket from '../../../utils/socket'


function UploadPost({ className }: { className?: string }) {
    const textArea = useRef<any>(null)
    const userInfoContext = useContext(UserContext)
    const [files, setFiles] = useState<any>('')
    const [dragCounter, setDragCounter] = useState(0);
    const [dragging, setDragging] = useState(false)
    const [body, setBody] = useState<string>('')
    const navigate = useNavigate()



    function handleDragEnter(e: any) {
        e.preventDefault()
        e.stopPropagation()
        setDragCounter(dragCounter + 1)
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setDragging(true)
        }
    };


    function handleDragLeave(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setDragCounter(dragCounter - 1)
        if (dragCounter === 0) {
            setDragging(false)
        }
    };

    function handleDragOver(event: any) {
        event?.preventDefault();
        event?.stopPropagation();
    }

    function handleDrop(event: any) {
        event?.preventDefault();
        event?.stopPropagation();
        setDragging(false)
        setDragCounter(0)
        setFiles(event.dataTransfer.files[0])
    }

    function submitForm() {
        const body = textArea.current.value
        if (body && files.name) {
            if (files) {
                const data = new FormData();
                data.append('media', files);
                data.append('body', body)
                const config = {
                    method: 'post',
                    url: `http://localhost:4000/api/post`,
                    data: data,
                    body: body,
                    withCredentials: true,
                    headers: {
                        'content-type': 'multipart/form-data',
                    },
                }
                Axios(config)
                    .then((res) => {
                        socket.emit('send_post', { message: res })
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        }
    }



    return <form className={className} action="#" encType='multipart/form-data' method='post'>
        <div className='dropZone' onDragOver={handleDragEnter} onDragLeave={handleDragLeave} onDragEnter={handleDragOver} onDrop={handleDrop}>
            Drag file here or click to select
            <input type="file" name='file' onChange={(event) => { setFiles(event.target.files) }} />
        </div>
        <div>
            <textarea rows={5} ref={textArea}></textarea>
        </div>
        <button type="button" onClick={() => { submitForm() }}>Publish</button>
    </form>
}

export default styled(UploadPost)`
    background-color: white;
    border: 1.5px solid #666565;
    border-radius: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    max-width: 800px;
    width: 100%;
    transform: translate(-50%, -50%); // relates to the width of the element
    z-index:20;
    display:flex;
    flex-direction: column;
    align-items: stretch;
    padding: 10px;

    .dropZone{
        border: 2px dotted #000000;
        width: 100%;
        height: 300px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-items: center;
        justify-content: center;
        border-radius: 12px;
    }

    textarea {
        resize: none;
        width: 100%!important;
        margin: 10px 0;
        border-radius: 8px;
    }

    button {
        outline: none;
        border: 2px solid #000000;
        border-radius: 8px;
        padding: 20px;
    }

    input {
        visibility: hidden;
    }
`
