import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-registrarse',
  imports: [],
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.css'
})
export class RegistrarseComponent {
  @Output() closeModal = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }
}
