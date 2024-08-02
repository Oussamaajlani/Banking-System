import { Component, OnInit } from '@angular/core';
import { AuthService } from '../testing101/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-available-balance',
  templateUrl: './available-balance.component.html',
  styleUrls: ['./available-balance.component.css'],
})

export class AvailableBalanceComponent implements OnInit {
  userProfile: any = {};
  balance: any = null;
  

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const storedUser = JSON.parse(localStorage.getItem('user')!);
console.log("balance")
    if (storedUser && storedUser.id) {
      this.authService.getUserInfo(storedUser.id).subscribe({
        next: (data) => {
          this.userProfile = data;
          this.balance = data.balance;
        },
        error: (error) => {
          console.error('Error fetching user profile', error);
        },
      });
    }
  }
}
