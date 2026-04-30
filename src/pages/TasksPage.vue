<template>
    <div v-if="tasksStore.error" class="error-message">
        {{ tasksStore.error }}
    </div>
    <n-spin :show="tasksStore.loading" description="Загрузка...">
        <div class="page-header">
            <h3>Задачи</h3>
            <n-button strong secondary round type="info" @click="showAddTaskModal">Добавить задачу +</n-button>
        </div>
        <FiltersPanel :filterStatus="filterStatus" :filterProjectId="filterProjectId"
            :projects="projectStore.projects" @update:filter-status="onStatusFilterChange"
            @update:filter-project-id="onProjectFilterChange" />

        <div class="empty-state" v-if="tasksStore.tasks.length === 0">
            <h2>Нет задач</h2>
            <p class="empty-state-hint">Создайте первую задачу, нажав кнопку выше</p>
        </div>
        <div class="tasks-wrapper">
            <TaskCard v-for="task in tasksStore.tasks" :key="task.id" :task="task" @delete-task="deleteTaskFromArr"
                @update-task="updateTaskFromArr">
            </TaskCard>
        </div>

        <div ref="sentinel" class="sentinel"></div>
    </n-spin>

    <AddtaskModal :isOpen="openAddTaskModal" :projects="projectStore.projects" @update:show="openAddTaskModal = $event"
        @save-new-task="createNewTask"></AddtaskModal>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { TaskStatusDto, type CreateTaskDto } from '@/api/Api'
import TaskCard from '@/components/task.vue'
import { useTasksStore } from '@/stores/tasks.store'
import { useProjectStore } from '@/stores/projects.store'
import { useDialog, NButton, NSpin } from 'naive-ui'
import AddtaskModal from '@/components/addtaskModal.vue'
import FiltersPanel from '@/components/FiltersPanel.vue'


export default defineComponent({
    components: { TaskCard, NButton, AddtaskModal, FiltersPanel, NSpin },

    setup() {
        const tasksStore = useTasksStore()
        const projectStore = useProjectStore()
        const dialog = useDialog()
        return { tasksStore, projectStore, dialog }
    },

    mounted() {
        this.tasksStore.fetchTasks()
        this.projectStore.fetchProjects()
        this.sentinelObserver = new IntersectionObserver((entries) => {
            if (entries[0]?.isIntersecting && this.tasksStore.hasMore && !this.tasksStore.loading) {
                this.tasksStore.getMoreTasks()
            }
        })
        this.sentinelObserver.observe(this.$refs.sentinel as Element)
    },
    beforeUnmount() {
        this.sentinelObserver?.disconnect()
    },

    data() {
        return {
            filterStatus: '',
            filterProjectId: '',
            openAddTaskModal: false,
            sentinelObserver: null as IntersectionObserver | null
        }
    },

    watch: {
        filterStatus(val) {
            this.tasksStore.fetchTasks(val || undefined, this.filterProjectId || undefined)
        },
        filterProjectId(val) {
            this.tasksStore.fetchTasks(this.filterStatus || undefined, val || undefined)
        }
    },

    methods: {
        onStatusFilterChange(val: string) {
            this.filterStatus = val
        },
        onProjectFilterChange(val: string) {
            this.filterProjectId = val
        },
        deleteTaskFromArr(id: string) {
            this.dialog.error({
                title: 'Подтверждение удаления',
                content: 'Вы уверены, что хотите удалить эту задачу?',
                positiveText: 'Удалить',
                negativeText: 'Отмена',
                onPositiveClick: async () => {
                    await this.tasksStore.deleteTask(id)
                }
            })
        },
        updateTaskFromArr(task: any) {
            const oldTask = this.tasksStore.tasks.find((t: any) => t.id === task.id)
            if (!oldTask) return

            if (oldTask.status !== task.status) {
                this.tasksStore.updateTaskStatus(task.id, task.status)
            }

            if (oldTask.title !== task.title || oldTask.description !== task.description || oldTask.projectId !== task.projectId) {
                this.tasksStore.updateTask(task.id, {
                    title: task.title,
                    description: task.description,
                    projectId: task.projectId
                })
            }
        },
        showAddTaskModal() {
            this.openAddTaskModal = true
        },
        createNewTask(newTask: CreateTaskDto) {
            this.tasksStore.createTask(newTask);
            this.openAddTaskModal = false

        }

    }
})
</script>

<style scoped>
.page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}

.tasks-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.filter_and_btn {
    display: flex;
    justify-content: space-between;
}

.sentinel {
    height: 1px;
}

.empty-state {
    text-align: center;
    margin-top: 60px;
    color: #999;
}

.empty-state h2 {
    font-weight: 500;
    margin-bottom: 8px;
    color: #999;
}

.empty-state-hint {
    font-size: 14px;
    color: #bbb;
}
</style>