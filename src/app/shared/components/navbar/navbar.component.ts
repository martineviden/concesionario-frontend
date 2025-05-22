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
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
  showLoginModal = false;
  showRegisterModal = false;
  private observer: IntersectionObserver | null = null;
  private lastScrollTop = 0;
  private scrollTimeout: any = null;
  private footerVisible = false;
  private isScrolling = false;

  constructor() {}

  ngOnInit(): void {
    // Inicialización básica
  }

  ngAfterViewInit(): void {
    // Configurar el Intersection Observer para detectar cuando el footer es visible
    this.setupFooterObserver();
  }

  ngOnDestroy(): void {
    // Limpiar el observer cuando el componente se destruye
    if (this.observer) {
      this.observer.disconnect();
    }
    
    // Limpiar el timeout si existe
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
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
          this.footerVisible = entry.isIntersecting;
          
          // Cuando el footer es visible/no visible, aplicamos la animación normal
          const navbar = document.getElementById('mainNavbar');
          if (!navbar) return;
          
          // Eliminar la clase de ocultamiento instantáneo
          navbar.classList.remove('instant-hide');
          
          if (this.footerVisible) {
            navbar.classList.add('hidden');
          } else if (!this.isScrolling) {
            // Solo mostrar si no estamos scrolleando
            navbar.classList.remove('hidden');
          }
        });
      },
      {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% del footer visible es suficiente para activar
      }
    );

    this.observer.observe(footer);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const navbar = document.getElementById('mainNavbar');
    if (!navbar) return;
    
    // Actualizar el estado de scrolling
    this.isScrolling = true;
    
    // Si estamos scrolleando y no estamos en la parte superior, ocultar la navbar instantáneamente
    if (currentScrollTop > 50 && !this.footerVisible) {
      navbar.classList.remove('hidden');
      navbar.classList.add('instant-hide');
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
      // a menos que el footer sea visible
      if (!this.footerVisible) {
        navbar.classList.remove('instant-hide');
        navbar.classList.remove('hidden');
      }
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