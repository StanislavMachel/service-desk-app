import { GetTicketDto } from './GetTicketDto';

export interface TicketList{
    items: GetTicketDto[];
    total: number;
    totalPages: number;
}
