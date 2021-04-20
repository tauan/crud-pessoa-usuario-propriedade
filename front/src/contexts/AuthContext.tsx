import { createContext, ReactNode, useState } from 'react'
import Cookies from 'js-cookie'
import {useRouter} from 'next/router'



interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = createContext({})

export const AuthProvider = ({children}: AuthProviderProps) => {
    const router = useRouter()
    const [loged, setLoged] = useState(false)
    const logout = () => {
        Cookies.remove("loged")
        Cookies.remove("user")
        setLoged(false)
        router.push('/')
    }

    return (
        <AuthContext.Provider value={{loged, setLoged, logout}}>
            {children}
        </AuthContext.Provider>
    )
}
