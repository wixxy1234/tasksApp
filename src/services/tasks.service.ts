import type { CreateTask, Task, TaskList, TaskStatus, UpdateTask } from "@/types/task.types";
import { api } from "./api";



const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Изучить Vue 3',
    description: 'Понять Composition API и Options API',
    status: 'in_progress',
    projectId: '1',
    assigneeId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    completedAt: ''
  },
  {
    id: '2',
    title: 'Настроить Pinia',
    description: 'Создать store для авторизации',
    status: 'todo',
    projectId: '1',
    assigneeId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    completedAt: ''
  },
  {
    id: '3',
    title: 'Сделать таблицу задач',
    description: 'Реализовать TaskTable компонент',
    status: 'done',
    projectId: '2',
    assigneeId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    completedAt: new Date().toISOString()
  }
]



export const taskService = {
    getTasks(params?: {
        status?: TaskStatus
        projectId?: string
        limit?: number
        offset?: number
    }) {
        // return api.get('/tasks', params) as Promise<TaskList>

        return Promise.resolve(mockTasks)
    },

    getTaskById(id: string){
        return api.get(`/tasks/${id}`)
    },

    createTask(data: CreateTask){
        // return api.post('/tasks', data)

        const newTask: Task = {
            id: String(Date.now()),
            ...data,
            status: 'todo',
            assigneeId: '1',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            completedAt: ''
            }
        mockTasks.push(newTask)
        return Promise.resolve(newTask)
    },

    updateTask(id: string, data: UpdateTask ){
        // return api.put(`/tasks/${id}`, data)

        const index = mockTasks.findIndex(task => task.id === id)
        if (index === -1) {
            return Promise.reject('Задача не найдена')
        }
        
        // Временно используем any для обхода строгой типизации
        const currentTask: any = mockTasks[index]
        const updatedData: any = data
        
        mockTasks[index] = {
            ...currentTask,
            ...updatedData,
            updatedAt: new Date().toISOString()
        }
        
        return Promise.resolve(mockTasks[index] as Task)
    },

    deleteTask(id: string){
        // return api.delete(`/tasks/${id}`)

        const index = mockTasks.findIndex(task => task.id === id)
        if (index === -1) {
            return Promise.reject('Задача не найдена')
        }
        mockTasks.splice(index, 1)
        return Promise.resolve()
    },

    updateTaskStatus(id: string, status: TaskStatus){
        return api.put(`/tasks/${id}/status`, {status})
    }
}