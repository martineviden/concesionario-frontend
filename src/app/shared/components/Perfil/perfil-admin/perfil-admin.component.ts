import { Component, OnInit } from '@angular/core';
import { EditarPerfilComponent } from "../editar-perfil/editar-perfil.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { Usuario } from '../../../../models/login.model';
import { Subscription } from 'rxjs';
import { Rol } from '../../../../models/enums';
import { HistorialDeReservasComponent } from '../../historial-de-reservas/historial-de-reservas.component';
import { CambiarContrasenaComponent } from '../cambiar-contrasena/cambiar-contrasena.component';

@Component({
  selector: 'app-perfil-admin',
  imports: [EditarPerfilComponent, CommonModule, RouterModule, CambiarContrasenaComponent, HistorialDeReservasComponent],
  templateUrl: './perfil-admin.component.html',
  styleUrl: './perfil-admin.component.css'
})
export class PerfilAdminComponent implements OnInit {
  usuarioActual: Usuario | null = null;
  usuarioSubscription: Subscription | null = null;
  showEditPerfilModal = false;
  esCliente = false;
  showHistorialReservasModal = false;
  showCambioContrasenaModal = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Nosotros nos suscribimos al observable para obtener los datos del usuario actual
    this.usuarioSubscription = this.authService.obtenerUsuarioActual().subscribe(usuario => {
      this.usuarioActual = usuario;
      this.esCliente = usuario?.rol === Rol.CLIENTE;
    });
  }

  abrirEditPerfil() {
    this.showEditPerfilModal = true;
  }
  cerrarEditPerfil() {
    this.showEditPerfilModal = false;
  }

  abrirHistorialReservas() {
    // Incluimos la lógica para mostrar el modal de historial de reservas
    this.showHistorialReservasModal = true;
  }

  abrirCambioContrasena() {
    this.showCambioContrasenaModal = true;
  }

  ngOnDestroy() {
    // Nosotros liberamos la suscripción para evitar fugas de memoria
    this.usuarioSubscription?.unsubscribe();
  }
}
