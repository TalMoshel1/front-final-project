import Axios from 'axios'
import { UserInterface, UserStore } from '../interfaces/interfaces'

const userInfoUrl = `${process.env.REACT_APP_API}/api/user-info`;



export async function setDataSuggestions() {
  return fetch(`${process.env.REACT_APP_API}/api/suggestions/feed`, { credentials: 'include' })
}

export const x = '1'




export async function follow(idToFollow: string) {
  if (idToFollow) {
    return Axios.post(`${process.env.REACT_APP_API}/api/users/follow`, {
      id: idToFollow
    }, { withCredentials: true })
    .then(()=>{
        window.location.reload()
    })
  }
}

export async function unFollow(idToUnFollow: string) {
  if (idToUnFollow) {
    Axios.post(`${process.env.REACT_APP_API}/api/users/unfollow`, {
      id: idToUnFollow
    }, { withCredentials: true })
    .then(()=>{
        window.location.reload()
    })
  }
}


export function sendCookie(usercontext: UserStore) {
    fetch(userInfoUrl, { credentials: 'include' })
        .then(async res => {
            if (res.status !== 200) {
                usercontext.signOut()
              return
            }
            const data = await res.json()
            usercontext.updateUser(data)
            localStorage.setItem("user", JSON.stringify(data))
    })
}


