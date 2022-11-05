import React, { useContext, useEffect, useState } from 'react';
import Post from '../lib/components/elements/Post';
import { List } from '../lib/components/List'
import { ListStyle } from '../lib/components/ListStyle';
import { UserContext } from '..';
import SuggestionsStyle from '../lib/components/FewSuggestionsStyle'
import Suggestion from '../lib/components/Suggestion'
import Flex from '../lib/components/Flex';
import { useNavigate } from 'react-router-dom'
import { userInfo } from 'os';
import styled from 'styled-components'
import { setDefaultResultOrder } from 'dns';



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
  const [page, setCount] = useState(0);
  const [userClicked, memoSetUserClicked] = useState('')
  const [loading, setLoading] = useState(false)
  const userInfoContext = useContext(UserContext)
  const navigate = useNavigate()
  const [test, setTest] = useState(false)

  function loadMore() {

  }
  useEffect(() => {
    async function setDataSuggestions() {
      fetch('http://localhost:3000/api/suggestions/feed', { credentials: 'include' })
        .then(res => {
          return res.json()
        })
        .then(suggestions => {
          setSuggestions(suggestions)
        })
        .catch(err => {
          console.log(err)
        })
    }
    setDataSuggestions();
  }, [])

  useEffect(() => {

    async function setDataPosts() {
      setLoading(true)
      fetch(`http://localhost:3000/api/post/feed?offset=${page}`, { credentials: 'include' })
        .then(res => {
          return res.json()
        })
        .then((posts) => {
          setPosts(prevPosts => {
            return [...prevPosts, ...(posts as Post[])]
          })
        })
        .then(() => {
          getUsersOfPosts()
        })
        .catch(err => {
          navigate('/login')
        }).finally(() => {
          setLoading(false)
        })
    }

    async function getUsersOfPosts() {
      await posts.forEach(async (post) => {
        fetch(`http://localhost:3000/api/user/${post.author}`, { credentials: 'include' })
          .then((newUser) => {
            return newUser.json()
          })
          .then((newUser) => {
            setUsers(prevUser => {
              return [...prevUser, newUser]
            })
          })
                    /* 
                console.log('suppose to setTest to true')
      setTest(true)
          
      run it here and usersState will be empty
          */
      })
      console.log('suppose to setTest to true')
      setTest(true)
    }

    if (!loading) setDataPosts();
  }, [page])


  useEffect(() => {
    if (test) {
      console.log(posts)
      console.log(usersState)
    } else {
      console.log('test is false')
    }
  })

  return <Style>
    <Flex>
      <ListStyle overflow='none'>
        <List direction='column'>{posts.map((post) => {
          return <Post post={post} setUserClicked={memoSetUserClicked}></Post> // every Post has: _id (unique value of post ID) and author (unique value of USER NAME)
        }
        )}</List>
      </ListStyle>
      <SuggestionsStyle>
        {suggestions.map((sugg, array) => {
          if (array <= 4) {
            return <Suggestion sugg={sugg} setUserClicked={memoSetUserClicked}></Suggestion>
          }
        })}
      </SuggestionsStyle>
    </Flex>
  </Style>
}



const Style = styled.div`

    margin-top: 20px;
    @media (min-width: 62.5rem) { 
        margin-right: 10%;
        margin-left: 10%;
    }

`