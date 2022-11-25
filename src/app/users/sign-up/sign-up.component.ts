import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;

  signUpAttemptMessage = ""
  constructor(private userService: UserService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      'email': new FormControl(null, {validators: [Validators.required]}),
      'password': new FormControl(null, {validators: [Validators.required]}),
      'confirmPassword': new FormControl(null, {validators: [Validators.required]})
    })
  }

  onSignUp() {
    if (this.signUpForm.invalid){
      return
    }
    if (this.signUpForm.value.password !== this.signUpForm.value.confirmPassword) {
      this.snackBar.open("Password do not match", "X", {
        duration: 2500
      })
      return
    }
    let user = {
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password
    }
    this.userService.signUp(user).then(responseMessage => {

      
    }).catch(error => {
      console.log(error)
      this.snackBar.open(error.message, "X")
    })
  }

  getErrorMessage() {
    if (this.signUpAttemptMessage === "Not Unique") {
      return "Email already exists"
    }
    else if (this.signUpAttemptMessage === "No Match") {
      return "Passwords do not match"
    } else if (this.signUpAttemptMessage === "Error") {
      return "Problem connecting, try again."
    } else {
      return "Something else?????"
    }
  }

}