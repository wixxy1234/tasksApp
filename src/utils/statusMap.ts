export const statusMap: Record<string, string> = {
    Todo: 'К выполнению',
    InProgress: 'В работе',
    Done: 'Выполнено'
}

export const getStatusText = (status: string) => statusMap[status] || status
