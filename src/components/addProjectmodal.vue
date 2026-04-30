<template>
    <n-modal preset="card" title="Добавить проект" :show="isOpen" @update:show="$emit('update:show', $event)"
        style="width: 500px">
        <n-form ref="formRef" :model="formData" :rules="addProjectRules">
            <n-form-item label="Название проекта" path="name">
                <n-input v-model:value="formData.name" required />
            </n-form-item>
            <n-form-item label="Описание" path="description">
                <n-input type="textarea" v-model:value="formData.description" />
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
import { NModal, NForm, NFormItem, NInput, NButton, type FormRules } from 'naive-ui'

export default defineComponent({
    name: 'addProjectModal',
    components: { NModal, NForm, NFormItem, NInput, NButton },
    props: {
        isOpen: { type: Boolean, required: true },
    },

    data() {
        return {
            formData: {
                name: '',
                description: '',
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
                this.$emit('saveNewProject', this.formData)
            } catch (error) {
                console.log('Ошибка при создании проекта')
            }
        },
        
    },
    computed: {
        addProjectRules(): FormRules {
            return {
                name: [{ required: true, message: 'Введите название', trigger: 'blur' }]
            }
        }
    },
    emits: ['update:show', 'saveNewProject']

})
</script>

<style scoped>
.modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}
</style>