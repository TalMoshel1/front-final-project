import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import { List } from '../List'
import { ReactNode } from 'react'
import {Image} from '../Image'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';



async function getJSON(url: string) {
  const res = await fetch(url);
  return res.json();
}


export default function Post({ post, setUserClicked }: { post?: any,  setUserClicked: (userClicked: string) => void } ) {
  const [numLikes, addLike] = useState(0);
  const [dynamicPost, setDynamicPost] = useState({ title: '', id: '' });
  const params = useParams();
  const navigate = useNavigate()
  const fileServerUrl = 'http://localhost:3000'


  useEffect(() => {
    async function setDynamicData() {
      console.log('setDynamicData works')
      await setDynamicPost(await getJSON(`./data/post.${params.postId}.json`))
      console.log('try to fetch unseccessfully')
    }
    if (!post) {
      setDynamicData();
    }
    console.log('post is set!')
  }, [params.postId, post]);

  useEffect(()=>{
    console.log(post)
  },[])

  return <div>
    {post ? <div>
      <h1 onClick={()=>setUserClicked(post.username)}>{post.username}</h1>
      <Image post={post}></Image>
      <h2><Link style={{ color: 'black', textDecoration: 'none' }} to={`/posts/${post?.id}`}>{post?.title || dynamicPost?.title}</Link></h2>
      <Like onLike={() => addLike(numLikes + 1)}>
      <FavoriteBorderIcon/>
      </Like>
      <ChatBubbleOutlineIcon />
      <ShareIcon />
      <p>Num likes {numLikes}</p>
    </div> :
      <div><h2 style={{ color: "red" }}>no posts yet</h2></div>}
  </div>
}


















interface IPropsLike {
  onLike: () => void;
  children: JSX.Element;
}

function Like({ onLike, children }: IPropsLike) {
  return <button onClick={onLike}>{children}</button>
}

function PostBox({ children }: { children: JSX.Element[] }) {
  return <div style={{
    border: '4px solid black',
    color: "black",
    marginBottom: '1em',
    width: '100%',
    textAlign: 'center'
  }}>
    {children}
  </div>
}