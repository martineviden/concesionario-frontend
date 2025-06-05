import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { RegistroComponent } from '../registro/registro.component';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { ToastService } from '../../../../services/toast.service';
import { Usuario } from '../../../../models/login.model';
import { Subscription } from 'rxjs';
import { Rol } from '../../../../models/enums';

@Component({
  selector: 'app-navbar',
  standalone: true,

  imports: [CommonModule, LoginComponent, RegistroComponent, RouterModule],

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  showLoginModal = false;
  showRegisterModal = false;
  usuarioActual: Usuario | null = null;
  estaAutenticado = false;
  esAdmin = false;
  private authSubscription: Subscription | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.obtenerUsuarioActual().subscribe((usuario: Usuario | null) => {
      this.usuarioActual = usuario;
      this.estaAutenticado = !!usuario;
      this.esAdmin = usuario?.rol === Rol.ADMIN;
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  abrirLogin() {
    this.showLoginModal = true;
  }

  abrirRegistro() {
    this.showRegisterModal = true;
  }

  cerrarLogin() {
    this.showLoginModal = false;
  }

  cerrarRegistro() {
    this.showRegisterModal = false;
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
    this.toastService.show({ message: 'Sesión cerrada correctamente', type: 'success' });
    this.router.navigate(['/']);
  }

  onSwitchToRegister() {
    this.showLoginModal = false;
    this.showRegisterModal = true;
  }
}
