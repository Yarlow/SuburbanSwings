import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { EmailService } from '../email.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor(private emailService: EmailService) { }

  ngOnInit(): void {
  }

  onSendEmail(form: NgForm){
    if (form.invalid){
      return
    }
    this.emailService.sendEmail(form.value.name, form.value.contactInfo, form.value.content)

    form.resetForm()
  }

}
