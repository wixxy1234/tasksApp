<template>

    <div class="loading" v-if="tasksStore.loading">Загрузка</div>

    <div v-else-if="tasksStore.error" style="color: red;">
        {{ tasksStore.error }}
    </div>
    <div class="filter_and_btn">
        <n-select v-model:value="filterStatus" :options="filterOptions" style="width: 200px; margin-bottom: 20px;" />
        <n-button strong secondary round type="info" @click="showAddTaskModal">Добавить задачу +</n-button>
    </div>

    <div class="emptyTask" v-if="filteredTasks.length === 0">
        <h2>Нет задач</h2>
    </div>
    <div class="tasks-wrapper">
        <TaskCard v-for="task in filteredTasks" :key="task.id" :task="task" @delete-task="deleteTaskFromArr"
            @update-task="updateTaskFromArr">
        </TaskCard>
    </div>

    <AddtaskModal :isOpen="openAddTaskModal" @update:show="openAddTaskModal = $event" @save-new-task="createNewTask"></AddtaskModal>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { TaskStatusDto, type CreateTaskDto } from '@/api/Api'
import TaskCard from '@/components/task.vue'
import { useTasksStore } from '@/stores/tasks.store'
import { NSelect, useDialog, NButton } from 'naive-ui'
import AddtaskModal from '@/components/addtaskModal.vue'


export default defineComponent({
    components: { TaskCard, NSelect, NButton, AddtaskModal },

    setup() {
        const tasksStore = useTasksStore()
        const dialog = useDialog()
        return { tasksStore, dialog }
    },

    mounted() {
        this.tasksStore.fetchTasks()
    },

    data() {
        return {
            filterOptions: [
                { label: 'Все', value: '' },
                ...Object.values(TaskStatusDto).map(s => ({ label: s, value: s }))
            ],
            filterStatus: '',
            openAddTaskModal: false
        }
    },

    computed: {
        filteredTasks() {
            if (!this.filterStatus) {
                return this.tasksStore.tasks
            }
            return this.tasksStore.tasks.filter((t: any) => t.status === this.filterStatus)
        }
    },

    methods: {
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

            if (oldTask.title !== task.title || oldTask.description !== task.description) {
                this.tasksStore.updateTask(task.id, {
                    title: task.title,
                    description: task.description
                })
            }
        },
        showAddTaskModal(){
            this.openAddTaskModal = true
        },
        createNewTask(newTask: CreateTaskDto){
            this.tasksStore.createTask(newTask);
            this.openAddTaskModal = false

        }

    }
})
</script>

<style>
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
</style>