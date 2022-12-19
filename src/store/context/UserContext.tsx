import { AxiosResponse } from "axios";
import { sign } from "crypto";
import { createContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setFlagsFromString } from "v8";
import { UserInterface } from '../../interfaces/interfaces'
import { UserStore } from '../../interfaces/interfaces'

const userInfoUrl = 'http://localhost:3000/api/user-info'



export const UserContext = createContext<UserStore>({
  signOut: () => {
    return
  }, updateUser: (user, location) => { return }
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

  const updateUser = async (user: UserInterface, location: string) => {
    localStorage.setItem('user', JSON.stringify(user))
    setUser(user)
  }

  useEffect(() => {
    setLoading(true)
    if (user) {
      setLoading(false)
      return
    }
    if (location.pathname !== '/login') {
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
    else {
      navigate('/register')
    }
   


  }, [user])

  useEffect(() => {
    if (loading) return
    if (user?.username === '' && location.pathname !== '/login') {
      console.log('gets in if ************')
      // signOut()
    }
  }, [location, loading, user])

  return (
    <UserContext.Provider value={{ user, signOut, updateUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider

