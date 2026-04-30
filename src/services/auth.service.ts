import type { LoginDto, RegisterDto, AuthResponseDto, UserDto } from '@/api/Api'
import { apiClient, publicApiClient } from './apiClient'

export const authService = {
    async login(email: string, password: string): Promise<AuthResponseDto> {
        const data: LoginDto = { email, password }
        const response = await publicApiClient.api.authLoginCreate(data)
        return response.data
    },

    async register(email: string, password: string): Promise<AuthResponseDto> {
        const data: RegisterDto = { email, password }
        const response = await publicApiClient.api.authRegisterCreate(data)
        return response.data
    },

    async getMe(): Promise<UserDto>{
        const response = await apiClient.api.authMeList()
        return response.data
    }
} 