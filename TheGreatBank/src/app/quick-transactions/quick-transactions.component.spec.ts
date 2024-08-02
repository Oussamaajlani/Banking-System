import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickTransactionsComponent } from './quick-transactions.component';

describe('QuickTransactionsComponent', () => {
  let component: QuickTransactionsComponent;
  let fixture: ComponentFixture<QuickTransactionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuickTransactionsComponent]
    });
    fixture = TestBed.createComponent(QuickTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
