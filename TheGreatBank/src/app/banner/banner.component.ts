// banner.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../testing101/auth.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
})
export class BannerComponent implements OnInit {
  userProfile: any = {};

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const storedUser = JSON.parse(localStorage.getItem('user')!);

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
