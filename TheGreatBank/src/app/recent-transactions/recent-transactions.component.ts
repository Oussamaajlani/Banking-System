import { Component, OnInit } from '@angular/core';
import { Transaction } from '../shared/services/transaction';
import { AuthService } from '../testing101/auth.service';

@Component({
  selector: 'app-recent-transactions',
  templateUrl: './recent-transactions.component.html',
  styleUrls: ['./recent-transactions.component.css'],
})
export class RecentTransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  userProfile: any = {};
  userId: any = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const storedUser = JSON.parse(localStorage.getItem('user')!);
    if (storedUser && storedUser.id) {
      this.authService.getUserInfo(storedUser.id).subscribe({
        next: (data) => {
          this.userId = data.id;
          this.userProfile = data; // Store the user profile if needed

          if (data.transactions && Array.isArray(data.transactions)) {
            this.transactions = data.transactions.sort((a, b) => {
              return (
                this.parseDateString(b.timestamp).getTime() -
                this.parseDateString(a.timestamp).getTime()
              );
            });
          }
        },
        error: (error) => {
          console.error('Error fetching user profile', error);
        },
      });
    }
  }

  // Helper method to parse the custom date format
  parseDateString(dateString: string): Date {
    // Assumes format "YYYY-MM-DD HH:mm"
    return new Date(dateString.replace(' ', 'T') + ':00'); // Appends seconds and uses 'T' to comply with ISO format
  }
}
