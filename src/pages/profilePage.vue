<template>
    <div class="profile-page">
        <div class="profile-header">
            <n-avatar :size="64" round class="profile-avatar">
                {{ userInitial }}
            </n-avatar>
            <div class="profile-info">
                <h3 class="profile-name">{{ authStore.user.email }}</h3>
                <span class="profile-role" :class="`role-${authStore.user.role}`">
                    {{ roleText }}
                </span>
            </div>
        </div>

        <div class="profile-activity">
            <div class="activity-card">
                <div class="activity-label">Создано задач</div>
                <div class="activity-statistic">{{ tasksStore.tasks.length }}</div>
                <router-link to="/tasks" class="activity-link">Перейти к задачам</router-link>
            </div>
            <div class="activity-card">
                <div class="activity-label">Создано проектов</div>
                <div class="activity-statistic">{{ projectStore.projects.length }}</div>
                <router-link to="/projects" class="activity-link">Перейти к проектам</router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { useAuthStore } from '@/stores/auth.store';
import { useProjectStore } from '@/stores/projects.store';
import { useTasksStore } from '@/stores/tasks.store';
import { NAvatar } from 'naive-ui';
import { defineComponent } from 'vue';

export default defineComponent({
    components: { NAvatar },
    setup() {
        const authStore = useAuthStore()
        const tasksStore = useTasksStore()
        const projectStore = useProjectStore()
        return { authStore, tasksStore, projectStore }
    },
    computed: {
        userInitial() {
            return this.authStore.user?.email?.charAt(0).toUpperCase() || 'U'
        },
        roleText() {
            const map: Record<string, string> = { Admin: 'Администратор', User: 'Пользователь' }
            return map[this.authStore.user?.role] || this.authStore.user?.role
        }
    },
    mounted() {
        this.tasksStore.fetchTasks()
        this.projectStore.fetchProjects()
    }
})
</script>

<style scoped>
.profile-page {
    max-width: 600px;
    margin: 40px auto 0;
}

.profile-header {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 40px;
}

.profile-avatar {
    background-color: #D1ECDE;
    color: #333;
    font-size: 24px;
    font-weight: 600;
}

.profile-info {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.profile-name {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
}

.profile-role {
    font-size: 12px;
    padding: 4px 10px;
    border-radius: 12px;
    width: fit-content;
    white-space: nowrap;
}

.role-Admin {
    background-color: #e6f7ff;
    color: #1890ff;
}

.role-User {
    background-color: #f0f0f0;
    color: #666;
}

.profile-activity {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
}

@media (min-width: 768px) {
    .profile-activity {
        grid-template-columns: repeat(2, 1fr);
    }
}

.activity-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 24px 16px;
    border: 1px solid #e8e8e8;
    border-radius: 12px;
    transition: transform 0.2s, box-shadow 0.2s;
}

.activity-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
}

.activity-label {
    font-size: 14px;
    color: #666;
}

.activity-statistic {
    font-size: 28px;
    font-weight: 600;
}

.activity-link {
    font-size: 13px;
    color: #1890ff;
    text-decoration: none;
    margin-top: 4px;
}

.activity-link:hover {
    text-decoration: underline;
}
</style>