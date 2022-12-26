import './Navbar.css'
import styled from 'styled-components'
import Post from './Post';

function PostModal({ post, className, toggle }: { post: {}, className?: string, toggle: () => void }) {



    return <>
        <div style={{
            position: 'absolute',
            top: '0px',
            left: '0px',
            bottom: '0px',
            right: '0px',
            zIndex: '10',
            backgroundColor: 'rgba(0,0,0,0.5)'
        }} onClick={()=>{toggle(); }}>

        </div>
        <div className={className}>
            <Post post={post} postContext='feed' className='d' />
        </div>
    </>
}


export default styled(PostModal)`
    position: absolute;
    top: 40px;
    left: 50%;
    max-width: 1200px;
    width: calc(100% - 40px);
    transform: translateX(-50%); // relates to the width of the element
    z-index:20;
    width: 80%;
    height: 80%;
`
