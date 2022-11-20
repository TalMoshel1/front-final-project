import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import { List } from '../List'
import { ReactNode } from 'react'
import Image from '../Image'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import { serverUrl } from '../../../utils/FileServerIUrl'
import styled, { StyledComponent } from 'styled-components'
import Like from '../../components/elements/Like'
import Comment from '../../components/elements/Comment'

async function getJSON(url: string) {
  const res = await fetch(url);
  return res.json();
}

function Post({ post, setUserClicked, postContext, setPostClicked, className, sizeModal, toggle }: { post?: any, postContext: 'feed' | 'user', setUserClicked?: (userClicked: string) => void, setPostClicked?: (postClicked: boolean) => void, className: string, sizeModal?: boolean, toggle?: () => void  }) {
  const [numLikes, addLike] = useState(0);
  const params = useParams();
  const navigate = useNavigate()
  const fileServerUrl = 'http://localhost:3000'

  useEffect(()=>{
  })

  return <div className={className}>
    {(post && postContext === 'feed') &&
      <li>
        {!sizeModal && <Image post={post} className='modal__image'></Image>}
        <div className={!sizeModal ? 'post__content': ''}>
          <div className='post__header'>
            <div className='profilePic__container'>
              {post.media ?
                <img className='profile__img' src={`${serverUrl}/${post.media}`} /> :
                <img className='profile__img' src={`http://localhost:3000/uploads/search-grey-1.png`} />
              }
            </div>
            <div className='h1__container'>
              <h1><Link to={`/user/${post.author._id}`}>{post.username}</Link></h1>
            </div>
          </div>
          {sizeModal && <div><Image post={post} className='feed'></Image></div>}
          <div className='icons__container'>
            <Like onLike={() => addLike(numLikes + 1)}>
              <FavoriteBorderIcon className='icon' />
            </Like >
            <ChatBubbleOutlineIcon className='icon' />
            <ShareIcon className='icon' />
          </div>
          <div className='likesBodyUsername'>
            <p>Num likes {numLikes}</p>
            <p><strong>{post.username}</strong> <span>lorem50</span></p>
          </div>
          <Comment className='why I have to give className, whats the point?' />
          </div>

      </li>}

    {(post && postContext === 'user' && setPostClicked) &&
      <div className='user' onClick={() => { setPostClicked(post) }}>
        <Image post={post}></Image>
      </div>}

  </div>
}

export default styled(Post)`

  margin-bottom: 3em;
  background-color: white;
  border: 1.5px solid #eeeeee;
  border-radius: 20px;
  width: 100%;

  .modal__image {
    height: 100%;
  }

  .post__content {
    overflow: scroll;
    width: 800px;

  }

    li {
      display: flex;
    }

.user {
  width: 100%;
  height: 100%;
  margin-bottom: 1em;
}


  .post__header {
    display: flex;
    flex-direction: row;

  }

  .profilePic__container {
    padding: 10px
  }

  .profile__img {
    height: 60px;
    width: 60px;
    border: 1px solid black;
    border-radius: 40px ;
  }

  .h1__container {
    font-size: 0.75rem;
    display: flex;
    align-items: center;
    flex-grow: 1;
  }

  .icons__container {
    display: flex;
    justify-content: start;
    gap: 0.9em;
    padding: 10px;
  }

  .icon {
    height: 30px;
  }

  .likesBodyUsername{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
    font-size: 1rem;
  }
`



















// interface IPropsLike {
//   onLike: () => void;
//   children: JSX.Element;
// }

// function Like({ onLike, children }: IPropsLike) {
//   return <button style={{padding: '0px', borderWidth: '0px', backgroundColor: 'white'}} onClick={onLike}>{children}</button>
// }

// function PostBox({ children }: { children: JSX.Element[] }) {
//   return <div style={{
//     border: '4px solid black',
//     color: "black",
//     marginBottom: '1em',
//     width: '100%',
//     textAlign: 'center'
//   }}>
//     {children}
//   </div>

// }