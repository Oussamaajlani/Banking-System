import { Component , OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  constructor(private authService: AuthService) {}

  signIn(username: string, password: string) {
    this.authService.SignIn(username, password).subscribe(
      (response) => {
        // Handle successful login, e.g., store token, redirect, etc.
        console.log('Login successful', response);
      },
      (error) => {
        // Handle login error
        console.error('Login failed', error);
      }
    );
  }
}
