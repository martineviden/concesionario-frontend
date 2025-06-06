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
      this.resenaService.checkUserReviewExists(this.vehiculo.matricula, this.currentUser.id).subscribe({
        next: (exists) => {
          this.hasExistingReview = exists;
          this.checkingExistingReview = false;
        },
        error: (error) => {
          console.error('Error checking existing review:', error);
          this.checkingExistingReview = false;
        }
      });
    }
  }

  submitReview() {
    if (this.reviewForm.valid && this.currentUser) {
      this.isSubmitting = true;
      
      const review = new ResenaModel(
        this.reviewForm.value.comentario,
        this.reviewForm.value.puntuacion,
        new Date().toISOString().split('T')[0],
        this.currentUser,
        this.vehiculo
      );

      this.resenaService.createResena(review).subscribe({
        next: () => {
          this.reviewSubmitted.emit();
          this.closeModal.emit();
          this.isSubmitting = false;
        },
        error: (error) => {
          console.error('Error creating review:', error);
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
