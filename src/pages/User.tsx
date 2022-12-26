import { useContext, useEffect, useState } from "react"
import { Navigate, useParams, useNavigate } from "react-router-dom"
import Post from '../lib/components/elements/Post'
import style from 'styled-components'
import styled from "styled-components"
import { serverUrl } from '../utils/FileServerIUrl'
import { UserContext } from "../store/context/UserContext"
import Axios from 'axios'
import PostModal from "../lib/components/elements/PostModal"
import ProfilePicModal from "../lib/components/elements/ProfilePicModal"
import { ChangePropsModal } from "../lib/components/elements/changePropsModal"
import SettingsIcon from '@mui/icons-material/Settings';
import { UserInterface } from "../interfaces/interfaces"
import { follow, unFollow } from "../functions/userFunctions"

function User({ user, className }: { user?: {}, className?: string }) {
    const userParams = useParams()
    const [userInfo, setUserInfo] = useState({ username: '', media: '', following: [], _id: '' })
    const [posts, setPosts] = useState([])
    const userInfoContext = useContext(UserContext)
    const [postClicked, memoSetPostClicked] = useState({ username: '' })
    const [togglePostModal, setTogglePostModal] = useState(false)
    const [isMe, setIsMe] = useState(false)
    const navigate = useNavigate() // redirect to other components
    const [followedByMe, setFollowedByMe] = useState<boolean>(false)
    const [profilePicClicked, setProfilePicClicked] = useState(false)
    const [toggleUpdateModal, setToggleUpdateModal] = useState(false)


    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal
        const userId = userParams.id
        const searchUserAPI = async () => { }
        fetch(`http://localhost:4000/api/user/${userId}`, { signal, credentials: 'include', mode: 'cors', })
            .then((res) => {
                return res.json()
            })
            .then(async (res) => {
                setUserInfo(res)
                return res
            })
            .then((res: UserInterface) => {
                const userId = res._id||""
                if (userInfoContext.user?.following?.includes(userId)) {
                    setFollowedByMe(true)
                }
                return res
            })
            .then((user) => {
                return fetch(`http://localhost:4000/api/posts/${user.username}`, { credentials: 'include', mode: 'cors', })
            }).then((res) => {
                return res.json()
            }).then((res) => {
                console.log(res)
                setPosts(res)
            })
            .catch((err) => {
                if (err.name === 'AbortError') {
                    console.log(`request cancelled`)
                    return
                }
                console.log(userInfo.username)
                userInfoContext && userInfoContext.signOut()
                console.log(err)
            })

        return () => {
            controller.abort()
        }
    }, [userParams])


    async function toFollow() {
        if (userInfo.username) {
            const updatedUser = await follow(userInfo._id)
            userInfoContext.updateUser(updatedUser, 'feed')
            setFollowedByMe(true)
                
        }
        return
    }

    async function toUnFollow() {
        if (userInfo.username) {
            const updatedUser = await unFollow(userInfo._id)
            userInfoContext.updateUser(updatedUser, 'feed')
            setFollowedByMe(false)
        }
        return
    }


    useEffect(() => {
        if (postClicked.username) {
            return setTogglePostModal(!togglePostModal)
        }
    }, [postClicked])

    useEffect(()=>{
        console.log(postClicked)
    },[postClicked])





    return <div className={className}>
        <section className='userDetails'>
            <div className='usersDetailsChild__profilePic__edit__container'>
                {userInfo.media ?
                    <img className='profilePic' src={`${serverUrl}/${userInfo.media}`} onClick={() => { setProfilePicClicked(!profilePicClicked); }} /> :
                    <img className='profilePic' src={`http://localhost:4000/uploads/search-grey-1.png`} onClick={() => { setProfilePicClicked(!profilePicClicked); }} />
                }
                <div className='justifyContentCenter'>
                    <div className='flexRow'>
                        <h1>{userInfo.username}</h1>
                        {(userInfoContext?.user?.username !== userInfo.username) && (!followedByMe) &&
                            <input type='submit' value='Follow' onClick={toFollow} />
                        }
                        {(userInfoContext?.user?.username !== userInfo.username) && (followedByMe) &&
                            <input type='submit' value='Unfollow' onClick={toUnFollow} />
                        }
                        {(userInfoContext?.user?.username === userInfo.username) &&
                            // <input type='submit' value='Edit Profile' onClick={() => { setToggleUpdateModal(!toggleUpdateModal) }} />
                            <SettingsIcon onClick={() => { setToggleUpdateModal(!toggleUpdateModal) }}></SettingsIcon>
                        }
                    </div>
                    <div className='flexRow'>
                        <h2>posts: {posts.length}</h2>
                        <h2>Following: {userInfo.following.length}</h2>
                    </div>
                </div>

            </div>

        </section>
        {posts ? <section className='grid'>
            {posts.map((post) => {
                return <Post post={post} setPostClicked={() => { memoSetPostClicked(post) }}
                    postContext='user' className='' sizeModal={true}></Post>
            })
            }</section> :
            <div>no posts yet</div>
        }

        {(userInfo && toggleUpdateModal) && <ChangePropsModal toggle={() => setToggleUpdateModal(!toggleUpdateModal)} ></ChangePropsModal>}

        {(postClicked.username && togglePostModal) && <PostModal post={postClicked} toggle={() => { setTogglePostModal(!togglePostModal); memoSetPostClicked({ username: '' }) }} />}
        {(userInfoContext?.user?.username === userInfo.username) && profilePicClicked && <ProfilePicModal toggle={() => { setProfilePicClicked(!profilePicClicked) }} />}

    </div>
}

export default styled(User)`
    height: 100vh;
    overflow: scroll;

    .grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-auto-rows: 1fr;
        column-gap: 1px;
        row-gap: 1px;
        width: 80%;
        margin: auto;
        justify-items: strech;
        align-items: strech;
        padding: 0 0 125px 0;

    }

    .justifyContentCenter {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .flexRow {
        display: flex;
        align-items: cetner;
        gap: 3em;
    }

    .flexRow h1 {
    padding: 0px;
    margin: 0px;
    }


    .userDetails {
        width: 80%;
        margin-right: auto;
        margin-left: auto;
        margin-top: 5em;
        margin-bottom: 5em;
        max-width: 800px;
    }

    .usersDetailsChild__profilePic__edit__container {
        width: 100%;
        justify-content: space-around;
        display: flex;
        gap: 1em;
    }

    .profilePic {
        border-radius: 20px;
        width: 15.625em;
        height: 15.625em;
    }

    .userDetails{
        display: flex;
    }

    .profilePic {
        border: 1px solid black;
        border-radius: 120px ;
    }


    @media (max-width: 36.0625rem) {
        .usersDetailsChild__profilePic__edit__container {
            flex-direction: column;
            align-items: center;
}
     }


`