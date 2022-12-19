import React from 'react';
import Post from './elements/Post';
import * as CSS from 'csstype'
import styled from 'styled-components'
import { ListStyle } from './ListStyle';

type FlexDirection = 'row' | 'column'

export function List({ children, direction }: { children: any[], direction: FlexDirection }) {
    return <UL direction={direction}>
        {children.map((child, i) =>
         <li style={{ textAlign: 'center'}} key={i}>
                {child}
        </li>)
        } 
    </UL>
}

const UL = styled.ul<{direction: 'row' | 'column'}>`
        /* display: flex;
        flex-direction: direction; */
        background-color: #FAFAFA;
        list-style: none;
        padding-inline-Start: 0px;
        width: calc(100%-40px);
        max-width: 500px;
        margin: 0;
`