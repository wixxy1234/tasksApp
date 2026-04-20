<template>

    <div class="loading" v-if="tasksStore.loading">Загрузка</div>

    <div v-else-if="tasksStore.error" style="color: red;">
        {{ tasksStore.error }}
    </div>

    <div class="tasks-wrapper">
        <TaskCard v-for="task in tasksStore.tasks" :key="task.id" :task="task" @delete-task="deleteTaskFromArr">
        </TaskCard>
    </div>
</template>

<script lang="ts">
import TaskCard from '@/components/task.vue'
import { useTasksStore } from '@/stores/tasks.store';
import { useDialog } from 'naive-ui';
import { defineComponent, onMounted } from 'vue';


export default defineComponent({
    components: { TaskCard },
    setup() {
        const tasksStore = useTasksStore()
         const dialog = useDialog() 

        onMounted(() => {
            tasksStore.fetchTasks()
        })

        return { tasksStore, dialog }
    },
    methods: {
        deleteTaskFromArr(id: string) {
            // Вместо прямого удаления — показываем диалог
            this.dialog.error({
                title: 'Подтверждение удаления',
                content: 'Вы уверены, что хотите удалить эту задачу',
                positiveText: 'Удалить',
                negativeText: 'Отмена',
                onPositiveClick: async () => {
                    await this.tasksStore.deleteTask(id)
                    this.dialog.success({
                        title: 'Успешно',
                        content: 'Задача удалена',
                    })
                }
            })
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
</style>