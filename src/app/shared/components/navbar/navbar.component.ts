import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
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
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
  showLoginModal = false;
  showRegisterModal = false;
  private observer: IntersectionObserver | null = null;

  constructor() {}

  ngOnInit(): void {
    // Inicializacion
  }

  ngAfterViewInit(): void {
    // para que desaparezca
    this.setupFooterObserver();
  }

  ngOnDestroy(): void {
    // Limpiar 
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupFooterObserver(): void {
    const footer = document.querySelector('.footer');
    if (!footer) {
      console.warn('Footer no encontrado, el efecto de desaparición no funcionará correctamente');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const navbar = document.getElementById('mainNavbar');
          if (!navbar) return;

          if (entry.isIntersecting) {
            // si footer es visible se oculta  navbar
            navbar.classList.add('hidden');
          } else {
            // lo opuesto
            navbar.classList.remove('hidden');
          }
        });
      },
      {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% del footer
      }
    );

    this.observer.observe(footer);
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