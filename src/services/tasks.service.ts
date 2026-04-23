import type { 
    CreateTaskDto, 
    TaskDto, 
    TaskListDto, 
    UpdateTaskDto, 
    TaskStatusDto,
    UpdateTaskStatusDto 
} from "@/api/Api";
import { apiClient } from './apiClient'

export const taskService = {
    async getTasks(params?: {
        status?: TaskStatusDto;
        projectId?: string;
        limit?: number;
        offset?: number;
    }): Promise<TaskListDto> {
        const response = await apiClient.api.tasksList(params);
        return response.data;
    },

    async getTaskById(id: string): Promise<TaskDto> {
        const response = await apiClient.api.tasksDetail(id);
        return response.data;
    },

    async createTask(data: CreateTaskDto): Promise<TaskDto> {
        const response = await apiClient.api.tasksCreate(data);
        return response.data;
    },

    async updateTask(id: string, data: UpdateTaskDto): Promise<TaskDto> {
        const response = await apiClient.api.tasksUpdate(id, data);
        return response.data;
    },

    async deleteTask(id: string): Promise<void> {
        await apiClient.api.tasksDelete(id);
    },

    async updateTaskStatus(id: string, status: TaskStatusDto): Promise<TaskDto> {
        const data: UpdateTaskStatusDto = { status };
        const response = await apiClient.api.tasksStatusPartialUpdate(id, data);
        return response.data;
    },
};