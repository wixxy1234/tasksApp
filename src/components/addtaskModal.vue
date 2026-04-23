<template>
    <n-modal preset="card" title="Добавить задачу" :show="isOpen" @update:show="$emit('update:show', $event)"
        style="width: 500px">
        <n-form ref="formRef" :model="formData" :rules="addTaskRules">
            <n-form-item label="Название задачи" path="title">
                <n-input v-model:value="formData.title" />
            </n-form-item>
            <n-form-item label="Описание" path="description">
                <n-input type="textarea" v-model:value="formData.description" />
            </n-form-item>
            <n-form-item label="Проект" path="projectId">
                <n-select v-model:value="formData.projectId" :options="projectOptions" placeholder="Без проекта" clearable />
            </n-form-item>
        </n-form>

        <template #footer>
            <div class="modal-footer">
                <n-button @click="cancel">Отмена</n-button>
                <n-button type="primary" @click="save">Сохранить</n-button>
            </div>
        </template>
    </n-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NModal, NForm, NFormItem, NInput, NSelect, NButton, type FormRules } from 'naive-ui'
import type { ProjectDto } from '@/api/Api'

export default defineComponent({
    name: 'addTaskModal',
    components: { NModal, NForm, NFormItem, NInput, NSelect, NButton },
    props: {
        isOpen: { type: Boolean, required: true },
        projects: { type: Array as () => ProjectDto[], required: true },
    },

    data() {
        return {
            formData: {
                title: '',
                description: '',
                projectId: null as string | null,
            }
        }
    },
    methods: {
        cancel() {
            this.$emit('update:show', false)
        },
        async save() {
            try {
                await (this.$refs.formRef as any).validate()
                this.$emit('saveNewTask', this.formData)
            } catch (error) {
                console.log('Ошибка при создании задачи')
            }
        },
    },
    computed: {
        addTaskRules(): FormRules {
            return {
                title: [{ required: true, message: 'Введите название', trigger: 'blur' }]
            }
        },
        projectOptions() {
            return this.projects.map(p => ({ label: p.name, value: p.id }))
        }
    },
    emits: ['update:show', 'saveNewTask']

})
</script>

<style scoped>
.modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}
</style>