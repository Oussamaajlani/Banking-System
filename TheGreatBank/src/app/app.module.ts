import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MainComponent } from './main/main.component';
import { RecentTransactionsComponent } from './recent-transactions/recent-transactions.component';
import { AvailableBalanceComponent } from './available-balance/available-balance.component';
import { SavingsComponent } from './savings/savings.component';
import { QuickTransactionsComponent } from './quick-transactions/quick-transactions.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchComponent } from './search/search.component';

import { FormsModule } from '@angular/forms';
import { BannerComponent } from './banner/banner.component';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ToolBarComponent } from './components/tool-bar/tool-bar.component';
import { ImageSectionComponent } from './Image-sections/image-section/image-section.component';
import { ImageSection2Component } from './Image-sections/image-section2/image-section2.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { LoginScreenComponent } from './login/login-screen/login-screen.component';
import { SignUpComponent } from './user-registration/sign-up/sign-up.component';
import { SignUpScreenComponent } from './user-registration/sign-up-screen/sign-up-screen.component';

//firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ModalSendMoneyComponent } from './modals/modal-send-money/modal-send-money.component';
import { TransferFundsComponent } from './modals/transfer-funds/transfer-funds.component';
import { RecurringPaymentsComponent } from './modals/recurring-payments/recurring-payments.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TestComponent } from './test/test.component';
import { DepositMoneyComponent } from './modals/deposit-money/deposit-money.component';
import { CustomCurrencyPipe } from './custom-currency.pipe';  // Import the custom pipe
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { WithdrawComponent } from './modals/withdraw/withdraw.component';

import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideNavComponent,
    MainComponent,
    RecentTransactionsComponent,
    AvailableBalanceComponent,
    SavingsComponent,
    QuickTransactionsComponent,
    SearchComponent,
    BannerComponent,
    DashBoardComponent,
    LandingPageComponent,
    ToolBarComponent,
    ImageSectionComponent,
    ImageSection2Component,
    LoginFormComponent,
    LoginScreenComponent,
    SignUpComponent,
    SignUpScreenComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    ModalSendMoneyComponent,
    TransferFundsComponent,
    RecurringPaymentsComponent,
    TestComponent,
    DepositMoneyComponent,
    CustomCurrencyPipe,
    WithdrawComponent,

    AdminComponent, // added
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule, // add this line
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    NgbModule,
    HttpClientModule, //http module added
    MatSnackBarModule, //  MatSnackBarModule is imported
    BrowserAnimationsModule, // Required for Toastr animations
    ToastrModule.forRoot({
      enableHtml: true, // Enable HTML
      closeButton: true,
      timeOut: 3000,
      extendedTimeOut: 1000,
      positionClass: 'toast-top-center',
      tapToDismiss: true,
      progressBar: true,
      progressAnimation: 'increasing',
      maxOpened: 0,
      preventDuplicates: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
