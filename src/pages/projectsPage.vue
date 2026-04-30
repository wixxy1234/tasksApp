<template>

    <div v-if="projectStore.error" class="error-message">
        {{ projectStore.error }}
    </div>
    <n-spin :show="projectStore.loading" description="Загрузка...">
        <div class="filter_and_btn">
            <h3>Проекты</h3>
            <n-button strong secondary round type="info" @click="openAddProjectModal">Добавить проект +</n-button>
        </div>

        <div class="empty-state" v-if="projectStore.projects.length === 0">
            <h2>Нет проектов</h2>
            <p class="empty-state-hint">Создайте первый проект, нажав кнопку выше</p>
        </div>
        <div class="projects-wrapper">
            <projectCard v-for="project in projectStore.projects" :key="project.id" :project="project"
                @delete-project="deleteProject" @update-project="updateProject" @remove-task="removeTaskFromProject">
            </projectCard>
        </div>
    </n-spin>
    <AddProjectmodal :isOpen="addProjectModalIsOpen" @update:show="addProjectModalIsOpen = $event"
        @save-new-project="addProject"></AddProjectmodal>

</template>

<script lang="ts">
import type { CreateProjectDto, ProjectDto } from '@/api/Api';
import AddProjectmodal from '@/components/addProjectmodal.vue';
import projectCard from '@/components/project.vue';
import { useProjectStore } from '@/stores/projects.store';
import { useTasksStore } from '@/stores/tasks.store';
import { NButton, useDialog, NSpin } from 'naive-ui';
import { defineComponent } from 'vue';


export default defineComponent({
    components: { projectCard, NButton, AddProjectmodal, NSpin },
    setup() {
        const projectStore = useProjectStore()
        const tasksStore = useTasksStore()
        const dialog = useDialog()
        return { projectStore, tasksStore, dialog }
    },
    data() {
        return {
            addProjectModalIsOpen: false,
        }
    },
    methods: {
        openAddProjectModal() {
            this.addProjectModalIsOpen = true
        },
        addProject(data: CreateProjectDto) {
            this.projectStore.createProject(data)
            this.addProjectModalIsOpen = false
        },
        deleteProject(id: string) {
            this.dialog.error({
                title: 'Подтверждение удаления',
                content: 'Вы уверены, что хотите удалить этот проект?',
                positiveText: 'Удалить',
                negativeText: 'Отмена',
                onPositiveClick: async () => {
                    await this.projectStore.deleteProject(id)
                }
            })
        },
        updateProject(project: ProjectDto) {
            const oldProject = this.projectStore.projects.find((t: any) => t.id === project.id)
            if (!oldProject) return


            if (oldProject.name !== project.name || oldProject.description !== project.description) {
                this.projectStore.updateProject(project.id, {
                    name: project.name,
                    description: project.description
                })
            }
        },
        removeTaskFromProject(taskId: string) {
            const task = this.tasksStore.tasks.find((t: any) => t.id === taskId)
            if (!task) return
            this.tasksStore.updateTask(taskId, { title: task.title, projectId: null })
        }
    },
    mounted() {
        this.projectStore.fetchProjects()
        this.tasksStore.fetchTasks()
    }
})


</script>
<style scoped>
.projects-wrapper {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    margin-top: 20px;
}

@media (min-width: 768px) {
    .projects-wrapper {
        grid-template-columns: repeat(2, 1fr);
    }
}

.filter_and_btn {
    display: flex;
    justify-content: space-between;
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