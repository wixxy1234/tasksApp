import type { AvgCompletionTimeDto, TasksByStatusDto, TasksTimelineDto, UserActivityDto } from "@/api/Api";
import { apiClient } from './apiClient';

export const AnalyticsService = {
    async analyticsBytasksStatus(): Promise<TasksByStatusDto[]>{
        const response = await apiClient.api.analyticsTasksByStatusList()
        return response.data
    },

    async analyticsUserActivity(days?: number): Promise<UserActivityDto[]>{
        const response = await apiClient.api.analyticsUserActivityList(
            days !== undefined ? { days } : undefined
        )
        return response.data
    },

    async analyticsTasksTimeline(days?: number): Promise<TasksTimelineDto[]>{
        const response = await apiClient.api.analyticsTasksTimelineList(
            days !== undefined ? { days } : undefined
        )
        return response.data
    },

    async  analyticsAvgCompletion(): Promise<AvgCompletionTimeDto>{
        const response = await apiClient.api.analyticsAvgCompletionTimeList()
        return response.data
    }
}