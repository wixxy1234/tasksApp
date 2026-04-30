<template>
     <n-card class="chart-widget">
        <template #header>
            <div class="chart-header">
                <span>{{ title }}</span>
                <slot name="filter"></slot>
            </div>
        </template>
        <div class="chart-container">
            <component :is="chartComponent" :chartData="chartData" :options="mergedOptions" />
        </div>
    </n-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { LineChart, BarChart, PieChart, DoughnutChart } from 'vue-chart-3'
import { NCard } from 'naive-ui'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export default defineComponent({
    name: 'ChartWidget',
    components: { NCard, LineChart, BarChart, PieChart, DoughnutChart },
    props: {
        title: { type: String, required: true },
        chartType: { type: String, required: true },
        chartData: { type: Object, required: true },
        chartOptions: { type: Object, default: () => ({}) }
    },
    computed: {
        chartComponent() {
            const map: Record<string, any> = {
                line: LineChart,
                bar: BarChart,
                pie: PieChart,
                doughnut: DoughnutChart
            }
            return map[this.chartType]
        },
        mergedOptions() {
            return {
                responsive: true,
                maintainAspectRatio: false,
                ...this.chartOptions
            }
        }
    }
})
</script>

<style scoped>
.chart-container {
    position: relative;
    min-height: 250px;
}
.chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>