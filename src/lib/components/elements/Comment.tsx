import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components'


function Comment({ className }: { className?: string }) {
    let messageValue = useRef<any>(null)
    function updateMessage(e: any) {
        messageValue.current = e.target.value
        return
    }

    return <form className={className}>
        <input className='comment' placeholder='Add a comment' type="text" onChange={(e) => updateMessage(e)} />
        <PostInput messageValue={messageValue} className={`post`} type='submit' value='post' />
        <div>{messageValue.current}</div>
    </form>
}


const PostInput = styled.input<{ messageValue: any }>`
    color: ${(props) => props.messageValue === '' && `
                color: rgba(60, 121, 168, 0.6);

    `};
    flex-grow: 1;
    background-color: white;
    color: rgba(60, 121, 168, 0.6);
    font-size: 1rem;

`

export default styled(Comment)`
    padding: 20px;
    width: 100%;
    display: flex;
    border-top: 1.5px solid #eeeeee;
    border-radius: 20px;

    .comment {
        flex-grow: 2;
        padding-left: 10px;
        font-size: 1rem;
        
    }


    .post, .comment {
        border: none;
    }

`