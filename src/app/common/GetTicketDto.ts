import { Priority } from './Priority';

export interface GetTicketDto{
    id: string;
    title: string;
    number: string;
    email: string;
    description: string;
    priority: Priority;
    status: string;
    created: string;
}
