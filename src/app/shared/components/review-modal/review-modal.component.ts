import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ResenaService } from '../../../services/resena.service';
import { AuthService } from '../../../services/auth.service';
import { ResenaModel } from '../../../models/resena.model';
import { VehiculoModel } from '../../../models/vehiculo.model';
import { Usuario } from '../../../models/login.model';

@Component({
  selector: 'app-review-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './review-modal.component.html',
  styleUrls: ['./review-modal.component.css']
})
export class ReviewModalComponent implements OnInit {
  @Input() vehiculo!: VehiculoModel;
  @Output() closeModal = new EventEmitter<void>();
  @Output() reviewSubmitted = new EventEmitter<void>();
  reviewForm: FormGroup;
  currentUser: Usuario | null = null;
  isSubmitting = false;
  hasExistingReview = false;
  checkingExistingReview = true;

  constructor(
    private fb: FormBuilder,
    private resenaService: ResenaService,
    private authService: AuthService
  ) {
    this.reviewForm = this.fb.group({
      comentario: ['', [Validators.required, Validators.minLength(10)]],
      puntuacion: [5, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }
  ngOnInit() {
    this.authService.obtenerUsuarioActual().subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.checkForExistingReview();
      }
    });
  }
  checkForExistingReview() {
    if (this.currentUser) {
      console.log('Checking for existing review for user:', this.currentUser.id, 'and vehicle:', this.vehiculo.matricula);
      this.resenaService.checkUserReviewExists(this.vehiculo.matricula, this.currentUser.id).subscribe({
        next: (exists) => {
          console.log('Existing review check result:', exists);
          this.hasExistingReview = exists;
          this.checkingExistingReview = false;
        },
        error: (error) => {
          console.error('Error checking existing review:', error);
          this.checkingExistingReview = false;
        }
      });
    }
  }submitReview() {
    if (this.reviewForm.valid && this.currentUser) {
      this.isSubmitting = true;
        // Double-check for existing review before submitting
      console.log('Double-checking for existing review before submit...');
      this.resenaService.checkUserReviewExists(this.vehiculo.matricula, this.currentUser.id).subscribe({
        next: (exists) => {
          console.log('Final duplicate check result:', exists);
          if (exists) {
            alert('Ya has escrito una reseña para este vehículo. Solo se permite una reseña por usuario.');
            this.isSubmitting = false;
            this.hasExistingReview = true;
            return;
          }          // Proceed with review creation - try different payload formats
          
          // Option 1: Try with simplified data structure
          const simplifiedReview = {
            comentario: this.reviewForm.value.comentario,
            puntuacion: this.reviewForm.value.puntuacion,
            fecha: new Date().toISOString().split('T')[0],
            usuario: {
              id: this.currentUser?.id
            },
            vehiculo: {
              matricula: this.vehiculo.matricula
            }
          };
          
          console.log('Trying simplified review format:', simplifiedReview);
          
          // Create the review object using ResenaModel constructor
          const review = new ResenaModel(
            this.reviewForm.value.comentario,
            this.reviewForm.value.puntuacion,
            new Date().toISOString().split('T')[0],
            this.currentUser || undefined,
            this.vehiculo, // Send complete vehicle object
            undefined, // reserva
            undefined  // id
          );

          console.log('Submitting review object:', review);
          console.log('Review JSON:', JSON.stringify(review));this.resenaService.createResena(review).subscribe({
            next: (response) => {
              console.log('Review created successfully:', response);
              this.reviewSubmitted.emit();
              this.closeModal.emit();
              this.isSubmitting = false;
            },
            error: (error) => {
              console.error('Error creating review - Full error details:', error);
              console.error('Error status:', error.status);
              console.error('Error message:', error.message);
              console.error('Error details:', error.error);
              
              let errorMessage = 'Error al crear la reseña.';
              if (error.status === 400) {
                errorMessage = 'Datos de la reseña inválidos. Verifica que todos los campos estén correctos.';
              } else if (error.status === 401) {
                errorMessage = 'No tienes autorización para crear reseñas. Por favor, inicia sesión.';
              } else if (error.status === 500) {
                errorMessage = 'Error interno del servidor. Inténtalo más tarde.';
              }
              
              alert(errorMessage + ' Por favor, inténtalo de nuevo.');
              this.isSubmitting = false;
            }
          });
        },
        error: (error) => {
          console.error('Error checking existing review:', error);
          alert('Error al verificar reseñas existentes. Por favor, inténtalo de nuevo.');
          this.isSubmitting = false;
        }
      });
    }
  }

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }

  onBackdropClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.closeModal.emit();
    }
  }
}
