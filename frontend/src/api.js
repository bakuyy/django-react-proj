// intercepter: intercepts requests that we send, then add correct headers so we don't need to manually add it

// axios intercepter [ checks if we have access token + adds it to the request]

import axios from "axios"
import { ACCESS_TOKEN } from "./constants"

const apiUrl = "http://127.0.0.1:8000/";

const api = axios.create({
  baseURL: apiUrl,
});

api.interceptors.request.use(
    
    (config) => {
        // go in local storage and see if we have access token -- it will be added if it exists

        const token = localStorage .getItem(ACCESS_TOKEN)
        if (token) {
            config.headers.Authorization = `Bearer ${token}` // create authorization header processed by axios, starts with bearer
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api