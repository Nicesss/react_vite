import { http } from '@/utils/request'

export const login = (data) => {
    return http.post('/api/login', data)
}