import React from 'react';
import Post from './elements/Post';
import * as CSS from 'csstype'

type FlexDirection = 'row' | 'column'
export function List({ children, direction }: { children: any[], direction?: FlexDirection }) {
    return <div>
        {direction==='column'? <ul 
    style={{
        listStyleType: 'none',
        display: 'flex',
        flexDirection: direction,
        paddingInlineStart: '0px',
        gap: '1em'
        
    }}
    >
        {children.map((child, i) => <div style={{
            border: '1px solid black',
            textAlign: 'center'
        }} key={i}>
            <li>
                {child}
            </li>

        </div>)}
    </ul> :
    <ul 
    style={{
        listStyleType: 'none',
        display: 'flex',
        flexDirection: direction,
        paddingInlineStart: '0px'
        
    }}
    >
        {children.map((child, i) => <div style={{
            border: '1px solid black',
            textAlign: 'center'
        }} key={i}>
            <li>
                {child}
            </li>

        </div>)}
    </ul>}
         
    </div>
    
    
   
}