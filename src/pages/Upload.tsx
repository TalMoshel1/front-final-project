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


function Upload({ className }: { className?: string }) {
  const userInfoContext = useContext(UserContext)
  const firstLoad = useRef(false)
  const infinteScrollContainer = useRef<HTMLDivElement>(null)

  useEffect(() => {

  }, [])

  return <div>
   dgdf
  </div>
}

export default styled(Upload)`
    height: calc( 100vh - 125px);
    overflow: scroll;
    padding-top: 20px; 
`