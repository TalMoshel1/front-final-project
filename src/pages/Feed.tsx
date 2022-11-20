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

  function loadMore() {

  }

  useEffect(() => {
    async function setDataSuggestions() {
      fetch('http://localhost:3000/api/suggestions/feed', { credentials: 'include' })
        .then(res => {
          return res.json()
        })
        .then(suggestions => {
          console.log(suggestions)
          setSuggestions(suggestions)
        })
        .catch(err => {
          console.log(err)
        })
    }
    setDataSuggestions();
  }, [])



  useEffect(() => {
    const controller = new AbortController()

    async function setDataPosts() {
      setLoading(true)
      firstLoad.current = true
      fetch(`http://localhost:3000/api/post/feed?offset=${page}`, { credentials: 'include', signal: controller.signal })
        .then(res => {
          return res.json()
        })
        .then((posts) => {
          if (posts.length < 5) {
            cancelPegination.current = true
          }
          setPosts(prevPosts => {
            return [...prevPosts, ...(posts as Post[])]
          })

        })
        .catch(err => {
          console.log(err)
        }).finally(() => {
          setLoading(false)
          firstLoad.current = false
        })
    }
    if (!loading) setDataPosts();
    return () => {
      if (firstLoad.current) {
        controller.abort()
      }
    }
  }, [page])

  useEffect(() => {

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(e => {
        if (e.isIntersecting && posts.length && !cancelPegination.current) {
          setPage(p => p + 1)
        }
      })
    }, {
      root: document.getElementById("feedContainer"),
      threshold: 1,
      rootMargin: '50px'
    })


    if (infinteScrollContainer.current) observer.observe(infinteScrollContainer.current)
    return () => {
      observer.disconnect()
    }
  }, [posts])



  return <Style id="feedContainer">
    {posts && suggestions ? <Flex>
      <ListStyle overflow='none'>
        <List direction='column'>{posts.map((post) => {
          return <Post post={post} setUserClicked={memoSetUserClicked} postContext='feed' className='h' sizeModal={true}></Post> // every Post has: _id (unique value of post ID) and author (unique value of USER NAME)
        }
        )}
        </List>
        <div ref={infinteScrollContainer} style={{ height: '50px' }}></div>
      </ListStyle>
      <SuggestionsStyle>
        {suggestions.map((sugg, array) => {
          if (array <= 4) {
            return <Suggestion sugg={sugg} setUserClicked={memoSetUserClicked}></Suggestion>
          }
        })}
      </SuggestionsStyle>
    </Flex> : <div>loading</div>}

  </Style>
}



const Style = styled.div`
    display: flex;
    height: calc( 100vh - 125px);
    overflow: scroll;
    padding-top: 20px; 
    justify-content: center;
    

`