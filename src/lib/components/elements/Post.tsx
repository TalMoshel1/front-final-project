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

function Post({ post, setUserClicked, postContext, setPostClicked, className, sizeModal, toggle }: { post?: any, postContext: 'feed' | 'user', setUserClicked?: (userClicked: string) => void, setPostClicked?: (postClicked: boolean) => void, className?: string, sizeModal?: boolean, toggle?: () => void }) {
  const [numLikes, addLike] = useState(0);
  const params = useParams();
  const navigate = useNavigate()
  const fileServerUrl = 'http://localhost:4000'


  return <div className={className}>
    {(post && postContext === 'feed') &&
      <div className={!sizeModal ? 'feed_item li__modal' : 'feed_item'}>
        {!sizeModal && <Image post={post} className='modal__image'></Image>}
        <div style={{ width: '100%' }} className={!sizeModal ? 'post__content' : ''}>
          <div className='post__header'>
            <div className='profilePic__container'>
              {post.author.media ?
                <img className='profile__img' src={`${serverUrl}/${post.author.media}`} /> :
                <img className='profile__img' src={`http://localhost:4000/uploads/search-grey-1.png`} />
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
            <p className='postText' ><strong>{post.username}</strong> <div className='postBody'>{post.body}</div></p>
          </div>
          <Comment />
        </div>

      </div>}

    {(post && postContext === 'user' && setPostClicked) &&
      <div className='user' onClick={() => { setPostClicked(post) }}>
        <Image post={post} postContext={postContext}></Image>
      </div>}

  </div>
}

export default styled(Post)`

  margin-bottom: ${props => props.postContext === 'user' ? "0em" : "3em"};
  background-color: white;
  border: 1.5px solid #eeeeee;
  border-radius: 20px;
  width: ${props => props.postContext === 'user' ? "100%" : "80%"};
  margin-left: auto;
  margin-right: AUTO;
  min-width: ${props => props.postContext === 'user' ? "50px" : "100px"};
  overflow: hidden;
  /* min-height: ${props => props.postContext === 'user' ? "50px" : "500px"}; */
  max-height: ${props => props.postContext === 'user' ? "350px" : "fit-content"};
  height: 100%;


  .modal__image {
    height: 100%;
    align-self: center;
  }

  .post__content {
    overflow-y: auto;
    overflow-x: hidden;
    width: 800px;
    max-height: 80vh;
    background: #ffffff;
  }

  .postText{
    width: 100%;
    text-align: start;

  }

  .postBody {
    max-width: 500px;
    word-wrap: break-word;
    
  }

    .feed_item {
      display: flex;

      &.li__modal {
        background: #000000;
        border-radius: 10px;
        overflow: hidden;
        width: 100%;

        
      .post__content {
        overflow-y: auto;
        overflow-x: hidden;
        width: 800px;
        max-height: 80vh;
        background: #ffffff;
  }
      }
    }

    @media screen and (max-width: 36.0625rem) {
      .feed_item.li__modal {
        flex-direction: column;
      }
    }

.user {
  width: 100%;
  height: 100%;
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
    padding: 0px 10px;
    font-size: 1rem;

  }
`
