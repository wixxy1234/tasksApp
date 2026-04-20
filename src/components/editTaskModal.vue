<template>
    <n-modal v-model:show="visible" preset="card" title="Редактировать задачу" style="width: 500px">
        <!-- Здесь будет форма -->
    </n-modal>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { NModal, NForm, NFormItem, NInput, NSelect, NButton } from 'naive-ui'
import type { Task, TaskStatus } from '@/types/task.types'

export default defineComponent({
    name: 'EditTaskModal',
    components: { NModal, NForm, NFormItem, NInput, NSelect, NButton },
    props: {
        visible: {
            type: Boolean,
            required: true
        },
        task: {
            type: Object as () => Task,
            required: true
        }
    },
    emits: ['update:visible', 'save'],
    setup() {
        // TODO: добавить useMessage для уведомлений
    },
    data() {
        return {
            formData: {
                title: '',
                description: '',
                status: '' as TaskStatus
            },
            statusOptions: [
                { label: 'К выполнению', value: 'todo' },
                { label: 'В работе', value: 'in_progress' },
                { label: 'Выполнено', value: 'done' }
            ]
        }
    },
    watch: {
        task: {
            handler(newTask) {
                if (newTask) {
                    this.formData = {
                        title: newTask.title,
                        description: newTask.description || '',
                        status: newTask.status
                    }
                }
            },
            immediate: true,
            deep: true
        }
    },
    methods: {
        handleClose() {
            this.$emit('update:visible', false)
        },
        handleSave() {
            // TODO: валидация и сохранение
            this.$emit('save', this.formData)
            this.handleClose()
        }
    }
})
</script>