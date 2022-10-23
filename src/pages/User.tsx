import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from ".."

// interface IUser {
//     username: string;
//     email: string;
//     following: string[]
// }


export function User({ user }: { user?: {} }) {
    const userParams = useParams()
    const [userInfo, setUserInfo] = useState({ username: '', email: '', following: [] })
    const [posts, setPosts] = useState([])
    const userInfoContext = useContext(UserContext)
    const [isUser, setIsUser] = useState(false)

    console.log(userInfoContext)
    useEffect(() => {
        const username = userParams.username
        // const searchUserAPI = async () => { }
        fetch(`http://localhost:3000/api/users/${username}`, { credentials: 'include', mode: 'cors', })
            .then((res) => {
                return res.json()
            })
            .then(async (res) => {
                await setUserInfo(res)

                return res
            })
            .then(() => {
                console.log(userInfo)
                if (userInfo.username) {
                    fetch(`http://localhost:3000/api/posts/${username}`, { credentials: 'include', mode: 'cors', })
                        .then((res) => {
                            return res.json()
                        })
                        .then((res) => {
                            setPosts(res)
                        })
                }
            })
            .catch((err) => {
                console.log(err)
            })

    }, [])

    return <div>
        {userInfo.username === userInfoContext.username ?
            <h1>{JSON.stringify(userInfo)}</h1>
            :

            <h1>Sorry, this page isn't available.\nThe link you followed may be broken, or the page may have been removed. Go back to Instagram</h1>}
    </div>
}