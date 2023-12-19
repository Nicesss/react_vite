import axios from 'axios'

const service = axios.create({
    // baseURL: '',
    timeout: 30 * 1000,
    // 请求是否携带cookie
    withCredentials: true
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        // const token = getToken()
        // const userId = getUserId()
        // if (token && userId) {
        //     config.headers['X-User-Id'] = userId
        //     config.headers['X-Auth-Token'] = token
        // }
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response.data)
        }
        return Promise.reject(response)
    },
    err => {
        return Promise.reject(err)
    }
)

export default service