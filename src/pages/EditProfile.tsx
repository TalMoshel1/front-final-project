import React, { useContext, useEffect, useState, useRef } from 'react';
import Post from '../lib/components/elements/Post';
import { List } from '../lib/components/List'
import { ListStyle } from '../lib/components/ListStyle';
import SuggestionsStyle from '../lib/components/FewSuggestionsStyle'
import Suggestion from '../lib/components/Suggestion'
import Flex from '../lib/components/Flex';
import { useNavigate } from 'react-router-dom'
import { userInfo } from 'os';
import styled from 'styled-components'
import { setDefaultResultOrder } from 'dns';
import { UserContext } from '../store/context/UserContext';



async function getJSON(url: string) {
  const res = await fetch(url);
  return res.json();
}

type Post = {
  name: string;
  author: string
}

type User = {
  _id: object;
  media: [];
}

export function Feed({ className }: { className?: string }) {
  const [suggestions, setSuggestions] = useState([])
  const [posts, setPosts] = useState<Post[]>([])
  const [usersState, setUsers] = useState<{}[] | []>([])
  const [page, setPage] = useState(0);
  const [userClicked, memoSetUserClicked] = useState('')
  const [loading, setLoading] = useState(false)
  const userInfoContext = useContext(UserContext)
  const navigate = useNavigate()
  const firstLoad = useRef(false)
  const infinteScrollContainer = useRef<HTMLDivElement>(null)
  console.log('feed')
  const cancelPegination = useRef(false)


  return <div>
   

  </div>
}



const Style = styled.div`
    display: flex;
    height: calc( 100vh - 125px);
    overflow: scroll;
    padding-top: 20px; 
    justify-content: center;
    

`