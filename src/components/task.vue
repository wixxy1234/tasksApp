<template>
    <n-card class="task-card" content-scrollable segmented closable @close="deleteTask">
        <div class="card-header">
            <h3 class="card-title">{{ task.title }}</h3>
            <span class="card-status" :class="`status-${task.status}`">
                {{ getStatusText(task.status) }}
            </span>
        </div>

        <p class="card-description">
            {{ task.description || 'Нет описания' }}
        </p>

        <template #footer>
            <div class="card-footer">
                <n-button size="small" class="card-btn" @click="updateTask">Редакт.</n-button>
                <n-button size="small" type="error" class="card-btn" @click="deleteTask">Удалить</n-button>
            </div>
        </template>
    </n-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NCard, NButton, useMessage } from 'naive-ui'
import type { Task } from '@/types/task.types'

export default defineComponent({
    name: "TaskCard",
    components: { NCard, NButton },
    props: {
        task: {
            type: Object as () => Task,
            required: true
        }
    },
    methods: {
        deleteTask() {
            const idTask = this.task.id
            this.$emit('deleteTask', idTask)
        },
        getStatusText(status: string) {
            const statusMap: Record<string, string> = {
                todo: 'К выполнению',
                in_progress: 'В работе',
                done: 'Выполнено'
            }
            return statusMap[status] || status
        },
        updateTask(){
            
        },
    },
    emits: ['deleteTask'],
})
</script>
<style>
.taskItem {
    max-height: 300px;
    max-width: 300px;
}

.task-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
}

.card-btn {
    margin: 0 5px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}

.card-title {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.card-status {
    font-size: 12px;
    padding: 4px 8px;
    border-radius: 12px;
    white-space: nowrap;
}

.status-todo {
    background-color: #f0f0f0;
    color: #666;
}

.status-in_progress {
    background-color: #e6f7ff;
    color: #1890ff;
}

.status-done {
    background-color: #ebfadb;
    color: #54bd20;
}

.card-description {
    margin: 20px 0;
    color: #666;
    line-height: 1.5;
    flex-grow: 1;
}

.card-footer {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
}
</style>