import { Component, OnInit } from '@angular/core';
import { AuthService } from '../testing101/auth.service';
import { User } from '../shared/services/user';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userProfile: any = {};

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const storedUser = JSON.parse(localStorage.getItem('user')!);
    console.log("salem")
    console.log(storedUser);
    if (storedUser && storedUser.id) {
      this.authService.getUserInfo(storedUser.id).subscribe({
        next: (data) => {
          this.userProfile = data;
        },
        error: (error) => {
          console.error('Error fetching user profile', error);
        },
      });
    }
  }
}
