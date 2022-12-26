import { AxiosResponse } from "axios";
import { sign } from "crypto";
import { type } from "os";
import { createContext, useState, useEffect, useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setFlagsFromString } from "v8";
import { UserInterface } from '../../interfaces/interfaces'
import { UserStore } from '../../interfaces/interfaces'

const userInfoUrl = 'http://localhost:4000/api/user-info'


export const UserContext = createContext<UserStore>({
  signOut: () => {
    return
  }, updateUser: (user, location) => { return },
})

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
  export let USER = getUserFromStorage()

  export function userReducer(state: undefined | UserInterface, action: {type:string, payload?: UserInterface}) {
    switch(action?.type){
        case 'deleteUser':
            localStorage.removeItem('user')
            USER = undefined
            // console.log(USER)
            return undefined
        case 'updateUser':
            localStorage.setItem('user', JSON.stringify(action.payload))
            USER = action.payload
            console.log(action.payload)
            // console.log('why is that run')
            return action.payload
        default:
            // console.log(state)
            return state
    }   
  }

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
  const [state, dispatch]= useReducer(userReducer, USER)




  const signOut = () => {
    localStorage.removeItem('user')
    setUser(undefined)
  }

  const updateUser = async (user: UserInterface, location: string) => {
    localStorage.setItem('user', JSON.stringify(user))
    setUser(user)
    navigate(`/${location}`)
  }

  useEffect(() => {
    setLoading(true)
    if (USER) {
      setLoading(false)
      return
    }
    if (location.pathname !== '/login') {
      fetch(userInfoUrl, { credentials: 'include' })
      .then(async res => {
        if (res.status !== 200) {
            dispatch({type: 'deleteUser'})
        //   signOut()
          navigate('/register')
          return
        }
        const data = await res.json()
        // console.log(data)
        // setUser(data)
        // localStorage.setItem("user", JSON.stringify(data))
        dispatch({type:'updateUser', payload: data})
        console.log(state)
      }).catch(err => {
        console.log('catch')
        console.log(err)
        dispatch({type:'removeUser'})
        navigate('/register')
      }).finally(() => {
        setLoading(false)
      })
    }
    else {
      navigate('/register')
    }
   


  }, [USER])

  useEffect(() => {
    if (loading) return
    if (USER?.username === '' && location.pathname !== '/login') {
      // signOut()
    }
  }, [location, loading, USER])

  return (
    <UserContext.Provider value={{ user, signOut, updateUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider


/* 
hey,
I have a UserContext component. it return an <Provider value={{ user, signOut, updateUser }}>


 (user is an object witch has type of UserInterface:

`    _id?: string;
    fullname?: string;
    following?: string[];
    username?: string;
    password?: string
    media?: string;
    email?: string;
    tokenCreatedAt?: any;
    created?: Date;
    __v?: any;`


|| undefined.

signOut and updateUser are functions witch using the setUser function hook and removing and setting 'user' in localStorage.

the scenerio thats leads to the problem:

after the user signout(), and login(data) again from the Login component I navigate the user to Feed component, the logic in UserContext updating the user, which I guess need to deliver a new user inside Provider --> <Provider value={{ user: NewUser, signOut, updateUser }}>
I export the component of UserContext and import it in Navbar, in the latter I use "useContext" hook likt that :
const {user} = useContext(UserContext), wrote a useEffect which has its dependancy list contains user and in the arrow function I console log the new user, but it doesnt. 
Navbar Component being rendered all the time, before the user clicks on login():
```
    <UserProvider>
      <Header /> ******** Navbar sits under Header ********
      <Suspense>
      <Outlet></Outlet> ***** Feed sits here under Outlet *****

      </Suspense>
    </UserProvider>
```
I think the reason for this to happen, is that the object that being changed from undefined to the UserInterface type with values, is a nested object inside the contextProvider:
<Provider value={{ user<undefined|UserInterface>, signOut, updateUser }}>

I tried to use memoization for that but failed. I wrote window.location.reload everytime it git new user and I ended up in infinteLoop. 
and also thought about using usereducer but didnt understood yet how to use it in this case.


*/