import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RegistroService } from '../../../services/registro.service';
import { Usuario } from '../../../models/registro.model';
import { Rol } from '../../../models/enums';

@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})

export class RegistroComponent {

  @Output() closeModal = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }

  usuarioForm: FormGroup;
  rol = Rol;

  constructor(
    private fb: FormBuilder,
    private registroService: RegistroService
  ) {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      dni: ['', Validators.required],
      contrasena: ['', Validators.required],
      confirmarContrasena: ['', Validators.required],
      rol: [Rol.CLIENTE, Validators.required]
    }, { validators: this.contrasenasValidator });
  }

  contrasenasValidator(form: FormGroup) {
    const contrasena = form.get('contrasena')?.value;
    const confirmarContrasena = form.get('confirmarContrasena')?.value;

    return contrasena === confirmarContrasena ? null : { diferentesContrasenas: true }
  }

  registrarUsuario() {
    
    if (this.usuarioForm.valid) {
      const datosFormulario = this.usuarioForm.value;
      delete datosFormulario.confirmarContrasena;
      
      const nuevoUsuario: Usuario = datosFormulario;

      this.registroService.crearUsuario(nuevoUsuario).subscribe({
        next: res => console.log('Usuario creado:', res),
        error: err => console.error('Error al crear usuario:', err)
      });

      this.close();
    } else {
      console.log('Formulario inválido');
    }
  }

}
