import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from '../../../../services/usuario.service';
import { AuthService } from '../../../../services/auth.service';
import { ToastService } from '../../../../services/toast.service';
import { Usuario } from '../../../../models/login.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.css'
})
export class EditarPerfilComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();
  @Input() usuarioActual: Usuario | null = null;
  @Input() show = true;

  perfilForm: FormGroup;
  cargando = false;
  mensaje = '';
  error = false;
  toastVisible = false;
  toastMensaje = '';

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private toastService: ToastService
  ) {
    this.perfilForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      contrasena_actual: [''],
      nueva_contrasena: ['']
    });
  }

  ngOnInit() {
    if (this.usuarioActual) {
      this.perfilForm.patchValue({
        nombre: this.usuarioActual.nombre,
        apellidos: this.usuarioActual.apellidos,
        correo: this.usuarioActual.correo,
        telefono: this.usuarioActual.telefono
      });
    } else {
      this.authService.obtenerUsuarioActual().subscribe(usuario => {
        if (usuario) {
          this.perfilForm.patchValue({
            nombre: usuario.nombre,
            apellidos: usuario.apellidos,
            correo: usuario.correo,
            telefono: usuario.telefono
          });
        }
      });
    }
  }

  close() {
    this.closeModal.emit();
  }

  onSubmit() {
    if (this.perfilForm.invalid) return;
    this.cargando = true;
    this.mensaje = '';
    this.error = false;
    const { nombre, apellidos, correo, telefono } = this.perfilForm.value;
    let usuarioId = this.usuarioActual?.id;
    if (!usuarioId) {
      const usuarioLS = localStorage.getItem('usuario');
      if (usuarioLS) usuarioId = JSON.parse(usuarioLS).id;
    }
    if (usuarioId === undefined || usuarioId === null) {
      this.mensaje = 'No se pudo identificar el usuario.';
      this.error = true;
      this.cargando = false;
      return;
    }
    const updateData: any = {
      nombre,
      apellidos,
      correo,
      telefono,
      rol: this.usuarioActual?.rol
    };
    this.usuarioService.updateUsuario(String(usuarioId), updateData).subscribe({
      next: (res: any) => {
        this.mensaje = '';
        this.error = false;
        this.toastService.show({ message: 'Perfil actualizado correctamente', type: 'success' });
        this.authService.obtenerUsuarioActual().subscribe(usuario => {
          if (usuario) {
            const actualizado = { ...usuario, nombre, apellidos, correo, telefono };
            localStorage.setItem('usuario', JSON.stringify(actualizado));
          }
        }).unsubscribe();
        this.close();
      },
      error: (err: any) => {
        this.toastService.show({ message: err?.error?.message || 'Error al actualizar el perfil', type: 'error' });
        this.mensaje = err?.error?.message || 'Error al actualizar el perfil';
        this.error = true;
        this.cargando = false;
      },
      complete: () => {
        this.cargando = false;
      }
    });
  }
}
