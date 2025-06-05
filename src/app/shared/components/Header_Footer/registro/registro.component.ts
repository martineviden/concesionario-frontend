import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegistroService } from '../../../../services/registro.service';
import { Usuario } from '../../../../models/registro.model';
import { Rol } from '../../../../models/enums';

@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  @Output() closeModal = new EventEmitter<void>();
  errorMessages: { [key: string]: string } = {};
  showFormErrors = false;

  usuarioForm: FormGroup;
  rol = Rol;

  constructor(
    private fb: FormBuilder,
    private registroService: RegistroService
  ) {
    this.usuarioForm = this.fb.group({
      nombre: ['', [Validators.required, this.validarSoloLetras]],
      apellidos: ['', [Validators.required, this.validarSoloLetras]],
      correo: ['', [
        Validators.required,
        Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
        Validators.maxLength(100)
      ]],
      telefono: ['', [Validators.required, Validators.maxLength(15), this.validarSoloNumeros]],
      dni: ['', [Validators.required, Validators.maxLength(9)]],
      contrasena: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      confirmarContrasena: ['', [Validators.required]],
      rol: [Rol.CLIENTE, Validators.required]
    }, { validators: this.contrasenasValidator });

    // Inicializar mensajes de error
    this.initializeErrorMessages();
  }

  // Validador personalizado para solo letras
  validarSoloLetras(control: AbstractControl): {[key: string]: any} | null {
    const valor = control.value;
    if (valor && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor)) {
      return { 'soloLetras': true };
    }
    return null;
  }

  // Validador personalizado para solo números
  validarSoloNumeros(control: AbstractControl): {[key: string]: any} | null {
    const valor = control.value;
    if (valor && !/^[0-9]+$/.test(valor)) {
      return { 'soloNumeros': true };
    }
    return null;
  }

  // Método para forzar solo letras en tiempo real
  soloLetras(event: any, campo: string) {
    const input = event.target;
    const valor = input.value;
    const nuevoValor = valor.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    this.usuarioForm.get(campo)?.setValue(nuevoValor, { emitEvent: true });
  }

  // Método para forzar solo números en tiempo real
  soloNumeros(event: any, campo: string) {
    const input = event.target;
    const valor = input.value;
    const nuevoValor = valor.replace(/[^0-9]/g, '');
    this.usuarioForm.get(campo)?.setValue(nuevoValor, { emitEvent: true });
  }

  contrasenasValidator(form: FormGroup) {
    const contrasena = form.get('contrasena')?.value;
    const confirmarContrasena = form.get('confirmarContrasena')?.value;
    return contrasena === confirmarContrasena ? null : { diferentesContrasenas: true };
  }

  // Inicializar mensajes de error
  private initializeErrorMessages() {
    this.errorMessages = {
      nombre: 'El nombre es obligatorio y solo puede contener letras',
      apellidos: 'Los apellidos son obligatorios y solo pueden contener letras',
      correo: 'El correo electrónico es obligatorio y debe ser válido',
      telefono: 'El teléfono es obligatorio y solo puede contener números',
      dni: 'El DNI es obligatorio',
      contrasena: 'La contraseña es obligatoria (mínimo 6 caracteres)',
      confirmarContrasena: 'Debes confirmar la contraseña',
      diferentesContrasenas: 'Las contraseñas no coinciden'
    };
  }

  // Obtener mensaje de error para un campo específico
  getErrorMessage(controlName: string): string {
    const control = this.usuarioForm.get(controlName);

    if (control?.errors?.['required']) {
      return 'Este campo es obligatorio';
    }

    if (control?.errors?.['soloLetras']) {
      return 'Solo se permiten letras';
    }

    if (control?.errors?.['soloNumeros']) {
      return 'Solo se permiten números';
    }

    if (control?.errors?.['email']) {
      return 'Correo electrónico no válido';
    }

    if (control?.errors?.['pattern']) {
    if (controlName === 'correo') {
      return 'El formato del correo debe ser texto@texto.com';
    }
    return 'Formato inválido';
  }

    if (control?.errors?.['minlength']) {
      return `Mínimo ${control.errors?.['minlength'].requiredLength} caracteres`;
    }

    if (control?.errors?.['maxlength']) {
      return `Máximo ${control.errors?.['maxlength'].requiredLength} caracteres`;
    }

    return this.errorMessages[controlName] || 'Campo no válido';
  }

  registrarUsuario() {
    this.showFormErrors = true;
    this.marcarControlesComoTocados();

    if (this.usuarioForm.invalid) {
      return;
    }

    const datosFormulario = this.usuarioForm.value;
    delete datosFormulario.confirmarContrasena;

    const nuevoUsuario: Usuario = datosFormulario;

    this.registroService.crearUsuario(nuevoUsuario).subscribe({
      next: res => {
        console.log('Usuario creado:', res);
        this.close();
      },
      error: err => {
        console.error('Error al crear usuario:', err);
        // Puedes agregar manejo de errores específicos del servidor aquí
      }
    });
  }

  private marcarControlesComoTocados() {
    Object.values(this.usuarioForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  close() {
    this.closeModal.emit();
  }
}
