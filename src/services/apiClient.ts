import { Api } from '@/api/Api'

function getToken(): string | null {
    return localStorage.getItem('token')
}

function securityWorker() {
    const token = getToken()
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {}
}

export const apiClient = new Api({ baseURL: '', securityWorker })
export const publicApiClient = new Api({ baseURL: '' })
