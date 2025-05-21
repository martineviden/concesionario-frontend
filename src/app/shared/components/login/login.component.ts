import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { LoginService } from './login.service';
import { Usuario } from './login.model';
import { Rol } from './rol'

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
        next: res => console.log('Login correcto: ' + res),
        error: err => console.error('Login incorrecto: ' + err)
      });

      this.close();
    } else {
      console.log('Formulario inválido');
    }
  }
}
