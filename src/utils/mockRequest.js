import axios from 'axios'

const service = axios.create({
    baseURL: '/mock',
    timeout: 20000
})

service.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.reject(error)
})

service.interceptors.response.use(response => {
    if (response.code !== 2100) {
        return Promise.reject(new Error(res.message || 'Error'))
    } else {
        return response
    }
}, error => {
    return Promise.reject(error)
})