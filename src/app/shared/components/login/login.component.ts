import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() openRegister = new EventEmitter<void>();
  @Output() switchToRegister = new EventEmitter<void>();

  loginForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      contrasena: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]]
    });
  }

  close() {
    this.closeModal.emit();
  }

  goToRegister(event: Event) {
  event.preventDefault(); // Previene el comportamiento por defecto del enlace
  this.switchToRegister.emit();
  }

  loginUsuario() {
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.markAllAsTouched();

      if (this.loginForm.get('correo')?.hasError('required')) {
        this.errorMessage = 'El correo electrónico es requerido';
      } else if (this.loginForm.get('correo')?.hasError('email')) {
        this.errorMessage = 'Por favor, introduce un email válido';
      } else if (this.loginForm.get('contrasena')?.hasError('required')) {
        this.errorMessage = 'La contraseña es requerida';
      } else if (this.loginForm.get('contrasena')?.hasError('minlength')) {
        this.errorMessage = 'La contraseña debe tener al menos 6 caracteres';
      }
      return;
    }

    this.isLoading = true;
    const datosLogin = this.loginForm.value;

    this.loginService.loginUsuario(datosLogin).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        if (res.token) {
          this.authService.iniciarSesion(res.usuario);
          localStorage.setItem('token', res.token);
          this.close();
          this.router.navigate(['/perfil']);
        } else {
          this.errorMessage = 'Credenciales incorrectas';
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error en login:', err);
        if (err.status === 401 || err.status === 404) {
          this.errorMessage = 'Usuario no registrado o credenciales incorrectas';
        } else {
          this.errorMessage = 'Error en el servidor. Inténtalo de nuevo más tarde';
        }
      }
    });
  }

  private markAllAsTouched() {
    Object.values(this.loginForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
