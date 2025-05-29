import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { AuthService } from '../../../services/auth.service';
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

  loginForm: FormGroup;
  nombreUsuario: string = '';
  rol: Rol | undefined;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      correo: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  close() {
    this.closeModal.emit();
  }

  loginUsuario() {
    if (this.loginForm.valid) {
      const datosLogin = this.loginForm.value;

      this.loginService.loginUsuario(datosLogin).subscribe({
        next: res => {
          console.log(res)         
          if (res.token) {
            this.rol = res.usuario.rol;
            this.nombreUsuario = res.usuario.nombre;
            this.authService.iniciarSesion(res.usuario);
            console.log('Login correcto. Bienvenido,', this.nombreUsuario);
            console.log('Rol del usuario:', res.usuario.rol);
            this.close();
          } else {
            console.log('Login incorrecto. Revisa los datos');
          }
        },
        error: err => {
          console.error('Error en login: ', err);
        }
      });
    } else {
      console.log('Formulario inválido');
    }
  }
}
