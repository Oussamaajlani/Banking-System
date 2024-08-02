import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositMoneyComponent } from './deposit-money.component';

describe('DepositMoneyComponent', () => {
  let component: DepositMoneyComponent;
  let fixture: ComponentFixture<DepositMoneyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepositMoneyComponent]
    });
    fixture = TestBed.createComponent(DepositMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
