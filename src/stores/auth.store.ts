import { defineStore } from 'pinia'
import { authService } from '@/services/auth.service'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as any, 
        token: null as string | null,
        loading: false
    }),

    getters: {
        isAdmin: (state) => state.user?.role === 'ADMIN'
    },

    actions: {
        setToken(newToken: string){
            this.token = newToken;
            console.log('Токен сохранен:', newToken)
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

                console.log('Успешный вход: ', response.user)

                return true
            } catch (error: any){
                console.log('Ошибка входа: ', error?.response?.data || error)

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

                console.log('Успешная регистрация:', this.user)

                return true

            } catch (error: any) {
                console.log('Ошибка регистрации:', error?.response?.data || error)
                return false
            } finally {
                this.setLoading(false)
            }
        },
        checkAuth(){
            const token = localStorage.getItem('token')

            if (token){
                this.token = token
                 // TODO: позже получим реальные данные пользователя по токену
                this.user = { id: 1, email: 'user@example.com', role: 'USER' }

                return true
            } else {
                console.log('нет токена')

                return false
            }
        },
        logout() {
            this.user = null
            this.token = null
            localStorage.removeItem('token')
            console.log('Выход выполнен')
        },
    }
    
})