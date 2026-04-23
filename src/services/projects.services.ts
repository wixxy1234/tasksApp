import type { CreateProjectDto, ProjectDto, UpdateProjectDto } from '@/api/Api'
import { apiClient } from './apiClient'

export const ProjectService = {
    async getProjectList(): Promise<ProjectDto[]> {
        const response = await apiClient.api.projectsList()
        return response.data
    },

    async createProject(data: CreateProjectDto): Promise<ProjectDto> {
        const response = await apiClient.api.projectsCreate(data)
        return response.data
    },

    async getProjectById(id: string): Promise<ProjectDto> {
        const response = await apiClient.api.projectsDetail(id)
        return response.data
    },

    async updateProject(id: string, data: UpdateProjectDto): Promise<ProjectDto> {
        const response = await apiClient.api.projectsUpdate(id, data)
        return response.data
    },

    async deleteProject(id: string): Promise<void> {
        await apiClient.api.projectsDelete(id)
    }
}
