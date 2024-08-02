import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Transaction } from '../shared/services/transaction';
import { User } from '../shared/services/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:9001/api'; // Change this to match your backend's base URL
  private flaskApiUrl = 'http://localhost:5000/recommend'; // URL for the Flask API

  constructor(private http: HttpClient, public router: Router) {}

  generateAccountNumber(): string {
    // Generate a random 10-digit account number
    const accountNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
    return accountNumber.toString();
  }

  // Get user info
  getUserInfo(uid: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/User/${uid}`).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  // Get balances
  getBalances(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/User/${id}/balances`).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  // Get transactions
  getTransactions(userId: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(
      `${this.baseUrl}/${userId}/transactions`
    );
  }

  registerUser(userInformation: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/insert`, userInformation);
  }

  // Record transactions to db
  recordTransaction(
    userId: string,
    type: string,
    amount: any
  ): Observable<any> {
    const url = `${this.baseUrl}/User/${userId}/transactions`;
    const transaction: any = { type, amount };
    console.log(type);
    console.log(amount);
    return this.http.post<any>(url, transaction).pipe(
      catchError((error) => {
        console.error('Error adding transaction:', error);
        return throwError(error);
      })
    );
  }

  UpdateData(userId: any) {
    return this.http.get<User>(`${this.baseUrl}/User/${userId}`).pipe(
      tap((user: User) => {
        // Use tap for side effects
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['dashboard']);
      }),
      catchError((error) => {
        console.error('Error fetching user data:', error);
        return throwError(error);
      })
    );
  }

  // Update balances once deposited

  findAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/findAll`).pipe(
      catchError((error) => {
        console.error('Error finding users:', error);
        return throwError(error);
      })
    );
  }

  // Get services for a customer by ID
  getCustomerServices(customerId: string): Observable<any> {
    

    return this.http.post<any>(this.flaskApiUrl, { user_id: customerId }).pipe(
      catchError((error) => {
        console.error('Error fetching customer services', error);
        return throwError(error);
      })
    );
  }
}
