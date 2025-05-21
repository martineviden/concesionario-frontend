import { Component, Output, EventEmitter, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { RegistroService } from './registro.service';
import { Usuario } from './registro.model';
import { Rol } from './rol';

@Component({
  selector: 'app-registrarse',
  imports: [ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})

export class RegistroComponent {

  @Output() closeModal = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }

  usuarioForm: FormGroup;
  Rol = Rol;

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
      rol: [Rol.CLIENTE, Validators.required]
    });
  }

  registrarUsuario() {
    
    if (this.usuarioForm.valid) {
      const nuevoUsuario: Usuario = this.usuarioForm.value;

      this.registroService.crearUsuario(nuevoUsuario).subscribe({
        next: res => console.log('Usuario creado:', res),
        error: err => console.error('Error al crear usuario:', err)
      });
    } else {
      console.log('Formulario inválido');
    }
  }

}
