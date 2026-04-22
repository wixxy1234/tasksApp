import type { TaskDto, CreateTaskDto, UpdateTaskDto, TaskStatusDto } from "@/api/Api";
import { defineStore } from "pinia";
import { taskService } from "@/services/tasks.service";


export const useTasksStore = defineStore('tasks', {
    state: () => ({
        tasks: [] as TaskDto[],
        loading: false,
        error: null as string | null,
        filterStatus: '' as string
    }),

    actions: {
        async fetchTasks(){
            this.loading = true
            this.error = null

            try {
                const response = await taskService.getTasks()
                this.tasks = response.items || []
            } catch (error: any) {
                console.error(error)
                this.error = error?.response?.data || 'Ошибка при загрузке задач'
            } finally {
                this.loading = false
            }
        },

        async createTask(taskData: CreateTaskDto){
            this.loading = true
            this.error = null

            try {
                const newTask = await taskService.createTask(taskData)
                this.tasks.push(newTask)
            } catch (error: any){
                console.error(error)
                this.error = error?.response?.data || 'Ошибка при создании задачи'
            } finally {
                this.loading = false
            }
        },

        async updateTask (id: string, data: UpdateTaskDto){
            this.loading = true
            this.error = null

            try {
                const updatedTask = await taskService.updateTask(id, data)
                const indexTask = this.tasks.findIndex(task => task.id === id )

                if (indexTask !== -1) {
                    this.tasks[indexTask] = updatedTask
                }
                return updatedTask

            } catch (error: any){
                console.error(error)
                this.error = error?.response?.data || 'Ошибка при обновлении задачи'
            } finally {
                this.loading = false
            }
        },

        async deleteTask(id: string) {
            this.loading = true
            this.error = null

            try {
                await taskService.deleteTask(id)
                const index = this.tasks.findIndex(task => task.id === id)
                if (index !== -1) {
                    this.tasks.splice(index, 1)
                }
            } catch (error: any) {
                console.error(error)
                this.error = error?.response?.data || 'Ошибка при удалении задачи'
            } finally {
                this.loading = false
            }
        },

        async updateTaskStatus(id: string, status: TaskStatusDto) {
            this.loading = true
            this.error = null

            try {
                const updatedTask = await taskService.updateTaskStatus(id, status)
                const indexTask = this.tasks.findIndex(task => task.id === id)

                if (indexTask !== -1) {
                    this.tasks[indexTask] = updatedTask
                }
                return updatedTask
            } catch (error: any) {
                console.error(error)
                this.error = error?.response?.data || 'Ошибка при обновлении статуса'
            } finally {
                this.loading = false
            }
        }
    }
})