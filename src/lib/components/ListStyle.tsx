import React from 'react';
import styled from 'styled-components'

type Overflow = 'scroll' | 'none'

function ListComp({ children, className }: { children: React.ReactNode, overflow: Overflow, className?: string }) {
    return <div className={className}>
                 {children}
    </div>
}

export const ListStyle = styled(ListComp)`
    @media (min-width: 62.5rem) {
        width: 60%;
    }
    @media (max-width: 62.5rem) {
        width: 100%;
    }
    overflow: ${(props)=>props.overflow};
    width: 100%
`
