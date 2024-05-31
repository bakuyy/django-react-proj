// be a wrapper for a protected route (we need an authorization token before we can access this route)

import {Navigate} from "react-router-dom"
import {jwtDecode} from "jwt-decode"
import api from "../api"
import {REFRESH_TOKEN, ACCESS_TOKEN} from "../constants"
import { useState, useEffect } from "react"


function ProtectedRoute({children}){
 // check if someone is authorized to view this route, otherwise redirect them

    const [isAuthorized, setIsAuthorized] = useState(null)
    useEffect(()=>{ // as soon as we load an protected route, call the auth function and set auth = true
        auth().catch(()=>setIsAuthorized(false))
    }, [])

    const refreshToken = async () =>{
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try {
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken,
            })
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
            
        } catch (error){
            console.log(error, "Error")
            setIsAuthorized(false)
        }

    }

    const auth = async () =>{// check access token, check if its expired -- if expired, it will automatically refresh
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token) {
            setIsAuthorized(false)
            return 
        }

        const decoded = jwtDecode(token) // auto decodes the value/expiration date
        const tokenExpiration = decoded.exp
        const now = Date.now() / 1000

        if (tokenExpiration < now) {
            await refreshToken()

        } else {
            setIsAuthorized(true)
        }

    }

    if (isAuthorized ===null) {
        return <div>Loading...</div> // until isAuthorized has a state, we are checking/or processing the state

    }  
    return isAuthorized? children:<Navigate to="login"/>

}

export default ProtectedRoute