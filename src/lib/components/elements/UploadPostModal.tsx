import './Navbar.css'
import styled from 'styled-components'
import Post from './Post';
import UploadPost from './UploadPost'


function UploadPostModal({ className, toggle }: { className?: string, toggle: () => void }) {

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
        <UploadPost />
    </>
}


export default styled(UploadPostModal)`
    position: absolute;
    top: 40px;
    left: 50%;
    max-width: 1200px;
    width: calc(100% - 40px);
    transform: translateX(-50%); // relates to the width of the element
    z-index:20;
    height: 500px;
    overflow: hidden;
`
