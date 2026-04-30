<template>
    <div class="filters">
        <n-select v-model:value="localStatus" :options="statusOptions" style="width: 200px" />
        <n-select v-model:value="localProjectId" :options="projectOptions" style="width: 200px" clearable placeholder="Все проекты" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { TaskStatusDto, type ProjectDto } from '@/api/Api'
import { NSelect } from 'naive-ui'
import { statusMap } from '@/utils/statusMap'

export default defineComponent({
    name: 'FiltersPanel',
    components: { NSelect },
    props: {
        filterStatus: { type: String, default: '' },
        filterProjectId: { type: String, default: '' },
        projects: { type: Array as () => ProjectDto[], required: true }
    },
    emits: ['update:filterStatus', 'update:filterProjectId'],
    data() {
        return {
            localStatus: this.filterStatus,
            localProjectId: this.filterProjectId,
            statusOptions: [
                { label: 'Все', value: '' },
                ...Object.values(TaskStatusDto).map(s => ({ label: statusMap[s], value: s }))
            ]
        }
    },
    computed: {
        projectOptions() {
            return [
                { label: 'Все проекты', value: '' },
                ...this.projects.map(p => ({ label: p.name, value: p.id }))
            ]
        }
    },
    watch: {
        filterStatus(val) {
            this.localStatus = val
        },
        filterProjectId(val) {
            this.localProjectId = val
        },
        localStatus(val) {
            this.$emit('update:filterStatus', val)
        },
        localProjectId(val) {
            this.$emit('update:filterProjectId', val)
        }
    }
})
</script>

<style scoped>
.filters {
    display: flex;
    gap: 12px;
}
</style>
