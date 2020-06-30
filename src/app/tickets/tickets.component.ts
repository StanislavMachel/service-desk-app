import { Component, OnInit, ViewChild } from '@angular/core';
import { TicketService } from '../ticket.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { TicketList } from '../common/TicketList';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateTicketComponent } from '../create-ticket/create-ticket.component';
import { EditTicketComponent } from '../edit-ticket/edit-ticket.component';


@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {


  displayedColumns: string[] = ['id', 'title', 'number', 'email', 'description', 'priority', 'status', 'created', 'actions'];
  dataSource = new MatTableDataSource();
  pageSize = 10;
  pageSizeOptions: number[] = [this.pageSize, 20, 50];

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private ticketService: TicketService, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.ticketService.getTickets({
      active : null,
      direction: null,
      pageIndex: 0,
      pageSize: this.pageSize
    }).subscribe((ticketList: TicketList) => {
      this.dataSource.data = ticketList.items;
      this.paginator.length = ticketList.total;
    });

  }

  sortData(){

    this.ticketService.getTickets({
      active : this.sort.active,
      direction: this.sort.direction,
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize
    })
    .subscribe((ticketList: TicketList) => {
      this.dataSource.data = ticketList.items;
      this.paginator.length = ticketList.total;
    });

  }

  getPaginatorData() {
    this.ticketService.getTickets({
      active : this.sort.active,
      direction: this.sort.direction,
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize
    })
    .subscribe((ticketList: TicketList) => {
      this.dataSource.data = ticketList.items;
      this.paginator.length = ticketList.total;
    });

  }

  public reload(){
    this.ticketService.getTickets({
      active : this.sort.active,
      direction: this.sort.direction,
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize
    })
    .subscribe((ticketList: TicketList) => {
      this.dataSource.data = ticketList.items;
      this.paginator.length = ticketList.total;
    });
  }

  openCreateDialog(){
    this.dialog.open(CreateTicketComponent, {
      width: '500px',
      data: {
        ticketsComponent: this
      }
    });
  }

  openEditDialog(id: number){
    this.dialog.open(EditTicketComponent, {
      width: '500px',
      data: {
        id: id,
        ticketsComponent: this
      }
    });
  }

}
