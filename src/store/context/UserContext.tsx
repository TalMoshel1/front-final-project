import { sign } from "crypto";
import { createContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type UserStore = {
  user?: {
    _id?: string;
    username?: string;
    media?: string;
    following?: string[];
  },
  signOut: () => void
}
const userInfoUrl = 'http://localhost:3000/api/user-info'

const getUserFromStorage = (): User | undefined => {
    try {
        const storageUser = localStorage.getItem("user")
        if( !storageUser) {
            return 
        }
        const user = JSON.parse(storageUser) as User
        return user
    } catch (err) {
        console.log(err)
    }
}
type User = {
  username?: string;
  media?: string;
  following?: [];
}
export const UserContext = createContext<UserStore>({signOut: () => {
  return 
}})

const UserProvider = ({children}: {children: React.ReactElement | React.ReactElement[]}) => {
    const [user, setUser] = useState<User | undefined>(getUserFromStorage())
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate() // redirect to other components
    const location = useLocation() // react router hook
    const signOut = () => {
      localStorage.removeItem('user')
      setUser(undefined)
      navigate('/login')
    }
    useEffect(()=>{
        if(user) {
          console.log(user)
            return
        }
        setLoading(true)
        fetch(userInfoUrl, {credentials: 'include'}).then(async res=>{
          if(res.status!==200){
            signOut()
            return
          }
          const data = await res.json()
          setUser(data)
          localStorage.setItem("user", JSON.stringify(data))
          navigate('/feed')
        }).catch(err=>{
          signOut()
        }).finally(()=>{
          setLoading(false)
        })
      },[])

      useEffect(()=>{
        if(loading) return
        if (!user && location.pathname !== '/login') {
          signOut()
        }
      },[location, loading])
      
    return (
        <UserContext.Provider value={{user, signOut}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider

