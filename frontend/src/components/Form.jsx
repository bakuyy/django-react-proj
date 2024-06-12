import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

//generic form component for login//register route
function Form({route, method}) { 
    //route: route on submit
    //method: register or logging in 

    const [username, setUsername] = useState("")
    const [password, setPassWord] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const handleSubmit = (e) =>{
        e.preventDefault()
    }

    const name = method === "login"?"Login":"Register"

    return <form onSubmit={handleSubmit}>
    <h1> {name}</h1>
    <input
        className="form-input"
        type="text"
        value={username}
        onChange={(e)=>{setUsername(e.target.value)}}
        placeholder="Username"
    />
    <input
    className="form-input"
    type="password"
    value={password}
    onChange={(e)=>{setPassWord(e.target.value)}}
    placeholder="Username"
    />
    <button className="form-button" type="submit">
    {name}
    </button>
    </form>
    


}