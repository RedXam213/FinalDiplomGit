import axios from "axios"

const $host = axios.create({
    baseURL : import.meta.env.VITE_REACT_APP_API_URL
})

const $authHost = axios.create({
    baseURL : import.meta.env.VITE_REACT_APP_API_URL
})


$authHost.interceptors.request.use(config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

export {
    $host,
    $authHost
}