import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})
export class EmailService {

  constructor(private http: HttpClient){}

  sendEmail(name: string, contactInfo: string, content: string) {
    const emailInfo = {name: name, contactInfo: contactInfo, content: content}
    console.log(emailInfo)
    this.http.post<{message: string}>(environment.apiUrl + 'sendemail', emailInfo)
      .subscribe((responseData) => {

      })
  }


}
