import { Component } from '@angular/core';
import { EditarPerfilComponent } from "../editar-perfil/editar-perfil.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil-admin',
  imports: [EditarPerfilComponent, CommonModule],
  templateUrl: './perfil-admin.component.html',
  styleUrl: './perfil-admin.component.css'
})
export class PerfilAdminComponent {

  showEditPerfilModal = false;
  abrirEditPerfil() {
    this.showEditPerfilModal = true;
  }
  cerrarEditPerfil() {
    this.showEditPerfilModal = false;
  }
}
