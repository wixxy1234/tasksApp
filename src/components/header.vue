<template>
    <div class="nav-wrapper">
        <n-menu v-model:value="activeKey" mode="horizontal" :options="computedMenuOptions"
            @update:value="handleMenuClick" />
        <div class="avatar-wrapper">
            <n-dropdown v-if="authStore.token" :options="dropdownOptions" @select="handleDropdownSelect">
                <n-avatar :size="32" round>
                    {{ userInitial }}
                </n-avatar>
            </n-dropdown>

            <n-avatar v-else :size="32" round>
                {{ userInitial }}
            </n-avatar>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NAvatar, NDropdown, NMenu } from 'naive-ui'
import { useAuthStore } from '@/stores/auth.store';

export default defineComponent({
    name: 'Header',
    components: { NMenu, NAvatar, NDropdown },
    setup() {
        const authStore = useAuthStore()
        return { authStore }
    },
    data() {
        return {
            activeKey: null,
            baseMenuOptions: [
                {
                    label: 'Проекты',
                    key: 'projects'
                },
                {
                    label: 'Задачи',
                    key: 'tasks'
                }
            ],
            dropdownOptions: [
                { label: 'Профиль', key: 'profile' },
                { label: 'Выход', key: 'logout' }
            ]
        }
    },
    computed: {
        computedMenuOptions() {
            const options = [...this.baseMenuOptions]

            if (this.authStore.isAdmin) {
                options.push({ label: 'Аналитика', key: 'analytics' })
            }

            return options
        },
        userInitial() {
            const email = this.authStore.user?.email || 'U'
            return email.charAt(0)
        }
    },
    methods: {
        handleMenuClick(key: string) {
            this.$router.push(`/${key}`)
        },

        handleDropdownSelect(key: string) {
            if (key === 'logout') {
                this.authStore.logout()
                this.$router.push('/login')
            } else if (key === 'profile') {
                this.$router.push('/profile')
            }
        }
    }
})
</script>

<style scoped>
.nav-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgb(255, 255, 255);
    border-bottom: 2px solid #D1ECDE;
}

.avatar-wrapper {
    cursor: pointer;
    padding: 8px;
}

</style>