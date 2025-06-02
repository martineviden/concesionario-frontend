import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../../models/login.model';
import { UsuarioService } from '../../../services/usuario.service';
import { UsuarioModel } from '../../../models/usuario.model';
import { Rol } from '../../../models/enums';

@Component({
  selector: 'app-cambiar-contrasena',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cambiar-contrasena.component.html',
  styleUrl: './cambiar-contrasena.component.css'
})
export class CambiarContrasenaComponent {
  @Input() show = false;
  @Input() usuarioActual: Usuario | null = null;
  @Output() closeModal = new EventEmitter<void>();

  form: FormGroup;
  cargando = false;
  mensaje = '';
  error = false;
  toastVisible = false;
  toastMensaje = '';

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.form = this.fb.group({
      contrasena_actual: ['', Validators.required],
      nueva_contrasena: ['', [Validators.required, Validators.minLength(6)]],
      confirmar_contrasena: ['', Validators.required]
    }, { validators: this.matchPasswords });
  }

  matchPasswords(group: FormGroup) {
    const nueva = group.get('nueva_contrasena')?.value;
    const confirmar = group.get('confirmar_contrasena')?.value;
    return nueva === confirmar ? null : { noCoincide: true };
  }

  close() {
    this.closeModal.emit();
  }

  onSubmit() {
    if (this.form.invalid || !this.usuarioActual) return;
    this.cargando = true;
    this.mensaje = '';
    this.error = false;
    const { contrasena_actual, nueva_contrasena } = this.form.value;
    const usuario: UsuarioModel = {
      rol: this.usuarioActual.rol,
      id: String(this.usuarioActual.id),
      dni: this.usuarioActual.dni,
      nombre: this.usuarioActual.nombre,
      apellidos: this.usuarioActual.apellidos,
      correo: this.usuarioActual.correo,
      contrasena: nueva_contrasena,
      telefono: this.usuarioActual.telefono
    };
    (usuario as any).contrasena_actual = contrasena_actual;
    this.usuarioService.updateUsuario(usuario.id, usuario).subscribe({
      next: () => {
        this.mensaje = '';
        this.error = false;
        this.toastMensaje = 'Contraseña actualizada correctamente';
        this.toastVisible = true;
        setTimeout(() => {
          this.toastVisible = false;
          this.close();
        }, 1800);
      },
      error: (err: any) => {
        this.mensaje = err?.error?.message || 'Error al cambiar la contraseña';
        this.error = true;
        this.cargando = false;
      },
      complete: () => {
        this.cargando = false;
      }
    });
  }
} 