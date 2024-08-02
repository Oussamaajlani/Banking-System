import { Component , OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent {
  userEmail: string;

  constructor(private authService: AuthService) {
    const storedUser = JSON.parse(localStorage.getItem('user')!);
    if (storedUser) {
      this.userEmail = storedUser.email;
    }
  }

  sendVerificationMail() {
    if (this.userEmail) {
      this.authService.SendVerificationMail(this.userEmail).subscribe({
        next: () => {
          console.log('Verification email sent.');
        },
        error: (error) => {
          console.error('Error sending verification email', error);
        },
      });
    }
  }
}
