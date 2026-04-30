<template>
    <span class="task-chip"  :class="`status-${task.status}`">
        <span class="task-chip-title">{{ task.title }}</span>
        <span class="task-chip-close" @click="$emit('remove', task.id)">&times;</span>
    </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { TaskDto } from '@/api/Api'

export default defineComponent({
    name: 'ProjectTaskChip',
    props: {
        task: {
            type: Object as () => TaskDto,
            required: true
        }
    },
    emits: ['remove']
})
</script>

<style scoped>
.task-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    background-color: #f0f0f0;
    border-radius: 16px;
    font-size: 13px;
    max-width: 100%;
}

.task-chip-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.task-chip-close {
    cursor: pointer;
    font-size: 16px;
    line-height: 1;
    color: #999;
    flex-shrink: 0;
}

.task-chip-close:hover {
    color: #e04040;
}
.status-Todo {
    background-color: #f0f0f0;
    color: #666;
}

.status-InProgress {
    background-color: #e6f7ff;
    color: #1890ff;
}

.status-Done {
    background-color: rgba(24, 160, 88, 0.16);
    color: #54bd20;
}
</style>
