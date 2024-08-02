import { Injectable, NgZone } from '@angular/core';
import { User } from '../services/user';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data
  private baseUrl = 'http://localhost:9001/api'; // Change this to match your backend's base URL
  
  constructor(
    private http: HttpClient, // Inject HttpClient
    private router: Router,
    private ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== 'null') {
      this.userData = JSON.parse(storedUser);
    } else {
      this.userData = null;
    }
  }

  // Sign in with email/password
  SignIn(email: string, password: string): Observable<any> {
    const credentials = { username: email, password: password };
    return this.http.post(`${this.baseUrl}/signin`, credentials).pipe(
      switchMap((response: any) => {
        const userId = response.id; // Assuming the response contains the user ID
        return this.http.get<User>(`${this.baseUrl}/User/${userId}`).pipe(
          map((user: User) => {
            this.SetUserData(user);
            this.router.navigate(['dashboard']);
            return user;
          })
        );
      })
    );
  }

  

  // Sign up with email/password
  /*SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationMail();
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  */
  // Send email verification when new user sign up
  SendVerificationMail(email: string): Observable<void> {
    return this.http
      .post<void>(`${this.baseUrl}/auth/send-verification-email`, { email })
      .pipe(
        tap(() => {
          this.router.navigate(['verify-email-address']);
        }),
        catchError((error) => {
          console.error(error);
          return throwError(error);
        })
      );
  }

  ForgotPassword(passwordResetEmail: string): Observable<void> {
    return this.http
      .post<void>(`${this.baseUrl}/auth/forgot-password`, {
        email: passwordResetEmail,
      })
      .pipe(
        tap(() => {
          window.alert('Password reset email sent, check your inbox.');
        }),
        catchError((error) => {
          window.alert(error.message);
          return throwError(error);
        })
      );
  }

  // Returns true when user is logged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  // Setting up user data when sign in with username/password, sign up with username/password and sign in with social auth provider in Firestore database using AngularFirestore + AngularFirestoreDocument service

  SetUserData(user: User): void {
    this.userData = user;
    localStorage.setItem('user', JSON.stringify(this.userData));
  }

  // Sign out
  SignOut(): void {
    this.userData = null;
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }
}
