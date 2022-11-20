import { useContext, useEffect, useState } from "react"
import { Navigate, useParams, useNavigate } from "react-router-dom"
import Post from '../lib/components/elements/Post'
import style from 'styled-components'
import styled from "styled-components"
import { serverUrl } from '../utils/FileServerIUrl'
import { UserContext } from "../store/context/UserContext"
import Axios from 'axios'
import PostModal from "../lib/components/elements/PostModal"

function User({ user, className }: { user?: {}, className?: string }) {
    const userParams = useParams()
    const [userInfo, setUserInfo] = useState({ username: '', media: '', following: [] })
    const [posts, setPosts] = useState([])
    const userInfoContext = useContext(UserContext)
    const [postClicked, memoSetPostClicked] = useState({username:''})
    const [togglePostModal, setTogglePostModal] = useState(false)
    const [isMe, setIsMe] = useState(false)
    const navigate = useNavigate() // redirect to other components
    const [followedByMe, setFollowedByMe] = useState<boolean>(false)

    useEffect(()=>{
        console.log('post clicked')
    },[postClicked])

    useEffect(() => {
        const userId = userParams.id
        const searchUserAPI = async () => { }
        fetch(`http://localhost:3000/api/user/${userId}`, { credentials: 'include', mode: 'cors', })
            .then((res) => {
                return res.json()
            })
            .then(async (res) => {
                console.log('userInfo fetched')
                console.log(res)
                setUserInfo(res)
                return res
            })
            .then((res) => {
                const userId = res._id
                if (userInfoContext.user?.following?.includes(userId)) {
                    setFollowedByMe(true)
                }
                return res
            })
            .then((user) => {
                return fetch(`http://localhost:3000/api/posts/${user.username}`, { credentials: 'include', mode: 'cors', })
            }).then((res) => {
                return res.json()
            }).then((res) => {
                setPosts(res)
            })
            .catch((err) => {
                console.log(userInfo.username)
                userInfoContext && userInfoContext.signOut()
                console.log(err)
            })

        return () => {

        }
    }, [])


    function editProfile() {
        navigate('/accounts/edit')
    }

    async function follow() {
        if (userInfo.username) {
            Axios.post('http://localhost:3000/api/login', {
                username: userInfo.username && userInfo.username
            }, { withCredentials: true })
            .then(()=>{
                setFollowedByMe(true)
            })
        }
    }

    async function unFollow() {
        return
    }


    useEffect(()=>{
        if (postClicked.username) {
            console.log(postClicked)
            console.log('post updated', posts)
            return setTogglePostModal(!togglePostModal)
        }
        console.log('post updated', posts)
    },[postClicked])





    return <div className={className}>
        <section className='userDetails'>
            <div className='usersDetailsChild__profilePic__container'>
                {userInfo.media ?
                    <img className='profilePic' src={`${serverUrl}/${userInfo.media}`} /> :
                    <img className='profilePic' src={`http://localhost:3000/uploads/search-grey-1.png`} />
                }
            </div>
            <div className=''>
                <div>
                    <h1>{userInfo.username}</h1>
                    {(userInfoContext?.user?.username !== userInfo.username) && (!followedByMe) &&
                        <input type='submit' value='Follow' onClick={() => { follow() }} />
                    }
                    {(userInfoContext?.user?.username !== userInfo.username) && (followedByMe) &&
                        <input type='submit' value='Unfollow' onClick={() => { unFollow() }} />
                    }
                    {(userInfoContext?.user?.username === userInfo.username) &&
                        <input type='submit' value='Edit Profile' onClick={() => { editProfile() }} />
                    }
                </div>
                <div>
                    <h2>posts: {posts.length}</h2>
                    <h2>Following: {userInfo.following.length}</h2>
                </div>

            </div>

        </section>
        {posts ? <section className='grid'>
            {posts.map((post) => {
                return <Post post={post} setPostClicked={()=>{memoSetPostClicked(post)}}
                      postContext='user' className='' sizeModal={true}></Post>
            })
            }</section> :
            <div>no posts yet</div>
        }

        {(postClicked.username && togglePostModal) && <PostModal post={postClicked} toggle={()=>{setTogglePostModal(!togglePostModal)}} className='d'/>}


    </div>
}

export default styled(User)`
    height: 100vh;
    .grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;
        column-gap: 10px;
        row-gap: 10px;
        width: 80%;
        margin: auto;
        justify-items: strech;
        align-items: strech;

        

    }

    .userDetails {
        width: 80%;
        margin: auto;
    }

    .profilePic {
        border-radius: 20px;
        width: 15.625rem;
        height: 15.625rem;
    }
`