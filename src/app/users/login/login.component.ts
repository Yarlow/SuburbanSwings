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
  recoveryForm: FormGroup;


  loginAttemptMessage = ""
  private attemptingLogin: boolean = false;
  recoveringPassword: boolean = false;
  constructor(private userService: UserService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.recoveringPassword = false;
    this.loginForm = new FormGroup({
      'email': new FormControl(null, {validators: [Validators.required]}),
      'password': new FormControl(null, {validators: [Validators.required]})
    })

    this.recoveryForm = new FormGroup({
      'recoveryEmail': new FormControl(null, {validators: [Validators.required]})
    })
  }

  onLogin() {
    // console.log()
    if (this.loginForm.invalid){
      return
    }
    
    let user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.attemptingLogin = true;
    this.userService.login(user).then(responseMessage => {
      this.attemptingLogin = false;
      this.loginAttemptMessage = ""+responseMessage
      console.log(this.loginAttemptMessage)
    }).catch(error => {
      this.attemptingLogin = false;
      this.snackBar.open(error, "X");
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

  onRecoverPassword() {
    if (this.recoveryForm.invalid){
      return
    }
  }

}
