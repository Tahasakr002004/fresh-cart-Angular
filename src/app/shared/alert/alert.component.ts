import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: false,
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {

  @Input() message!: string;
  @Output() close = new EventEmitter<void>();




  onClose() {
    // Logic to close the alert
    this.close.emit();
  }

}
