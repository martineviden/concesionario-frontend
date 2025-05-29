import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { EditarPerfilComponent } from "../editar-perfil/editar-perfil.component";
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { Usuario } from '../../../models/login.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-perfil-admin',
  imports: [EditarPerfilComponent, CommonModule],
  templateUrl: './perfil-admin.component.html',
  styleUrl: './perfil-admin.component.css'
})
export class PerfilAdminComponent implements OnInit, AfterViewInit, OnDestroy {
  usuarioActual: Usuario | null = null;
  usuarioSubscription: Subscription | null = null;
  showEditPerfilModal = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Nosotros nos suscribimos al observable para obtener los datos del usuario actual
    this.usuarioSubscription = this.authService.obtenerUsuarioActual().subscribe(usuario => {
      this.usuarioActual = usuario;
    });
  }

  ngAfterViewInit() {
    // Nosotros aplicamos animaciones smooth al cargar los elementos
    this.setupIntersectionObserver();
  }

  setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, options);
    document.querySelectorAll('.animate-element').forEach((el) => {
      observer.observe(el);
    });
  }

  abrirEditPerfil() {
    this.showEditPerfilModal = true;
  }
  cerrarEditPerfil() {
    this.showEditPerfilModal = false;
  }

  ngOnDestroy() {
    // Nosotros liberamos la suscripción para evitar fugas de memoria
    this.usuarioSubscription?.unsubscribe();
  }
}
