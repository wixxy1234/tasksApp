import type { CreateProjectDto, ProjectDto, UpdateProjectDto} from '@/api/Api';
import { ProjectService } from '@/services/projects.services';
import { defineStore } from 'pinia';
export const useProjectStore = defineStore('projects', {
    state: () => ({
        projects: [] as ProjectDto[],
        loading: false,
        error: null as string | null,
    }), 
    actions: {
        async fetchProjects(){
            this.loading = true
            this.error = null
                try {
                    const response = await ProjectService.getProjectList()
                    this.projects = response || []
                } catch (error: any) {
                    console.error(error)
                    this.error = error?.response?.data || 'Ошибка при загрузке проектов'
                } finally {
                    this.loading = false
                }
        },

        async getProjectbyId(id: string){
            this.loading = true
            this.error = null
                try {
                    const project = await ProjectService.getProjectById(id)
                    return project
                } catch (error: any) {
                    console.error(error)
                    this.error = error?.response?.data || 'Ошибка при загрузке проекта'
                } finally {
                    this.loading = false
                }
        },

        async createProject(data: CreateProjectDto){
            this.loading = true
            this.error = null
            try {
                    const response = await ProjectService.createProject(data)
                    this.projects.push(response)
                } catch (error: any) {
                    console.error(error)
                    this.error = error?.response?.data || 'Ошибка при создании проекта'
                } finally {
                    this.loading = false
            }
        },

        async updateProject(id: string, data: UpdateProjectDto){
            this.loading = true
            this.error = null
            try {
                    const updatedProject = await ProjectService.updateProject(id, data)
                    const indexProject = this.projects.findIndex(project => project.id === id)

                    if (indexProject !== 1){
                        this.projects[indexProject] = updatedProject
                    } 

                    return updatedProject
                } catch (error: any) {
                    console.error(error)
                    this.error = error?.response?.data || 'Ошибка при обновлении проекта'
                } finally {
                    this.loading = false
            }
        },

        async deleteProject(id: string){
            this.loading = true
            this.error = null
            try {
                    await ProjectService.deleteProject(id)
                    const index = this.projects.findIndex(project => project.id === id)
                    if (index !== -1) {
                        this.projects.splice(index, 1)
                    }
                    
                } catch (error: any) {
                    console.error(error)
                    this.error = error?.response?.data || 'Ошибка при удалении проекта'
                } finally {
                    this.loading = false
            }
        }
    },
})