<template>
    <n-card class="task-card" content-scrollable segmented closable @close="deleteProject">
        <div class="card-header">
            <h3 class="card-title">
                {{ project.name }}
            </h3>

        </div>

        <p class="card-description">
            {{ project.description || 'Нет описания' }}
        </p>

        <div class="project-tasks" v-if="projectTasks.length > 0">
            <p class="project-tasks-label">Задачи:</p>
            <div class="project-tasks-list">
                <ProjectTaskChip v-for="task in projectTasks" :key="task.id" :task="task" @remove="removeTaskFromProject" />
            </div>
        </div>
        <p v-else class="project-tasks-empty">Нет задач</p>

        <template #footer>
            <div class="card-footer">
                <n-button size="small" class="card-btn" @click="openEditModal">Редакт.</n-button>
                <n-button size="small" type="error" class="card-btn" @click="deleteProject">Удалить</n-button>
            </div>
        </template>
    </n-card>

    <edit-project-modal :project="project" :show="editProjectModalIsOpen" @update:show="editProjectModalIsOpen = $event" @save="saveProject"></edit-project-modal>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NCard, NButton, useMessage } from 'naive-ui'
import type { ProjectDto } from '@/api/Api'
import EditProjectModal from './editProjectModal.vue'
import ProjectTaskChip from './projectTaskChip.vue'
import { useTasksStore } from '@/stores/tasks.store';

export default defineComponent({
    name: "projectCard",
    components: { NCard, NButton, EditProjectModal, ProjectTaskChip },
    props: {
        project: {
            type: Object as () => ProjectDto,
            required: true
        }
    },
    setup() {
        const tasksStore = useTasksStore()
        return { tasksStore }
    },
    emits: ['deleteProject', 'update-project', 'remove-task'],
    data() {
        return {
            editProjectModalIsOpen: false,
        }
    },
    computed: {
        projectTasks() {
            return this.tasksStore.tasks.filter((t: any) => t.projectId === this.project.id)
        }
    },
    methods: {
        deleteProject() {
            const idProject = this.project.id

            this.$emit('deleteProject', idProject)
        },
        openEditModal() {
            this.editProjectModalIsOpen = true
        },
        saveProject(formData: any) {
            this.$emit('update-project', { ...this.project, ...formData })
            this.editProjectModalIsOpen = false
        },
        removeTaskFromProject(taskId: string) {
            this.$emit('remove-task', taskId)
        },
    },
})
</script>
<style>
.taskItem {
    max-height: 300px;
    max-width: 300px;
}

.task-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
}

.card-btn {
    margin: 0 5px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}

.card-title {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.card-status {
    font-size: 12px;
    padding: 4px 8px;
    border-radius: 12px;
    white-space: nowrap;
}


.card-description {
    margin: 20px 0;
    color: #666;
    line-height: 1.5;
    flex-grow: 1;
}

.card-footer {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
}

.project-tasks-label {
    margin: 0 0 6px 0;
    font-size: 14px;
    font-weight: 600;
}

.project-tasks-list {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
}

.project-tasks-empty {
    color: #999;
    font-size: 13px;
}
</style>