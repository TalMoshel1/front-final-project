import React, { useEffect, useState } from 'react';

type Overflow = 'scroll' | 'none'

export function StyleList({children, overflow}: {children: JSX.Element, overflow?: Overflow}) {

    return <div
    style={{
        maxWidth: '80%',
        margin: "auto",
        backgroundColor: 'white',
        overflow: overflow
    }}
    >
     {children}   
    </div>
}

