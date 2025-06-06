import { Component, Input, OnInit } from '@angular/core';
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
export class TipoVehiculoResennasComponent implements OnInit {
  @Input() vehiculo!: VehiculoModel;
  reviews: ResenaModel[] = [];
  isLoading = true;

  constructor(private resenaService: ResenaService) {}

  ngOnInit() {
    this.loadReviews();
  }
  loadReviews() {
    if (this.vehiculo?.matricula) {
      console.log('Loading reviews for matricula:', this.vehiculo.matricula);
      this.resenaService.getReviewsByMatricula(this.vehiculo.matricula).subscribe({
        next: (reviews) => {
          console.log('Reviews received:', reviews);
          this.reviews = reviews;
          this.isLoading = false;
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
}
