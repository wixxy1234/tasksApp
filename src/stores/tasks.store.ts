import type { CreateTask, Task, UpdateTask } from "@/types/task.types";
import { defineStore } from "pinia";
import { taskService } from "@/services/tasks.service";


export const useTasksStore = defineStore('tasks', {
    state: () => ({
        tasks: [] as Task[],
        loading: false,
        error: null as string | null
    }),

    actions: {
        async fetchTasks(){
            this.loading = true
            this.error = null

            try {
                const tasks = await taskService.getTasks()
                this.tasks = tasks as Task[]
            } catch (error) {
                console.error(error)
                this.error = error instanceof Error ? error.message : 'Ошибка при загрузке задач'
            } finally {
                this.loading = false
            }
        },

        async createTask(taskData: CreateTask){
            this.loading = true
            this.error = null

            try {
                const newTask = await taskService.createTask(taskData)
                this.tasks.push(newTask)
            } catch (error){
                console.error(error)
                this.error = error instanceof Error ? error.message : 'Ошибка при создании задачи'
            } finally {
                this.loading = false
            }
        },

        async updateTask (id: string, data: UpdateTask){
            this.loading = true
            this.error = null

            try {
                const updatedTask = await taskService.updateTask(id, data)
                const indexTask = this.tasks.findIndex(task => task.id === id )

                if (indexTask !== -1) {
                    this.tasks[indexTask] = updatedTask as Task
                }
                return updatedTask

            } catch (error){
                console.error(error)
                this.error = error instanceof Error ? error.message : 'Ошибка при обновлении задачи'
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
            } catch (error) {
                console.error(error)
                this.error = error instanceof Error ? error.message : 'Ошибка при удалении задачи'
            } finally {
                this.loading = false
            }
        }
    }
})