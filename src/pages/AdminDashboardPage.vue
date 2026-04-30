<template>
    <div v-if="analyticsStore.error" class="error-message">
        {{ analyticsStore.error }}
    </div>
    <n-spin :show="analyticsStore.loading" description="Загрузка...">
        <h3 class="heading">Аналитика</h3>
        <div class="dashboard">
            <ChartWidget title="Задачи по дням" chartType="line" :chartData="timelineChartData">
                <template #filter>
                    <n-select v-model:value="timelineDays" :options="daysOptions" style="width: 120px" />
                </template>
            </ChartWidget>
            <ChartWidget title="Задачи по статусам" chartType="pie" :chartData="byStatusChartData" />
            <ChartWidget title="Активность пользователей" chartType="bar" :chartData="userActivityChartData">
                <template #filter>
                    <n-select v-model:value="activityDays" :options="daysOptions" style="width: 120px" />
                </template>
            </ChartWidget>
            <ChartWidget title="Среднее время выполнения" chartType="doughnut" :chartData="avgCompletionChartData" />
        </div>
    </n-spin>
</template>

<script lang="ts">
import { UseAnalyticsStore } from '@/stores/analytics.store';
import { useAuthStore } from '@/stores/auth.store';
import { defineComponent } from 'vue';
import ChartWidget from '@/components/chartWidget.vue'
import { NSelect, NSpin } from 'naive-ui';
import { statusMap } from '@/utils/statusMap'


export default defineComponent({
    components: { ChartWidget, NSelect, NSpin },
    setup() {
        const analyticsStore = UseAnalyticsStore()
        const authStore = useAuthStore()
        return { analyticsStore, authStore }
    },
    data() {
        return {
            timelineDays: 30,
            activityDays: 30,
            daysOptions: [
                { label: '7 дней', value: 7 },
                { label: '14 дней', value: 14 },
                { label: '30 дней', value: 30 },
                { label: '90 дней', value: 90 }
            ]
        }
    },
    computed: {
        timelineChartData() {
            return {
                labels: this.analyticsStore.timeline.map(t => t.date.slice(0, 10)),
                datasets: [
                    {
                        label: 'Активные задачи',
                        data: this.analyticsStore.timeline.map(t => t.activeTasks),
                        borderColor: '#1890ff',
                        fill: false
                    },
                    {
                        label: 'Завершённые',
                        data: this.analyticsStore.timeline.map(t => t.completedTasks),
                        borderColor: '#54bd20',
                        fill: false
                    }
                ]
            }
        },
        byStatusChartData() {
            return {
                labels: this.analyticsStore.byStatus.map(s => statusMap[s.status] || s.status),
                datasets: [{
                    data: this.analyticsStore.byStatus.map(s => s.count),
                    backgroundColor: ['#f0f0f0', '#1890ff', '#54bd20']
                }]
            }
        },
        userActivityChartData() {
            return {
                labels: this.analyticsStore.userActivity.map(u => u.userId.slice(0, 8)),
                datasets: [{
                    label: 'Количество действий',
                    data: this.analyticsStore.userActivity.map(u => u.actionsCount),
                    backgroundColor: '#1890ff'
                }]
            }
        },
        avgCompletionChartData() {
            const hours = this.analyticsStore.avgCompletionTime?.avgHours ?? 0
            return {
                labels: ['Среднее время (ч)', 'До 24ч'],
                datasets: [{
                    data: [hours, Math.max(0, 24 - hours)],
                    backgroundColor: ['#1890ff', '#e8e8e8']
                }]
            }
        }
    },
    watch: {
        timelineDays(val) {
            this.analyticsStore.getAnalyticsTasksTimeline(val)
        },
        activityDays(val) {
            this.analyticsStore.getAnalyticsUserActivity(val)
        }
    },
    mounted() {
        this.analyticsStore.getAnalyticsBytasksStatus()
        this.analyticsStore.getAnalyticsUserActivity()
        this.analyticsStore.getAnalyticsTasksTimeline()
        this.analyticsStore.getAnalyticsAvgCompletion()
    },
})

</script>

<style scoped>
.dashboard {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
}
.heading{
    margin-bottom: 20px;
}
</style>