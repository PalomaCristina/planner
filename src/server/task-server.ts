import { api } from './api'

export type TaskDetails = {
    id: string
    description: string //destination
    starts_at: string
    ends_at: string
    is_confirmed: boolean

}
type TaskCreate = Omit<TaskDetails, "id" | "is_confirmed"> & {
    emails_to_invite : string
}


async function getById(id:string) {
    try {
        const { data } = await api.get<{task: TaskDetails}>(`/task/${id}`);
        return data.task
    } catch (error) {
        throw error
    }
    
}
async function create({description, starts_at, ends_at, emails_to_invite} : TaskCreate) {
    try {
        const { data } = await api.post<{taskId: String}>(`/tasks/`, {
            description, 
            starts_at, 
            ends_at, 
            emails_to_invite, 
            owner_name: 'Paloma Cristina',
            owner_email: 'paloma1899@gmail.com'
        });
        return data
    } catch (error) {
        throw error
    }
    
}

export const taskServer = { getById, create }