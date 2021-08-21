import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { EmailService } from '../email.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor(private emailService: EmailService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onSendEmail(form: NgForm){
    if (form.invalid){
      return
    }
    this.emailService.sendEmail(form.value.name, form.value.contactInfo, form.value.content)
    this._snackBar.open('Message Sent', '', {
      duration: 5000
    })
    form.resetForm()
  }

}
