<template>
    <div class="auth-container">
        <div class="logo-wrapper">
            <div class="logo-name">
                <h2>Tasks</h2>
            </div>
            <img src="/src/assets/logo.svg" alt="logo" class="logo">
        </div>
        <n-tabs default-value="signin" size="large" justify-content="space-evenly">
            <n-tab-pane name="signin" tab="Вход">
                <n-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
                    <n-form-item-row label="E-mail" path="email">
                        <n-input placeholder="example@mail.ru" v-model:value="loginForm.email" @keydown.enter.prevent />
                    </n-form-item-row>
                    <n-form-item-row label="Пароль" path="password">
                        <n-input placeholder="Введите пароль" v-model:value="loginForm.password" type="password"
                            @keydown.enter.prevent />
                    </n-form-item-row>
                    <n-button type="primary" attr-type="submit" block secondary strong :loading="authStore.loading"
                        @click="handleLogin">
                        {{ authStore.loading ? 'Вход...' : 'Войти' }}
                    </n-button>
                </n-form>
            </n-tab-pane>
            <n-tab-pane name="signup" tab="Регистрация">
                <n-form ref="registerFormRef" :model="registerForm" :rules="registerRules">
                    <n-form-item-row label="E-mail" path="email">
                        <n-input placeholder="example@mail.ru" v-model:value="registerForm.email" />
                    </n-form-item-row>
                    <n-form-item-row label="Пароль" path="password">
                        <n-input placeholder="Введите пароль" v-model:value="registerForm.password" type="password" />
                    </n-form-item-row>
                    <n-form-item-row label="Повторите пароль" path="reenteredPassword">
                        <n-input placeholder="Введите пароль повторно" v-model:value="registerForm.reenteredPassword"
                            type="password" />
                    </n-form-item-row>
                    <n-button type="primary" attr-type="submit" :loading="authStore.loading" block secondary strong
                        @click="handleRegister">
                        {{ authStore.loading ? 'Регистрация...' : 'Зарегистрироваться' }}
                    </n-button>
                </n-form>
            </n-tab-pane>
        </n-tabs>
    </div>
</template>

<script lang="ts">
import { NTabs, NTabPane, NForm, NFormItemRow, NInput, NButton } from 'naive-ui'
import type { FormRules } from 'naive-ui'
import { defineComponent } from 'vue';
import { useAuthStore } from '@/stores/auth.store'

export default defineComponent({
    name: 'AuthPage',
    components: {
        NTabs,
        NTabPane,
        NForm,
        NFormItemRow,
        NInput,
        NButton
    },
    setup() {
        const authStore = useAuthStore()
        return { authStore }
    },
    data() {
        return {
            loginForm: {
                email: '',
                password: ''
            },
            registerForm: {
                email: '',
                password: '',
                reenteredPassword: ''
            }
        }
    },
    computed: {
        loginRules(): FormRules {
            return {
                email: [
                    { required: true, message: 'Введите email', trigger: 'blur' },
                    { type: 'email', message: 'Неверный формат email', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: 'Введите пароль', trigger: 'blur' },
                    { min: 6, message: 'Пароль должен содержать минимум 6 символов', trigger: 'blur' },
                    { 
                        validator: () => { 
                            const value = this.loginForm.password
                            if (value && !/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]+$/.test(value)) {
                                return new Error('Пароль должен быть написан латиницей')
                            }
                            return true
                        },
                        trigger: 'blur' 
                    }
                ]
            }
        },
        registerRules(): FormRules {
            const validatePasswordMatch = (_: any, value: string) => {
                if (value !== this.registerForm.password) {
                    return new Error('Пароли не совпадают')
                }
                return true
            }

            return {
                email: [
                    { required: true, message: 'Введите email', trigger: 'blur' },
                    { type: 'email', message: 'Неверный формат email', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: 'Введите пароль', trigger: 'blur' },
                    { min: 6, message: 'Пароль должен содержать минимум 6 символов', trigger: 'blur' },
                    { 
                        validator: () => { 
                            const value = this.registerForm.password
                            if (value && !/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]+$/.test(value)) {
                                return new Error('Пароль должен быть написан латиницей')
                            }
                            return true
                        },
                        trigger: 'blur' 
                    }
                ],
                reenteredPassword: [
                    { required: true, message: 'Повторите пароль', trigger: 'blur' },
                    { validator: validatePasswordMatch, message: 'Пароли должны совпадать', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        async handleLogin() {
            if (!this.loginForm.email || !this.loginForm.password) {
                console.log('Заполните все поля')
                return
            }

            const success = await this.authStore.login(this.loginForm.email, this.loginForm.password)

            if (success) {
                this.$router.push('/tasks')
                console.log('Пользователь авторизован')
            } else {
                console.log('Ошибка при входе')
            }
        },
        async handleRegister() {
            if (!this.registerForm.email || !this.registerForm.password || !this.registerForm.reenteredPassword) {
                console.log('Заполните все поля')
                return
            }

            if (this.registerForm.password !== this.registerForm.reenteredPassword) {
                alert("Пароли не совпадают")
                return
            }

            const success = await this.authStore.registration(this.registerForm.email, this.registerForm.password)

            if (success) {
                this.$router.push('/tasks')
                console.log('Пользователь зарегистрирован')
            } else {
                console.log('Ошибка при регистрации')
            }
        }
    }
})
</script>

<style scoped>
.auth-container {
    margin: 0 auto;
    margin-top: 5%;

    @media (min-width: 900px) {
        width: 800px;
    }
}

.logo-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 50px;
}

.logo {
    width: 100px;
    height: 100px;
    margin-left: 30px;
}

.logo-name {
    font-size: 70px;
}
</style>