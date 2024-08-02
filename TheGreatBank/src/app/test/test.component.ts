import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../testing101/auth.service';
import { Router } from '@angular/router'; // Import the Router

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent {
  constructor(private authService: AuthService, private router: Router) {} // Inject the Router

  onSubmit(form: NgForm) {
    if (form.valid) {
      const userInformation = form.value;
      this.authService.registerUser(userInformation).subscribe(
        () => {
          console.log('User registered successfully!');
          form.reset();
          this.router.navigate(['/login']); // Use the router to navigate
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
