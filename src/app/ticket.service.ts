import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GetTicketDto } from './common/GetTicketDto';
import { Observable, of } from 'rxjs';
import { TicketList } from './common/TicketList';
import { Filter } from './common/Filter';
import { PostTicketDto } from './common/PostTicketDto';
import { catchError } from 'rxjs/operators';
import { PutTicketDto } from './common/PutTicketDto';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  readonly url = 'http://localhost:8080/api/tickets';

  constructor(private http: HttpClient) { }

  getTickets(filter: Filter): Observable<TicketList> {
    console.log(filter);

    let params = '';
    if (filter != null) {
      if (filter.pageIndex != null && filter.pageSize != null) {
        params += `page=${filter.pageIndex}&size=${filter.pageSize}&`;
      }
      if (!!filter.active && !!filter.direction) {
        params += `sort=${filter.active},${filter.direction}&`;
      }
    }

    return this.http.get<TicketList>(this.url + '?' + params);
  }

  getTicket(id: string): Observable<GetTicketDto>{
    return this.http.get<GetTicketDto>(`${this.url}/${id}`);
  }

  createTicket(postTicketDto: PostTicketDto): Observable<GetTicketDto>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<GetTicketDto>(this.url, postTicketDto, httpOptions);
    // .pipe(
    //   catchError(this.handleError('createMessage', postTicketDto))
    // );
  }

  updateTicket(id: string, putTicketDto: PutTicketDto): Observable<GetTicketDto> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.put<GetTicketDto>(`${this.url}/${id}`, putTicketDto, httpOptions);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log('TicketService: ' + `${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
