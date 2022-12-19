import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import { userInfo } from 'os';
import styled from 'styled-components'
import { UserContext } from '../../../store/context/UserContext';
import axios from 'axios';
import Axios from 'axios'
import socket from '../../../utils/socket'


function ChangeProfilePhoto({ className, toggle }: { className?: string, toggle: () => void }) {
  const userInfoContext = useContext(UserContext)
  const fileInput = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState('')

  function SetFileState(e: any) {
    try {
      const file = e.target.files[0]
      console.log(file)
      setFile(file)
      return
    }
    catch {
      setFile('delete profilePic')
    }
  }
  useEffect(() => {
    if (file) {
      const data = new FormData();
      data.append('media', file);
      const config = {
        method: 'put',
        url: `http://localhost:3000/api/user/${userInfoContext.user?._id}`,
        data: data,
        withCredentials: true,
        headers: {
          'content-type': 'multipart/form-data',
        },
      }
      Axios(config)
        .then((updatedUser) => {
          if (updatedUser) {
            const userInfo = updatedUser.data
            userInfoContext.updateUser(userInfo, `user/${userInfo._id}`)
          } 
        }).catch((error) => {
          console.log(error)
        });
    } else if (file === 'delete') {
      Axios.put(`http://localhost:3000/api/user/${userInfoContext.user?._id}`, { media: 'shushu' })
        .then((updatedUser) => {
          if (updatedUser) {
            const userInfo = updatedUser.data
            userInfoContext.updateUser(userInfo, `user/${userInfo._id}`)
          } 
        }).catch((error) => {
          console.log(error)
        });
    }



  }, [file])


  return <div className={className}>
    <div className='grow1'><h1>Change Profile Picture</h1></div>
    <form action="#" encType='multipart/form-data' method='post'>
      <input type="file" name='file' onChange={(e) => { SetFileState(e) }} />
    </form>
    <div>
      <p className='remove' onClick={()=>{SetFileState('delete')}}>Remove Current Photo</p>
    </div>
    <div>
      <p className='cancel' onClick={toggle} >Cancel</p>
    </div>
  </div>
}

export default styled(ChangeProfilePhoto)`
    background-color: white;
    border: 1.5px solid #666565;
    border-radius: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 800px;
    transform: translate(-50%, -50%); // relates to the width of the element
    z-index:20;
    height: 500px;
    display:flex;
    flex-direction: column;
    align-items: stretch;
    div {
      height: 20%;
      border-top: 0.1875rem solid #aea3a3;
      overflow-x: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .grow1{
      flex-grow: 1
    }

    h1 {
      font-size: 2rem;
    }

    .cancel {
      font-size: 1.5rem;
      font-weight: bold;
    }

    .remove {
      font-size: 1.5rem;
      color: red;
      font-weight: bold;
    }
`