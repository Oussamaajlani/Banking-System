import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringPaymentsComponent } from './recurring-payments.component';

describe('RecurringPaymentsComponent', () => {
  let component: RecurringPaymentsComponent;
  let fixture: ComponentFixture<RecurringPaymentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecurringPaymentsComponent]
    });
    fixture = TestBed.createComponent(RecurringPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
