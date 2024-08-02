import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/testing101/auth.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-deposit-money',
  templateUrl: './deposit-money.component.html',
  styleUrls: ['./deposit-money.component.css'],
})
export class DepositMoneyComponent {
  amount: any = 0;
  accountType: string = 'chequeAccount';
  showForm: boolean = true;
  userId: any = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService ,

  ) {}

  onSubmit() {
    const storedUser = JSON.parse(localStorage.getItem('user')!);
    if (storedUser && storedUser.id) {
      if (this.amount <= 0) {
        // Using ToastrService instead of MatSnackBar
        this.toastr.error('Invalid Amount', 'Error!', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        return;
      }

      this.authService.getUserInfo(storedUser.id).subscribe({
        next: (data) => {
          this.userId = data.id;
          this.authService
            .recordTransaction(this.userId, 'depot', this.amount)
            .subscribe({
              next: () => {const currentUrl = this.router.url;
              this.router
                .navigateByUrl('/', { skipLocationChange: true })
                .then(() => {
                  this.router.navigate([currentUrl]); // Navigate back to the current url
                  this.toastr.success('Deposit done successfully');
                });

              },
              error: (error) => {
                console.error('Failed to record transaction:', error);
                this.toastr.error(
                  'Transaction failed. Please try again.',
                  'Error!',
                  {
                    closeButton: true,
                    timeOut: 5000,
                  }
                );
              },
            });
        },
        error: (error) => {
          console.error('Error fetching user profile', error);
          this.toastr.error(
            'Error fetching user profile. Please retry.',
            'Error!',
            {
              closeButton: true,
              timeOut: 5000,
            }
          );
        },
      });
    }
    this.router.navigate(['/dashboard']);
  }

  cancel() {
    this.showForm = false;
  }
}
