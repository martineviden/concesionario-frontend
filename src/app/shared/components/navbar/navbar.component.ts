import { Component, OnInit, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { RegistroComponent } from '../registro/registro.component';
import { RouterModule } from '@angular/router';

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

  constructor() {}

  ngOnInit(): void {
    // Inicialización básica
  }

  ngOnDestroy(): void {
    // Limpiar el timeout si existe
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const navbar = document.getElementById('mainNavbar');
    if (!navbar) return;
    
    // Actualizar el estado de scrolling
    this.isScrolling = true;
    
    // Si estamos scrolleando y no estamos en la parte superior, ocultar la navbar instantáneamente
    if (currentScrollTop > 50) {
      navbar.classList.remove('hidden');
      navbar.classList.add('instant-hide');
      navbar.classList.add('overlay');
    } else {
      navbar.classList.remove('overlay');
    }
    
    // Actualizar la posición de scroll para la próxima vez
    this.lastScrollTop = currentScrollTop;
    
    // Reiniciar el temporizador cada vez que se detecta scroll
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
    
    // Configurar un nuevo temporizador para detectar cuando el scroll se detiene
    this.scrollTimeout = setTimeout(() => {
      this.isScrolling = false;
      
      // Cuando el scroll se detiene completamente, mostrar la navbar con animación
      navbar.classList.remove('instant-hide');
      navbar.classList.remove('hidden');
    }, 300); // Esperar 300ms después del último evento de scroll
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
}