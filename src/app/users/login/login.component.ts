import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  loginAttemptMessage = ""
  constructor(private userService: UserService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, {validators: [Validators.required]}),
      'password': new FormControl(null, {validators: [Validators.required]})
    })
  }

  onLogin() {
    if (this.loginForm.invalid){
      return
    }
    let user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.userService.login(user).then(responseMessage => {

      this.loginAttemptMessage = ""+responseMessage
      console.log(this.loginAttemptMessage)
    }).catch(error => {
      console.log(error)
      this.snackBar.open(error, "X")
    })
  }

  getErrorMessage() {
    if (this.loginAttemptMessage === "Not Found") {
      return "Username/Password Not Found"
    } else if (this.loginAttemptMessage === "Error") {
      return "Problem connecting, try again."
    } else {
      return "Something else?????"
    }
  }

}
