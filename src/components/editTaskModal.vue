<template>
    <n-modal preset="card" title="Редактировать задачу" :show="show" @update:show="$emit('update:show', $event)"
        style="width: 500px">
        <n-form ref="formRef" :model="formData" :rules="updateTaskRules">
            <n-form-item label="Название задачи" path="title">
                <n-input v-model:value="formData.title" />
            </n-form-item>
            <n-form-item label="Описание" path="description">
                <n-input v-model:value="formData.description" type="textarea" />
            </n-form-item>
            <n-form-item label="Статус задачи" path="status">
                <n-select v-model:value="formData.status" :options="statusOptions" />
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
import { defineComponent, watch } from 'vue'
import { NModal, NForm, NFormItem, NInput, NSelect, NButton, type FormRules } from 'naive-ui'
import { TaskStatusDto, type TaskDto } from '@/api/Api'

export default defineComponent({
    name: 'EditTaskModal',
    components: { NModal, NForm, NFormItem, NInput, NSelect, NButton },
    props: {
        show: { type: Boolean, required: true },
        task: { type: Object as () => TaskDto, required: true }
    },
    emits: ['update:show', 'save'],
    data() {
        return {
            formData: {
                title: '',
                description: '',
                status: '' as any
            },
            statusOptions: Object.values(TaskStatusDto).map(s => ({ label: s, value: s }))
        }
    },
    watch: {
        task: {
            immediate: true,
            handler(newTask: TaskDto) {
                this.formData.title = newTask.title || ''
                this.formData.description = newTask.description || ''
                this.formData.status = newTask.status
            }
        }
    },
    computed: {
        updateTaskRules(): FormRules {
            return {
                title: [{ required: true, message: 'Введите название', trigger: 'blur' }]
            }
        }
    },
    methods: {
        async save() {
            try {
               await (this.$refs.formRef as any).validate()
               this.$emit('save', this.formData)

            } catch (error) {
                console.log('Ошибка при редактировании задачи')

            }
        },
        cancel() {
            this.$emit('update:show', false)
        }
    }
})
</script>

<style scoped>
.modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}
</style>