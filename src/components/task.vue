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
                <n-button size="small" class="card-btn" @click="openEditModal">Редакт.</n-button>
                <n-button size="small" type="error" class="card-btn" @click="deleteTask">Удалить</n-button>
            </div>
        </template>
    </n-card>

  
    <EditTaskModal
        :show="showEditModal"
        :task="task"
        @update:show="showEditModal = $event"
        @save="saveTask"
    />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NCard, NButton, useMessage } from 'naive-ui'
import type { TaskDto } from '@/api/Api'
import EditTaskModal from './editTaskModal.vue'

export default defineComponent({
    name: "TaskCard",
    components: { NCard, NButton, EditTaskModal },
    props: {
        task: {
            type: Object as () => TaskDto,
            required: true
        }
    },
    emits: ['deleteTask', 'update-task'],
    data() {
        return {
            showEditModal: false
        }
    },
    methods: {
        deleteTask() {
            const idTask = this.task.id
            this.$emit('deleteTask', idTask)
        },
        getStatusText(status: string) {
            const statusMap: Record<string, string> = {
                Todo: 'К выполнению',
                InProgress: 'В работе',
                Done: 'Выполнено'
            }
            return statusMap[status] || status
        },
        openEditModal() {
            this.showEditModal = true
        },
        saveTask(formData: any) {
            this.$emit('update-task', { ...this.task, ...formData })
            this.showEditModal = false
        },
    },
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

.status-Todo {
    background-color: #f0f0f0;
    color: #666;
}

.status-InProgress {
    background-color: #e6f7ff;
    color: #1890ff;
}

.status-Done {
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