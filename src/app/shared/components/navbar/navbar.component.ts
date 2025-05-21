import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { RegistrarseComponent } from '../registrarse/registrarse.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, LoginComponent, RegistrarseComponent, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  showLoginModal = false;
  showRegisterModal = false;

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
}
