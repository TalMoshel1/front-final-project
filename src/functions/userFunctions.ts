import Axios from 'axios'
import { UserInterface } from '../interfaces/interfaces'
// import {User} from '../interfaces/interfaces'
// import { useParams } from 'react-router-dom'
// const userParams = useParams()


// export async function follow(userInfo) {
//     if (userInfo.username) {
//         Axios.post('http://localhost:4000/api/login', {
//             username: userInfo.username && userInfo.username
//         }, { withCredentials: true })
//         .then(()=>{
//             setFollowedByMe(true)
//         })
//     }
// }

// export async function unFollow(userInfo: User, userParams:  Readonly<Params<string>>) {
//     if (userInfo.username) {
//         const userId = userParams.id
//         Axios.post('http://localhost:4000/api/users/unfollow', {
//             id: userId }, { withCredentials: true })
//         }
//         return
// }


export async function setDataSuggestions() {
  return fetch('http://localhost:4000/api/suggestions/feed', { credentials: 'include' })
}

export const x = '1'




export async function follow(idToFollow: string) {
  if (idToFollow) {
    console.log(idToFollow)
    return Axios.post('http://localhost:4000/api/users/follow', {
      id: idToFollow
    }, { withCredentials: true })
    .then(()=>{
        window.location.reload()
    })
  }
}

export async function unFollow(idToUnFollow: string) {
  if (idToUnFollow) {
    Axios.post('http://localhost:4000/api/users/unfollow', {
      id: idToUnFollow
    }, { withCredentials: true })
    .then(()=>{
        window.location.reload()
    })
  }
}

