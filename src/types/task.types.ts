export type TaskStatus = 'todo' | 'in_progress' | 'done'

export interface Task {
    id: string,
    title: string,
    description?: string,
    status: TaskStatus,
    projectId: string,
    assigneeId: string,
    createdAt: string,
    updatedAt: string,
    completedAt: string
}

export interface CreateTask {
    title: string,
    description: string,
    projectId: string,
    assigneeId: string
}

export interface UpdateTask{
    title: string,
    description: string,
    projectId: string,
    assigneeId: string
}

export interface UpdateTaskStatusTo {
  status: TaskStatus
}

export interface TaskList {
  items: Task[]
  total: number
  limit: number
  offset: number
}