import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehiculoModel } from '../../../models/vehiculo.model';
import { TipoVehiculoModel } from '../../../models/tipo-vehiculo.model';
import { ResenaService } from '../../../services/resena.service';
import { AuthService } from '../../../services/auth.service';
import { Usuario } from '../../../models/login.model';

@Component({
  selector: 'app-formulario-resena',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario-resena.component.html',
  styleUrls: ['./formulario-resena.component.css']
})
export class FormularioResenaComponent implements OnInit {
  @Output() cerrarModal = new EventEmitter<void>();
  @Input() vehiculo!: VehiculoModel;
  @Input() tipoVehiculo!: TipoVehiculoModel;
  resenaForm: FormGroup;
  usuarioActual: Usuario | null = null;
  isLoading: boolean = false;
  selectedRating: number = 0;

  constructor(
    private fb: FormBuilder,
    private resenaService: ResenaService,
    private authService: AuthService
  ) {
    this.resenaForm = this.fb.group({
      texto: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      puntuacion: [0, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  ngOnInit() {
    // Verificar que las entradas estén definidas
    if (!this.vehiculo) {
      console.warn('Vehículo no definido en FormularioResenaComponent');
      this.vehiculo = {} as VehiculoModel;
    }
    if (!this.tipoVehiculo) {
      console.warn('TipoVehículo no definido en FormularioResenaComponent');
      this.tipoVehiculo = {} as TipoVehiculoModel;
    }

    // Obtener usuario actual
    this.authService.obtenerUsuarioActual().subscribe(usuario => {
      this.usuarioActual = usuario;
    });

    console.log('Vehículo recibido:', this.vehiculo);
    console.log('TipoVehículo recibido:', this.tipoVehiculo);
  }

  setRating(rating: number) {
    this.selectedRating = rating;
    this.resenaForm.get('puntuacion')?.setValue(rating);
  }

  getStarClass(index: number): string {
    if (index <= this.selectedRating) {
      return 'star-filled';
    } else if (index - 0.5 <= this.selectedRating) {
      return 'star-half';
    } else {
      return 'star-empty';
    }
  }

  cerrar() {
    this.cerrarModal.emit();
  }

  confirmarResena() {
    if (this.resenaForm.invalid) {
      this.resenaForm.markAllAsTouched();
      return;
    }

    if (!this.usuarioActual) {
      console.error('Usuario no autenticado');
      alert('Debes estar autenticado para escribir una reseña');
      return;
    }

    this.isLoading = true;

    // Preparar los datos de la reseña
    const texto = this.resenaForm.value.texto.trim();
    const puntuacion = Number(this.resenaForm.value.puntuacion);

    // Validar que los datos sean válidos
    if (!texto || texto.length < 10 || puntuacion < 1 || puntuacion > 5) {
      console.error('Datos de reseña inválidos:', { texto, puntuacion });
      alert('Por favor, verifica que todos los datos sean correctos.');
      this.isLoading = false;
      return;
    }

    // Crear el objeto de reseña
    const resenaData = {
      texto: texto,
      puntacion: puntuacion, // Note: using 'puntacion' to match the model
      fecha: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
      id_usuario: this.usuarioActual.id,
      matricula_vehiculo: this.vehiculo.matricula,
      id_reserva: null // Will be handled by backend if needed
    };

    console.log('Datos de reseña a enviar:', JSON.stringify(resenaData, null, 2));

    this.resenaService.createResena(resenaData as any).subscribe({
      next: (response) => {
        console.log('Reseña creada exitosamente:', response);
        this.isLoading = false;
        alert('¡Reseña publicada con éxito! Gracias por compartir tu experiencia.');
        this.cerrar();
      },
      error: (err) => {
        console.error('Error al crear la reseña:', err);
        this.isLoading = false;
        
        let errorMessage = 'Ocurrió un error al procesar tu reseña. ';
        
        if (err.error && err.error.message) {
          errorMessage += err.error.message;
        } else if (err.status === 400) {
          errorMessage += 'Por favor, verifica que todos los datos sean correctos.';
        } else if (err.status === 0) {
          errorMessage += 'No se pudo conectar con el servidor. Verifica tu conexión a internet.';
        } else {
          errorMessage += 'Inténtalo de nuevo más tarde.';
        }
        
        alert(errorMessage);
      }
    });
  }

  get caracteresRestantes(): number {
    const texto = this.resenaForm.get('texto')?.value || '';
    return 500 - texto.length;
  }
}
