import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http'
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private token: string;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated: boolean; // This is for compoments that may load /after/ the user is signed in.. the AuthListener only updates a components variable when it changes.
  user: User;
  userUpdated = new Subject<User>()
  private userId: string
  private tokenTimer: NodeJS.Timer;

  constructor(private http: HttpClient, private router: Router, private _snackBar: MatSnackBar) { }



  login(user: { email: string, password: string }){
    let responseMessageToReturn: string = ""
    return new Promise((resolve, reject) => {
      this.http.post<{ message: string, token: string, expiresIn: number, userId: string }>(environment.apiUrl + "users/signin", user)
        .subscribe(responseData => {
          const token = responseData.token;
          responseMessageToReturn = responseData.message;
          if (token) {
            this.setToken(responseData, token);
            this._snackBar.open('Log In Successful', 'X', {
              duration: 2500
            })
            this.router.navigate(['/']);
          }
          resolve(responseData.message);
        }, (errorResponse) => {
          reject(errorResponse.error.message)
        })
    })

      // return responseMessageToReturn
  }

  setToken (responseData, token) {
    this.token = token;
    const expiresInDuration = responseData.expiresIn
    this.setAuthTimer(responseData.expiresIn)
    this.authStatusListener.next(true);
    const now = new Date()
    const expirationDate = new Date( now.getTime() + expiresInDuration * 1000)
    this.saveAuthData(token, expirationDate, responseData.userId)
    this.isAuthenticated = true;
    this.setUserId(responseData.userId)
    this.getSignedInUserInfo()
    // this.getuserInfo()
    // this.setUser(this.getUserInfo(responseData.userId))
    
  }

  signUp(user: { email: string, password: string }) {
    return new Promise((resolve, reject) => {
      this.http.post<{ message: string, token: string, expiresIn: number, userId: string }>(
        `${environment.apiUrl}users/signup`, user
      ).subscribe(responseData => {
        console.log("SUCCESS SIGN UP");
        console.log(responseData);
        if (responseData.token) {
          this.setToken(responseData, responseData.token)
          this._snackBar.open('Welcome!', 'X')
          this.getSignedInUserInfo()
          this.router.navigate(['/']);
        }
        resolve(responseData);
      }, (error)=> {
        reject(error.error);
      })
    }) 
  }

  setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000) // duration needs to be in milliseconds
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.user = null;
    this.userUpdated.next(this.user)

    this.router.navigate(['/']);
    clearTimeout(this.tokenTimer)
    this.clearAuthData()
  }

  private clearAuthData() {
    localStorage.removeItem('token')
    localStorage.removeItem('expiration')
    localStorage.removeItem('userID')
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token)
    localStorage.setItem('expiration', expirationDate.toISOString())
    localStorage.setItem('userID', userId)
  }

  setUserId(id: string) {
    this.userId = id
  }

  getSignedInUserInfo() {
    this.http.get<{user: User}>(environment.apiUrl + 'users/' + this.userId).subscribe(responseData => {
      this.user = {
        _id: responseData.user._id,
        email: responseData.user.email,
        name: responseData.user.name,
        role: responseData.user.role
      }
      this.userUpdated.next(this.user)
    }, (err) => {
      console.log("ERROR")
      // return null
    })
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  autoAuthUser() { // checks local storage
    const authInfo = this.getAuthData()

    if (authInfo){
      const now = new Date();
      const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
      if (expiresIn > 0){
        this.userId = authInfo.userId
        this.token = authInfo.token;
        this.isAuthenticated = true
        this.setAuthTimer(expiresIn / 1000) //subtracting the two times returns a milisecond
        this.authStatusListener.next(true)
        this.getSignedInUserInfo()
        return true;
      } else {
        this.clearAuthData();
        return false;
      }
    } else {
      this.clearAuthData();
      return false;
    }
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable()
  }

  getUserListener() {
    return this.userUpdated.asObservable()
  }

  private getAuthData() {
    const token = localStorage.getItem("token")
    const expirationDate = localStorage.getItem("expiration")
    const userId = localStorage.getItem("userID")
    if (!token || ! expirationDate){
      return
    }
    return {
      token: token,
      expirationDate: new Date (expirationDate),
      userId: userId
    }
  }

  getUserData() {
    return this.getAuthData();
  }
}
