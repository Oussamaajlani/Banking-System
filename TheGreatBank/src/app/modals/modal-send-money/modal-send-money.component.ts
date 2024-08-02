import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-send-money',
  templateUrl: './modal-send-money.component.html',
  styleUrls: ['./modal-send-money.component.css'],
  template: `<div>
  <h2>Hello {{name}}</h2>
  <button (click)="close()">Close</button>
</div>`
})
export class ModalSendMoneyComponent {
  @Input() name;
  
  close() {
    // Logic to close the modal goes here
  }

}
