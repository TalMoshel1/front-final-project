import { AxiosResponse } from "axios";
import { sign } from "crypto";
import { type } from "os";
import { createContext, useState, useEffect, useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setFlagsFromString } from "v8";
import { UserInterface } from '../../interfaces/interfaces'
import { UserStore } from '../../interfaces/interfaces'

const userInfoUrl = `${process.env.REACT_APP_API}/api/user-info`






export const UserContext = createContext<UserStore>({
  signOut: () => {
    return
  }, updateUser: (user) => { return }
})

const UserProvider = ({ children }: { children: React.ReactElement | React.ReactElement[] }) => {

  const getUserFromStorage = (): UserInterface | undefined => {
    try {
      const storageUser = localStorage.getItem("user")
      if (!storageUser) {
        return
      }
      const user = JSON.parse(storageUser) as AxiosResponse
      return user.data
    } catch (err) {
      console.log(err)
    }
  }

  const [user, setUser] = useState<UserInterface | undefined>(getUserFromStorage())
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate() // redirect to other components
  const location = useLocation() // react router hook


  const signOut = () => {
    localStorage.removeItem('user')
    setUser(undefined)
  }

  const updateUser = async (user: UserInterface) => {
    localStorage.setItem('user', JSON.stringify(user))
    setUser(user)

  }

  useEffect(() => {
    console.log(user)
    console.log(location.pathname)
    setLoading(true)
    if (user) {
      setLoading(false)
      if (location.pathname === '/') {
        navigate('/feed')

      } else {
        navigate(location.pathname)
      }
      return
    }
    if (location.pathname !== '/login' && location.pathname !== '/register') {
      fetch(userInfoUrl, { credentials: 'include' })
      .then(async res => {
        if (res.status !== 200) {
          signOut()
          navigate('/register')
          return
        }
        const data = await res.json()
        setUser(data)
        localStorage.setItem("user", JSON.stringify(data))
      }).catch(err => {
        console.log(err)
        signOut()
      }).finally(() => {
        setLoading(false)
      })
    }

  }, [user])

//   useEffect(() => {
//     if (loading) return
//     if (user?.username === '' && location.pathname !== '/login') {
//       console.log('gets in if ************')
//       // signOut()
//     }
//   }, [location, loading, user])

  return (
    <UserContext.Provider value={{ user, signOut, updateUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider


// export const ReduceContext = createContext<UserInterface|undefined|string>(undefined)

// export let USER = getUserFromStorage()

// export function userReducer(state: undefined | UserInterface | string, action: {type:string, payload?: UserInterface | string}) {
//   switch(action?.type){
//       case 'deleteUser':
//           localStorage.removeItem('user')
//           // USER = undefined
//           return undefined
//       case 'updateUser':
//           localStorage.setItem('user', JSON.stringify(action.payload))
//           return action.payload
//       case 'login':
//           console.log('need to update the state')
//           return 'login'
//       default:
//           return state
//   }   
// }

// <ReduceContext.Provider value={state}>
// {children}
// </ReduceContext.Provider>