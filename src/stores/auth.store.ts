import { defineStore } from 'pinia'
import { authService } from '@/services/auth.service'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as any, 
        token: null as string | null,
        loading: false
    }),

    getters: {
        isAdmin: (state) => state.user?.role === 'Admin'
    },

    actions: {
        setToken(newToken: string){
            this.token = newToken;
        },
        setLoading(status: boolean) {
            this.loading = status
        },
        async login(email: string, password: string){
            this.setLoading(true);
            try {
                const response = await authService.login(email, password)

                this.token = response.token
                this.user = response.user

                if (response.token) {
                    localStorage.setItem('token', response.token)
                }

                return true
            } catch (error: any){
                return false
            } finally {
                this.setLoading(false)  
            }
        },
        async registration(email: string, password: string){
            this.setLoading(true)

            try {
                const response = await authService.register(email, password)

                this.token = response.token
                this.user = response.user

                if (response.token) {
                    localStorage.setItem('token', response.token)
                }

                return true

            } catch (error: any) {
                return false
            } finally {
                this.setLoading(false)
            }
        },
        async checkAuth() {
            const token = localStorage.getItem('token')
            if (!token) return false
            this.token = token
            try {
                const user = await authService.getMe()
                this.user = user
                return true
            } catch {
                this.logout()
                return false
            }
        },
        logout() {
            this.user = null
            this.token = null
            localStorage.removeItem('token')
        },
        
    }
    
})