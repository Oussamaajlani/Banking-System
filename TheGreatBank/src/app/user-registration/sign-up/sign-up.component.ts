import { Component } from '@angular/core';
import { AuthService } from 'src/app/testing101/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const formValue = form.value;
      const userInformation = {
        ...formValue,
        newCust: formValue.accountOptions.includes('newCust') ? 1 : 0,
        residenceIndex: formValue.accountOptions.includes('residenceIndex')
          ? 1
          : 0,
        foreignerIndex: formValue.accountOptions.includes('foreignerIndex')
          ? 1
          : 0,
        spouseIndex: formValue.accountOptions.includes('spouseIndex') ? 1 : 0,
        deceasedIndex: formValue.accountOptions.includes('deceasedIndex')
          ? 1
          : 0,
        activityIndex: formValue.accountOptions.includes('activityIndex')
          ? 1
          : 0,
        savingAccount: formValue.accountOptions.includes('savingAccount')
          ? 1
          : 0,
        guarantees: formValue.accountOptions.includes('guarantees') ? 1 : 0,
        currentAccounts: formValue.accountOptions.includes('currentAccounts')
          ? 1
          : 0,
        derivadaAccount: formValue.accountOptions.includes('derivadaAccount')
          ? 1
          : 0,
        payrollAccount: formValue.accountOptions.includes('payrollAccount')
          ? 1
          : 0,
        juniorAccount: formValue.accountOptions.includes('juniorAccount')
          ? 1
          : 0,
        masParticularAccount: formValue.accountOptions.includes(
          'masParticularAccount'
        )
          ? 1
          : 0,
        particularAccount: formValue.accountOptions.includes(
          'particularAccount'
        )
          ? 1
          : 0,
        particularPlusAccount: formValue.accountOptions.includes(
          'particularPlusAccount'
        )
          ? 1
          : 0,
        shortTermDeposits: formValue.accountOptions.includes(
          'shortTermDeposits'
        )
          ? 1
          : 0,
        mediumTermDeposits: formValue.accountOptions.includes(
          'mediumTermDeposits'
        )
          ? 1
          : 0,
        longTermDeposits: formValue.accountOptions.includes('longTermDeposits')
          ? 1
          : 0,
        eAccount: formValue.accountOptions.includes('eAccount') ? 1 : 0,
        funds: formValue.accountOptions.includes('funds') ? 1 : 0,
        mortgage: formValue.accountOptions.includes('mortgage') ? 1 : 0,
        pensions: formValue.accountOptions.includes('pensions') ? 1 : 0,
        loans: formValue.accountOptions.includes('loans') ? 1 : 0,
        taxes: formValue.accountOptions.includes('taxes') ? 1 : 0,
        creditCard: formValue.accountOptions.includes('creditCard') ? 1 : 0,
        securities: formValue.accountOptions.includes('securities') ? 1 : 0,
        homeAccount: formValue.accountOptions.includes('homeAccount') ? 1 : 0,
        payroll: formValue.accountOptions.includes('payroll') ? 1 : 0,
        pensionsTwo: formValue.accountOptions.includes('pensionsTwo') ? 1 : 0,
        directDebit: formValue.accountOptions.includes('directDebit') ? 1 : 0,
        balance: 0, // Set balance to 0
        transactions: [], // Add empty transactions array
      };
      console.log(userInformation);
      this.authService.registerUser(userInformation).subscribe(
        () => {
          console.log('User registered successfully!');
          form.reset();
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
