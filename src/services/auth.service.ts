import { api } from "./api";

export const authService = {
    login(email: string, password: string){
        // return api.post('/auth/login', {email, password})

        return {
        token: 'mock-token-123',
        user: { id: 1, email, role: 'USER' }
        }
    },
    async register(email: string, password: string) {
        // return api.post('/auth/register', {email, password})

        return {
            token: 'mock-token-register-123',
            user: { id: 2, email, role: 'USER' }
        }
    },
    logout(){} // cделать позже
}