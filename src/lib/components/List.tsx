import React from 'react';
import Post from './elements/Post';
import * as CSS from 'csstype'
import styled from 'styled-components'
import { ListStyle } from './ListStyle';

type FlexDirection = 'row' | 'column'

export function List({ children, direction }: { children: any[], direction: FlexDirection }) {
    return <Style direction={direction}>
        {children.map((child, i) =>
         <div style={{ textAlign: 'center'}} key={i}>
            <li>
                {child}
            </li>
        </div>)
        } 
    </Style>
}

const Style = styled.ul<{direction: 'row' | 'column'}>`
        /* display: flex;
        flex-direction: direction; */
        background-color: #FAFAFA;
        list-Style-Type: none;
        padding-inline-Start: 0px;
        width: 100%;
`