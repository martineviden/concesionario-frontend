import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-editar-perfil',
  imports: [],
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.css'
})
export class EditarPerfilComponent {
  @Output() closeModal = new EventEmitter<void>();

  close() {
      this.closeModal.emit();
    }
}
