import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSendMoneyComponent } from './modal-send-money.component';

describe('ModalSendMoneyComponent', () => {
  let component: ModalSendMoneyComponent;
  let fixture: ComponentFixture<ModalSendMoneyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalSendMoneyComponent]
    });
    fixture = TestBed.createComponent(ModalSendMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
