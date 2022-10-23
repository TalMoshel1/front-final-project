import React from 'react';

type Overflow = 'scroll' | 'none'


export function ListStyle({ children, overflow }: { children: React.ReactNode, overflow?: Overflow }) {

    return <div>
        {overflow === 'scroll' ? <div
            style={{
                marginTop: '1em',
                margin: 'auto',
                backgroundColor: 'white',
                overflow: overflow,
                height: '10rem'
            }}
        >
            {children}
        </div> :
            <div
                style={{
                    marginTop: '1em',
                    margin: "auto",
                    backgroundColor: 'white',
                    overflow: overflow
                }}
            >
                {children}
            </div>}
    </div>
}

