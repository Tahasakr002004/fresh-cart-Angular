import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, Subject, tap, throwError } from "rxjs";
import { User } from "../models/user.model";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";


export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean; // Optional, used for login responses
}




@Injectable({ providedIn: 'root' })
export class AuthService {


  user = new BehaviorSubject<User | null>(null);
  private tokenExpirationTimer: any;


  // Service logic here
  constructor(private http: HttpClient, private router: Router) {
    // Constructor logic here
  }

  signup(email: string, password: string) {
    // Logic for signing up a user
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseAPIKey, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        );
      })
    );

  }



  login(email: string, password: string) {
    // Logic for logging in a user
    console.log('Logging in with email:', email);
    console.log('Password:', password);
    // Here you would typically make an HTTP request to your backend to authenticate the user
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseAPIKey,
      {
        email,
        password,
        returnSecureToken: true
      }).pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );

  }




  logout() {
    // Logic for logging out a user
    this.user.next(null); // Clear the user data
    console.log('User logged out');
    localStorage.removeItem('userData'); // Remove user data from local storage
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer); // Clear the auto logout timer
    }
    this.tokenExpirationTimer = null; // Reset the timer
    this.router.navigate(['/authentication']); // Navigate to the authentication page
  }






  private handleError(errorRes: any) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email not found.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid password.';
        break;
    }
    return throwError(() => errorMessage);
  }


  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user)); // Store user data in local storage
    console.log('User authenticated:', user);
    this.autoLogout(expiresIn * 1000); // Set auto logout timer
    this.user.next(user);
  }


  autoLogin() {
    // Logic for automatically logging in a user
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData') || '{}');
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (loadedUser.token) {
      this.user.next(loadedUser); // Emit the loaded user
      this.autoLogout(loadedUser.tokenExpirationDate.getTime() - new Date().getTime()); // Set auto logout timer
      console.log('User auto-logged in:', loadedUser);
    } else {
      console.log('No valid user found in local storage');
    }
  }


  autoLogout(expirationDuration: number) {
    // Logic for automatically logging out a user after a certain duration
    console.log('Setting auto logout timer for:', expirationDuration, 'ms');
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout(); // Call logout after the specified duration
    }, expirationDuration);
  }


}
