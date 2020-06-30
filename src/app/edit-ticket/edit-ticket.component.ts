import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TicketService } from '../ticket.service';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { notBlank } from '../validators/custom.validators';
import { GetTicketDto } from '../common/GetTicketDto';
import { Priority } from '../common/Priority';
import { Status } from '../common/Status';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TicketsComponent } from '../tickets/tickets.component';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.scss']
})
export class EditTicketComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ticketService: TicketService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EditTicketComponent>
    ) { }

  @ViewChild('form') private form: NgForm;
  ticketForm: FormGroup;
  priorities = Priority;
  statuses = Status;

  isLoaded = false;

  id: string;
  ticketsComponent: TicketsComponent;

  ngOnInit(): void {
    console.log(this.data);

    this.id = this.data.id;
    this.ticketsComponent = this.data.ticketsComponent;

    this.ticketService.getTicket(this.data.id).subscribe(response => {
      console.log(response);
      this.ticketForm = this.formBuilder.group({
        title: new FormControl(response.title, [notBlank()]),
        email: new FormControl(response.email, [notBlank(), Validators.email]),
        description: new FormControl(response.description, [notBlank()]),
        priority: new FormControl(response.priority, [Validators.required]),
        status: new FormControl(response.status, [Validators.required])
      });

      this.isLoaded = true;
    });
  }

  onSubmit(ticketForm) {
    this.ticketService.updateTicket(this.id,
      {
        description: ticketForm.description,
        title: ticketForm.title,
        email: ticketForm.email,
        priority: ticketForm.priority,
        status: ticketForm.status
      }).subscribe(response => {
        this.dialogRef.close();
        this.snackBar.open('Ticket updated', null, {
          duration: 2000,
          panelClass: 'green-snackbar'
        });
        this.ticketsComponent.reload();
      }, response => {
        this.snackBar.open(
          'Oops! Something went wrong here.',
          null,
          {
            duration: 2000,
            panelClass: 'red-snackbar'
          });
      });
  }
}
