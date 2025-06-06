import { Component, Input, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResenaService } from '../../../services/resena.service';
import { ResenaModel } from '../../../models/resena.model';
import { VehiculoModel } from '../../../models/vehiculo.model';

@Component({
  selector: 'app-tipo-vehiculo-resennas',
  imports: [CommonModule],
  templateUrl: './tipo-vehiculo-resennas.component.html',
  styleUrl: './tipo-vehiculo-resennas.component.css'
})
export class TipoVehiculoResennasComponent implements OnInit, OnDestroy {
  @Input() vehiculo!: VehiculoModel;
  reviews: ResenaModel[] = [];
  isLoading = true;
  
  // Carousel properties
  currentIndex = 0;
  maxVisibleReviews = 3;
  isAnimating = false;

  constructor(private resenaService: ResenaService) {}

  ngOnInit() {
    this.loadReviews();
    this.updateMaxVisibleReviews();
  }

  ngOnDestroy() {
    // Cleanup if needed
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateMaxVisibleReviews();
  }
  private updateMaxVisibleReviews() {
    const width = window.innerWidth;
    if (width <= 768) {
      this.maxVisibleReviews = 1;
    } else if (width <= 1200) {
      this.maxVisibleReviews = 2;
    } else {
      this.maxVisibleReviews = 3;
    }
    
    // Reset index if it's beyond the new limits
    if (this.currentIndex + this.maxVisibleReviews > this.reviews.length) {
      this.currentIndex = Math.max(0, this.reviews.length - this.maxVisibleReviews);
    }
  }
  loadReviews() {
    if (this.vehiculo?.matricula) {
      console.log('Loading reviews for matricula:', this.vehiculo.matricula);
      this.resenaService.getReviewsByMatricula(this.vehiculo.matricula).subscribe({
        next: (reviews) => {
          console.log('Reviews received:', reviews);
          this.reviews = reviews;
          this.isLoading = false;
          this.updateMaxVisibleReviews(); // Update after loading reviews
        },
        error: (error) => {
          console.error('Error loading reviews:', error);
          this.isLoading = false;
        }
      });
    } else {
      console.log('No vehiculo or matricula provided');
      this.isLoading = false;
    }
  }

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }
  getEmptyStars(rating: number): number[] {
    return Array(5 - rating).fill(0);
  }
  getUserDisplayName(review: ResenaModel): string {
    if (review.usuario) {
      const nombre = review.usuario.nombre || '';
      const apellidos = review.usuario.apellidos || '';
      return `${nombre} ${apellidos}`.trim() || 'Usuario Registrado';
    }
    return 'Cliente Verificado';
  }

  // Carousel navigation methods
  get visibleReviews(): ResenaModel[] {
    if (this.reviews.length <= this.maxVisibleReviews) {
      return this.reviews;
    }
    return this.reviews.slice(this.currentIndex, this.currentIndex + this.maxVisibleReviews);
  }

  get canNavigatePrevious(): boolean {
    return this.currentIndex > 0;
  }

  get canNavigateNext(): boolean {
    return this.currentIndex + this.maxVisibleReviews < this.reviews.length;
  }

  previousReviews(): void {
    if (this.canNavigatePrevious && !this.isAnimating) {
      this.isAnimating = true;
      this.currentIndex = Math.max(0, this.currentIndex - 1);
      setTimeout(() => {
        this.isAnimating = false;
      }, 300);
    }
  }

  nextReviews(): void {
    if (this.canNavigateNext && !this.isAnimating) {
      this.isAnimating = true;
      this.currentIndex = Math.min(
        this.reviews.length - this.maxVisibleReviews,
        this.currentIndex + 1
      );
      setTimeout(() => {
        this.isAnimating = false;
      }, 300);
    }
  }

  get totalPages(): number {
    return Math.ceil(this.reviews.length / this.maxVisibleReviews);
  }
  get currentPage(): number {
    return Math.floor(this.currentIndex / this.maxVisibleReviews) + 1;
  }

  trackByReview(index: number, review: ResenaModel): any {
    return review.id || index;
  }
}
