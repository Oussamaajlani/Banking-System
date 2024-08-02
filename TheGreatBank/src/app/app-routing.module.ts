import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginScreenComponent } from './login/login-screen/login-screen.component';
import { SignUpScreenComponent } from './user-registration/sign-up-screen/sign-up-screen.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { TestComponent } from './test/test.component';
import { QuickTransactionsComponent } from './quick-transactions/quick-transactions.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  {path:'admin',component: AdminComponent},
  { path: 'dashboard', component: DashBoardComponent },
  { path: 'login', component: LoginScreenComponent },
  { path: 'signup', component: SignUpScreenComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'test', component: TestComponent },
  { path: 'quick', component: QuickTransactionsComponent }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
