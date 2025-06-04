import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { RegistroComponent } from '../registro/registro.component';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
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
  private lastScrollTop = 0;
  private scrollTimeout: any = null;
  private isScrolling = false;
  usuarioActual: Usuario | null = null;
  estaAutenticado = false;
  esAdmin = false;
  private authSubscription: Subscription | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.obtenerUsuarioActual().subscribe(usuario => {
      this.usuarioActual = usuario;
      this.estaAutenticado = !!usuario;
      this.esAdmin = usuario?.rol === Rol.ADMIN;
    });
  }

  ngOnDestroy(): void {
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const navbar = document.getElementById('mainNavbar');
    if (!navbar) return;

    this.isScrolling = true;

    if (currentScrollTop > 50) {
      navbar.classList.remove('hidden');
      navbar.classList.add('instant-hide');
      navbar.classList.add('overlay');
    } else {
      navbar.classList.remove('overlay');
    }

    this.lastScrollTop = currentScrollTop;

    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }

    this.scrollTimeout = setTimeout(() => {
      this.isScrolling = false;
      navbar.classList.remove('instant-hide');
      navbar.classList.remove('hidden');
    }, 300);
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
  }

  onSwitchToRegister() {
    this.showLoginModal = false;
    this.showRegisterModal = true;
  }
}
