import { Component , OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent implements OnInit {
  constructor(private router: Router, public authService: AuthService) {}
  ngOnInit(): void {}
  navigateToSignup(): void {
    this.router.navigate(['/signup']);
  }
}
