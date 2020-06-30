import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormBuilder, NgForm, FormControl, Validators } from '@angular/forms';
import { Priority } from '../common/Priority';
import { TicketService } from '../ticket.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { notBlank } from '../validators/custom.validators';
import { TicketsComponent } from '../tickets/tickets.component';


@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private ticketService: TicketService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CreateTicketComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  @ViewChild('form') private form: NgForm;

  ticketForm: FormGroup;
  priorities = Priority;

  ticketsComponent: TicketsComponent;

  ngOnInit(): void {
    this.ticketsComponent = this.data.ticketsComponent;

    this.ticketForm = this.formBuilder.group({
      title: new FormControl('', [notBlank()]),
      email: new FormControl('', [notBlank(), Validators.email]),
      description: new FormControl('', [notBlank()]),
      priority: new FormControl(null, [Validators.required])
    });
  }

  onSubmit(ticketForm) {
    console.log(ticketForm);
    this.ticketService.createTicket({
      description: ticketForm.description,
      email: ticketForm.email,
      priority: ticketForm.priority,
      title: ticketForm.title
    })
    .subscribe(response => {
      this.dialogRef.close();
      this.snackBar.open('Ticket created', null, {
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
