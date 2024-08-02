// src/app/banking.service.ts
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BankingService {
  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {}

  async deposit(amount: number, accountType: string): Promise<void> {
    const user = await this.afAuth.currentUser;
    if (user) {
      const uid = user.uid;
      const balanceRef = this.db.object<number>(`/users/${uid}/balances/${accountType}`);
      return new Promise<void>((resolve, reject) => {
        balanceRef.valueChanges().pipe(take(1)).subscribe(currentBalance => {
          const updatedBalance = (currentBalance as number) + amount;
          balanceRef.set(updatedBalance).then(resolve).catch(reject);
        });
      });
    } else {
      return Promise.reject('User not authenticated');
    }
  }
}
