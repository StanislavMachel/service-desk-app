import { Priority } from './Priority';
import { Status } from './Status';

export interface PutTicketDto{
  title: string;
  email: string;
  description: string;
  priority: Priority;
  status: Status;
}
