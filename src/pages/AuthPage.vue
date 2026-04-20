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
                <n-form @submit.prevent="handleLogin">
                    <n-form-item-row label="E-mail" path="email">
                        <n-input placeholder="expample@mail.ru" v-model:value="loginEmail" @keydown.enter.prevent />
                    </n-form-item-row>
                    <n-form-item-row label="Пароль" path="password">
                        <n-input placeholder="Введите пароль" v-model:value="loginPassword" type="password"
                            @keydown.enter.prevent />
                    </n-form-item-row>
                    <n-button type="primary" attr-type="submit" block secondary strong :loading="authStore.loading">
                        {{ authStore.loading ? 'Вход...' : 'Войти' }}
                    </n-button>
                </n-form>
            </n-tab-pane>
            <n-tab-pane name="signup" tab="Регистрация">
                <n-form @submit.prevent="handleRegister">
                    <n-form-item-row label="E-mail" path="email">
                        <n-input placeholder="expample@mail.ru" v-model:value="registerEmail" />
                    </n-form-item-row>
                    <n-form-item-row label="Пароль">
                        <n-input placeholder="Введите пароль" v-model:value="registerPassword" type="password" />
                    </n-form-item-row>
                    <n-form-item-row label="Повторите пароль" path="reenteredPassword">
                        <n-input placeholder="Введите пароль повторно" v-model:value="registerPasswordRepeated"
                            type="password" />
                    </n-form-item-row>
                    <n-button type="primary" attr-type="submit" :loading="authStore.loading" block secondary strong>
                        {{ authStore.loading ? 'Регистрация...' : 'Зарегистрироваться' }}
                    </n-button>
                </n-form>
            </n-tab-pane>
        </n-tabs>
    </div>
</template>

<script lang="ts">
import { NTabs, NTabPane, NForm, NFormItemRow, NInput, NButton } from 'naive-ui'
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
        return { authStore }  // authStore доступен в this
    },
    data() {
        return {
            loginEmail: '',
            loginPassword: '',
            registerEmail: '',
            registerPassword: '',
            registerPasswordRepeated: ''
        }
    },
    methods: {
        async handleLogin() {
            const success = await this.authStore.login(this.loginEmail, this.loginPassword)

            if (success) {
                this.$router.push('/tasks')
                console.log('Пользователь авторизован')
            } else {
                console.log('Ошибка при входе')
            }

        },
        async handleRegister() {
            if (this.registerPassword === this.registerPasswordRepeated) {
                const success = await this.authStore.registration(this.registerEmail, this.registerPassword)
                if (success) {
                    this.$router.push('/tasks')
                    console.log('Пользователь зарегистрирован')
                } else {
                    console.log('Ошибка при регистрации')
                }
            } else {
                alert("Пароли не совпадают")
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