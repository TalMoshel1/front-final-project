import React, { useEffect, useState } from 'react';
import { ListStyle } from './ListStyle';
import styled from 'styled-components'

type SuggestionStyleProps = {
    children?: React.ReactNode
}

function FewSuggestionsStyle({ children }: SuggestionStyleProps) {

    return <Ul>
        {children}
    </Ul>
}

export default FewSuggestionsStyle


const Ul = styled.ul`
    @media (max-width: 62.5rem) {
        display: none;
    }
    width: 30%;
    min-width: 200px;
    height: max-content;
    border: 1.5px solid #eeeeee;
    list-style-type: none;
    padding-inline-start: 0px;
    border-radius: 30px;
    background-color: #FFFFFF;
    padding: 20px;
`
