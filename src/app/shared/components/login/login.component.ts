import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { LoginService } from '../../../services/login.service';
import { Usuario } from '../../../models/login.model';
import { Rol } from '../../../models/enums';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  @Output() closeModal = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }

  loginForm: FormGroup;
  rol = Rol;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService
  ) {
    this.loginForm = this.fb.group({
      correo: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  loginUsuario() {
    
    if (this.loginForm.valid) {
      const usuario: Usuario = this.loginForm.value;

      this.loginService.obtenerUsuario(usuario.correo).subscribe({
        next: res => {
          const nombreUsuario = res.nombre;
          const contrasenaUsuario = res.contrasena;

          if (usuario.contrasena == contrasenaUsuario) {
            console.log('Usuario obtenido: ', nombreUsuario);
          } else {
            console.log('Contraseña incorrecta');
          }
        },
        error: err => console.error('Login incorrecto: ', err)
      });

      this.close();
    } else {
      console.log('Formulario inválido');
    }

  }
}
