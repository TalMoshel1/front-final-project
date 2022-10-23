import React, { useContext, useEffect, useState, useMemo } from 'react';
import Post from '../lib/components/elements/Post';
import {List} from '../lib/components/List'
import { ListStyle } from '../lib/components/ListStyle';
import { UserContext } from '..';
import SuggestionsStyle from '../lib/components/FewSuggestionsStyle'
import Suggestion from '../lib/components/Suggestion'
import Flex from '../lib/components/Flex';
import {useNavigate} from 'react-router-dom'
import { userInfo } from 'os';


async function getJSON(url: string) {
  const res = await fetch(url);
  return res.json();
}

export function Feed() {
  const [suggestions, setSuggestions] = useState([])
  const [posts, setPosts] = useState([])
  const [page, setCount] = useState(0);
  const [userClicked, memoSetUserClicked] = useState('')
  // const memoSetUserClicked = useMemo(()=>{ return setUserClicked}, [userClicked])
    // const memoSetUserClicked =setUserClicked

  const userInfoContext = useContext(UserContext)
  const navigate = useNavigate()
  console.log('context', userInfoContext)
  useEffect(() => {
    async function setDataSuggestions() {
      fetch('http://localhost:3000/api/suggestions/feed', {credentials: 'include'})
      .then(res=>{
        return res.json()
      })
      .then(suggestions=>{
        console.log('great')
        setSuggestions(suggestions)
        })
        .catch(err=>{
        console.log(err)
      })
    }
    setDataSuggestions();
  }, [])

  useEffect(() => {
    async function setDataPosts() {
      fetch('http://localhost:3000/api/post/feed', {credentials: 'include'})
      .then(res=>{
        return res.json()
      })
      .then(posts=>{
        setPosts(posts)
        })
        .catch(err=>{
        navigate('/login')
      })
    }
    setDataPosts();
  }, [])

  useEffect(() => {
    if (userClicked) {
      console.log(userClicked)
      return navigate(`/user/${userClicked}`)
    }
  },[userClicked])

  return <div style={{backgroundColor:'#FAFAFA'}}> 
  <Flex>
  <ListStyle overflow='none'>
  <List direction='column'>{posts.map((post)=>{
    return <Post post={post} setUserClicked={memoSetUserClicked}></Post> // every Post has: _id (unique value of post ID) and author (unique value of USER NAME)
  }
    )}</List>
  </ListStyle>
  <SuggestionsStyle>
  {suggestions.map((sugg, array)=>{
      if (array <= 4) {
        return <Suggestion sugg={sugg} setUserClicked={memoSetUserClicked}></Suggestion>
      }
    })}
    </SuggestionsStyle>
   </Flex>
  </div>
}
