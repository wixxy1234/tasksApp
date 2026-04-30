import type { AvgCompletionTimeDto, TasksByStatusDto, TasksTimelineDto, UserActivityDto } from "@/api/Api";
import { AnalyticsService } from "@/services/analytics.service";
import { defineStore } from "pinia";

export const UseAnalyticsStore = defineStore('analytics', {
    state:() =>({
        byStatus: [] as TasksByStatusDto[],
        userActivity: [] as UserActivityDto[],
        timeline: [] as TasksTimelineDto[],
        avgCompletionTime: null as AvgCompletionTimeDto | null,
        loading: false,
        error: null as string | null,
        selectedDays: 30
    }),
    actions: {
        async getAnalyticsBytasksStatus(){
            this.loading = true
            this.error = null

            try {
                const response = await AnalyticsService.analyticsBytasksStatus()
                this.byStatus = response 
            } catch (error: any) {
                console.error(error)
                this.error = error?.response?.data || 'Ошибка при загрузке аналитики по статусам'
            } finally {
                this.loading = false
            }
        },
        async getAnalyticsUserActivity(days?: number){
            this.loading = true
            this.error = null

            try {
                const response = await AnalyticsService.analyticsUserActivity(days ?? this.selectedDays)
                this.userActivity = response 
            } catch (error: any) {
                console.error(error)
                this.error = error?.response?.data || 'Ошибка при загрузке аналитики по пользовательской аткивности'
            } finally {
                this.loading = false
            }
        },
        async getAnalyticsTasksTimeline(days?: number){
            this.loading = true
            this.error = null

            try {
                const response = await AnalyticsService.analyticsTasksTimeline(days ?? this.selectedDays)
                this.timeline = response 
            } catch (error: any) {
                console.error(error)
                this.error = error?.response?.data || 'Ошибка при загрузке аналитики по таймлайну'
            } finally {
                this.loading = false
            }   
        },
        async getAnalyticsAvgCompletion(){
            this.loading = true
            this.error = null

            try {
                const response = await AnalyticsService.analyticsAvgCompletion()
                this.avgCompletionTime = response 
            } catch (error: any) {
                console.error(error)
                this.error = error?.response?.data || 'Ошибка при загрузке аналитики по среднему времени выполнения задач'
            } finally {
                this.loading = false
            } 
        },
    },
})