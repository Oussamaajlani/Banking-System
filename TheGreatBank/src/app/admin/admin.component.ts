import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { User } from '../shared/services/user';
import { AuthService } from '../testing101/auth.service';

Chart.register(...registerables);

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit, AfterViewInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';
  linesToShow: number = 10; // Default value for lines to show
  currentPage: number = 1;

  isDark = false;
  isSettingsPanelOpen = false;
  isNotificationsPanelOpen = false;
  isSearchPanelOpen = false;
  loading = false;
  open = false;
  isActive = false;
  barChart: Chart | undefined;
  oldServiceCounts: any = {};
  newServiceCounts: any = {};

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.findAllUsers().subscribe(
      (data) => {
        this.users = data;
        this.filteredUsers = this.users; // Initialiser avec tous les utilisateurs
        this.updateServiceCounts();
        this.updateBarChart();
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  onSearchChange(searchTerm: string): void {
    if (!searchTerm) {
      this.filteredUsers = this.users;
    } else {
      this.filteredUsers = this.users.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    this.currentPage = 1; // Reset to first page on search
  }

  onLinesToShowChange(linesToShow: number): void {
    this.linesToShow = linesToShow;
    this.currentPage = 1; // Reset to first page when linesToShow changes
  }

  toggleTheme() {
    this.isDark = !this.isDark;
  }

  openSettingsPanel() {
    this.isSettingsPanelOpen = true;
  }

  openNotificationsPanel() {
    this.isNotificationsPanelOpen = true;
  }

  openSearchPanel() {
    this.isSearchPanelOpen = true;
  }

  toggleMobileMainMenu() {
    // Implement the logic to toggle the mobile main menu
  }

  toggleMobileSubMenu() {
    // Implement the logic to toggle the mobile sub menu
  }

  handleClick(event: Event) {
    event.preventDefault();
    this.open = !this.open;
  }

  ngAfterViewInit(): void {
    this.setup();
  }

  setup() {
    const cssColors = (color: string) => {
      return getComputedStyle(document.documentElement).getPropertyValue(color);
    };

    const getColor = () => {
      return window.localStorage.getItem('color') ?? 'cyan';
    };

    const colors = {
      primary: cssColors(`--color-${getColor()}`),
      primaryLight: cssColors(`--color-${getColor()}-light`),
      primaryLighter: cssColors(`--color-${getColor()}-lighter`),
      primaryDark: cssColors(`--color-${getColor()}-dark`),
      primaryDarker: cssColors(`--color-${getColor()}-darker`),
    };

    const barChartElement = document.getElementById(
      'barChart'
    ) as HTMLCanvasElement;
    if (barChartElement) {
      this.barChart = new Chart(barChartElement, {
        type: 'bar',
        data: {
          labels: [
            'Credit Card',
            'Saving Account',
            'Guarantees',
            'Current Accounts',
            'Derivada Account',
            'Payroll Account',
            'Junior Account',
            'Mas Particular Account',
            'Particular Account',
            'Particular Plus Account',
            'Short Term Deposits',
            'Medium Term Deposits',
            'Long Term Deposits',
            'E-Account',
            'Funds',
            'Mortgage',
            'Pensions',
            'Loans',
            'Taxes',
            'Securities',
            'Home Account',
            'Payroll',
            'Pensions Two',
            'Direct Debit',
          ],
          datasets: [
            {
              label: 'Old Values',
              data: [],
              backgroundColor: colors.primary,
              hoverBackgroundColor: colors.primaryDark,
              borderRadius: 2,
            },
            {
              label: 'New Values',
              data: [],
              backgroundColor: colors.primaryLight,
              hoverBackgroundColor: colors.primaryDarker,
              borderRadius: 2,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 50,
                font: {
                  size: 12,
                  family: 'Open Sans, sans-serif',
                },
                color: '#97a4af',
                padding: 10,
              },
              grid: {
                display: false,
              },
            },
            x: {
              ticks: {
                font: {
                  size: 12,
                  family: 'Open Sans, sans-serif',
                },
                color: '#97a4af',
                padding: 5,
              },
              grid: {
                display: false,
              },
            },
          },
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
            },
          },
        },
      });
    }
  }

  updateServiceCounts() {
    this.oldServiceCounts = {
      creditCard: 0,
      savingAccount: 0,
      guarantees: 0,
      currentAccounts: 0,
      derivadaAccount: 0,
      payrollAccount: 0,
      juniorAccount: 0,
      masParticularAccount: 0,
      particularAccount: 0,
      particularPlusAccount: 0,
      shortTermDeposits: 0,
      mediumTermDeposits: 0,
      longTermDeposits: 0,
      eAccount: 0,
      funds: 0,
      mortgage: 0,
      pensions: 0,
      loans: 0,
      taxes: 0,
      securities: 0,
      homeAccount: 0,
      payroll: 0,
      pensionsTwo: 0,
      directDebit: 0,
    };

    this.users.forEach((user) => {
      if (user.creditCard == 1) this.oldServiceCounts.creditCard++;
      if (user.savingAccount == 1) this.oldServiceCounts.savingAccount++;
      if (user.guarantees == 1) this.oldServiceCounts.guarantees++;
      if (user.currentAccounts == 1) this.oldServiceCounts.currentAccounts++;
      if (user.derivadaAccount == 1) this.oldServiceCounts.derivadaAccount++;
      if (user.payrollAccount == 1) this.oldServiceCounts.payrollAccount++;
      if (user.juniorAccount == 1) this.oldServiceCounts.juniorAccount++;
      if (user.masParticularAccount == 1)
        this.oldServiceCounts.masParticularAccount++;
      if (user.particularAccount == 1)
        this.oldServiceCounts.particularAccount++;
      if (user.particularPlusAccount == 1)
        this.oldServiceCounts.particularPlusAccount++;
      if (user.shortTermDeposits == 1)
        this.oldServiceCounts.shortTermDeposits++;
      if (user.mediumTermDeposits == 1)
        this.oldServiceCounts.mediumTermDeposits++;
      if (user.longTermDeposits == 1) this.oldServiceCounts.longTermDeposits++;
      if (user.eaccount == 1) this.oldServiceCounts.eAccount++;
      if (user.funds == 1) this.oldServiceCounts.funds++;
      if (user.mortgage == 1) this.oldServiceCounts.mortgage++;
      if (user.pensions == 1) this.oldServiceCounts.pensions++;
      if (user.loans == 1) this.oldServiceCounts.loans++;
      if (user.taxes == 1) this.oldServiceCounts.taxes++;
      if (user.securities == 1) this.oldServiceCounts.securities++;
      if (user.homeAccount == 1) this.oldServiceCounts.homeAccount++;
      if (user.payroll == 1) this.oldServiceCounts.payroll++;
      if (user.pensionsTwo == 1) this.oldServiceCounts.pensionsTwo++;
      if (user.directDebit == 1) this.oldServiceCounts.directDebit++;
    });

    // Initialize newServiceCounts with the same values as oldServiceCounts
    this.newServiceCounts = {};
  }

  updateBarChart() {
    if (this.barChart) {
      this.barChart.data.datasets[0].data = Object.values(
        this.oldServiceCounts
      );
      this.barChart.data.datasets[1].data = Object.values(
        this.newServiceCounts
      );
      this.barChart.update();
    }
  }

  updateUsersWithRecommendedServices() {
    const userPromises = this.users.map((user) =>
      this.authService
        .getCustomerServices(user.id)
        .toPromise()
        .then((response) => {
          console.log('njarbou');
          console.log(response);

          const recommendedService = response.recommended_service;

          switch (recommendedService) {
            case 'Current Accounts':
              if (user.currentAccounts != 1) user.currentAccounts = 2;
              break;
            case 'Derivada Account':
              if (user.derivadaAccount != 1) user.derivadaAccount = 2;
              break;
            case 'Payroll Account':
              if (user.payrollAccount != 1) user.payrollAccount = 2;
              break;
            case 'Junior Account':
              if (user.juniorAccount != 1) user.juniorAccount = 2;
              break;
            case 'Más particular Account':
              if (user.masParticularAccount != 1) user.masParticularAccount = 2;
              break;
            case 'particular Account':
              if (user.particularAccount != 1) user.particularAccount = 2;
              break;
            case 'particular Plus Account':
              if (user.particularPlusAccount != 1)
                user.particularPlusAccount = 2;
              break;
            case 'Short-term deposits':
              if (user.shortTermDeposits != 1) user.shortTermDeposits = 2;
              break;
            case 'Medium-term deposits':
              if (user.mediumTermDeposits != 1) user.mediumTermDeposits = 2;
              break;
            case 'Long-term deposits':
              if (user.longTermDeposits != 1) user.longTermDeposits = 2;
              break;
            case 'e-account':
              if (user.eaccount != 1) user.eaccount = 2;
              break;
            case 'Funds':
              if (user.funds != 1) user.funds = 2;
              break;
            case 'Mortgage':
              if (user.mortgage != 1) user.mortgage = 2;
              break;
            case 'PensionsOne':
              if (user.pensions != 1) user.pensions = 2;
              break;
            case 'Loans':
              if (user.loans != 1) user.loans = 2;
              break;
            case 'Taxes':
              if (user.taxes != 1) user.taxes = 2;
              break;
            case 'Credit Card':
              if (user.creditCard != 1) user.creditCard = 2;
              break;
            case 'Securities':
              if (user.securities != 1) user.securities = 2;
              break;
            case 'Home Account':
              if (user.homeAccount != 1) user.homeAccount = 2;
              break;
            case 'Payroll':
              if (user.payroll != 1) user.payroll = 2;
              break;
            case 'PensionsTwo':
              if (user.pensionsTwo != 1) user.pensionsTwo = 2;
              break;
            case 'Direct Debit':
              if (user.directDebit != 1) user.directDebit = 2;
              break;
            default:
              console.warn(`Unknown service: ${recommendedService}`);
          }
        })
    );

    Promise.all(userPromises)
      .then(() => {
        this.updateNewServiceCounts();
        this.updateBarChart();
      })
      .catch((error) => {
        console.error('Error updating user services:', error);
      });
  }

  updateNewServiceCounts() {
    // Reset newServiceCounts to zero
    this.newServiceCounts = {
      creditCard: 0,
      savingAccount: 0,
      guarantees: 0,
      currentAccounts: 0,
      derivadaAccount: 0,
      payrollAccount: 0,
      juniorAccount: 0,
      masParticularAccount: 0,
      particularAccount: 0,
      particularPlusAccount: 0,
      shortTermDeposits: 0,
      mediumTermDeposits: 0,
      longTermDeposits: 0,
      eAccount: 0,
      funds: 0,
      mortgage: 0,
      pensions: 0,
      loans: 0,
      taxes: 0,
      securities: 0,
      homeAccount: 0,
      payroll: 0,
      pensionsTwo: 0,
      directDebit: 0,
    };

    this.users.forEach((user) => {
      if (user.creditCard == 1 || user.creditCard == 2)
        this.newServiceCounts.creditCard++;
      if (user.savingAccount == 1 || user.savingAccount == 2)
        this.newServiceCounts.savingAccount++;
      if (user.guarantees == 1 || user.guarantees == 2)
        this.newServiceCounts.guarantees++;
      if (user.currentAccounts == 1 || user.currentAccounts == 2)
        this.newServiceCounts.currentAccounts++;
      if (user.derivadaAccount == 1 || user.derivadaAccount == 2)
        this.newServiceCounts.derivadaAccount++;
      if (user.payrollAccount == 1 || user.payrollAccount == 2)
        this.newServiceCounts.payrollAccount++;
      if (user.juniorAccount == 1 || user.juniorAccount == 2)
        this.newServiceCounts.juniorAccount++;
      if (user.masParticularAccount == 1 || user.masParticularAccount == 2)
        this.newServiceCounts.masParticularAccount++;
      if (user.particularAccount == 1 || user.particularAccount == 2)
        this.newServiceCounts.particularAccount++;
      if (user.particularPlusAccount == 1 || user.particularPlusAccount == 2)
        this.newServiceCounts.particularPlusAccount++;
      if (user.shortTermDeposits == 1 || user.shortTermDeposits == 2)
        this.newServiceCounts.shortTermDeposits++;
      if (user.mediumTermDeposits == 1 || user.mediumTermDeposits == 2)
        this.newServiceCounts.mediumTermDeposits++;
      if (user.longTermDeposits == 1 || user.longTermDeposits == 2)
        this.newServiceCounts.longTermDeposits++;
      if (user.eaccount == 1 || user.eaccount == 2)
        this.newServiceCounts.eAccount++;
      if (user.funds == 1 || user.funds == 2) this.newServiceCounts.funds++;
      if (user.mortgage == 1 || user.mortgage == 2)
        this.newServiceCounts.mortgage++;
      if (user.pensions == 1 || user.pensions == 2)
        this.newServiceCounts.pensions++;
      if (user.loans == 1 || user.loans == 2) this.newServiceCounts.loans++;
      if (user.taxes == 1 || user.taxes == 2) this.newServiceCounts.taxes++;
      if (user.securities == 1 || user.securities == 2)
        this.newServiceCounts.securities++;
      if (user.homeAccount == 1 || user.homeAccount == 2)
        this.newServiceCounts.homeAccount++;
      if (user.payroll == 1 || user.payroll == 2)
        this.newServiceCounts.payroll++;
      if (user.pensionsTwo == 1 || user.pensionsTwo == 2)
        this.newServiceCounts.pensionsTwo++;
      if (user.directDebit == 1 || user.directDebit == 2)
        this.newServiceCounts.directDebit++;
    });
  }

  resetToInitialValues() {
    this.authService.findAllUsers().subscribe(
      (data) => {
        this.users = data;
        this.filteredUsers = this.users; // Initialiser avec tous les utilisateurs
        this.updateServiceCounts();
        this.updateBarChart();
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
    this.filteredUsers = [...this.users]; // Réinitialise filteredUsers à tous les utilisateurs
    this.newServiceCounts = {};
    this.updateBarChart();
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage * this.linesToShow < this.filteredUsers.length) {
      this.currentPage++;
    }
  }

  getDisplayedUsers(): User[] {
    const startIndex = (this.currentPage - 1) * this.linesToShow;
    return this.filteredUsers.slice(startIndex, startIndex + this.linesToShow);
  }
}
