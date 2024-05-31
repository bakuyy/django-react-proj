// intercepter: intercepts requests that we send, then add correct headers so we don't need to manually add it

// axios intercepter [ checks if we have access token + adds it to the request]

import axious from "axios"
import { ACCESS_TOKEN } from "./constants"

const api = axious.create({
    baseURL: import.meta.env.VITE_API_URL // import anything specified in the env file (must start with vite)
})

api.interceptors.request.use(
    (config) => {
        // go in local storage and see if we have access token -- it will be added if it exists

        const token = localStorage .getItem(ACCESS_TOKEN)
        if (token) {
            config.headers.Authorization = `Bearer ${token}` // create authorization header processed by Axious, starts with bearer
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api