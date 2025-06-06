import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResenaModel } from '../models/resena.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn:'root'
})
export class ResenaService{
  private http = inject(HttpClient);  private apiUrl = 'http://localhost:8080/resenas';

  listAllResena(): Observable<ResenaModel[]>{
    return this.http.get<ResenaModel[]>('http://localhost:8080/resenas', { withCredentials:false });
  }

  getOneById(id: string): Observable<ResenaModel>{
    return this.http.get<ResenaModel>(`http://localhost:8080/resenas/${id}`, { withCredentials:false });
  }  getReviewsByMatricula(matricula: string): Observable<ResenaModel[]> {
    console.log('Fetching reviews for matricula:', matricula);
    return this.listAllResena().pipe(
      map((reviews: ResenaModel[]) => {
        console.log('All reviews received:', reviews);
        const filteredReviews = reviews.filter(review => {
          // Handle both string matricula and object with matricula property
          if (typeof review.vehiculo === 'string') {
            const match = review.vehiculo === matricula;
            console.log(`String comparison: ${review.vehiculo} === ${matricula} = ${match}`);
            return match;
          } else if (review.vehiculo && typeof review.vehiculo === 'object' && 'matricula' in review.vehiculo) {
            const match = review.vehiculo.matricula === matricula;
            console.log(`Object comparison: ${review.vehiculo.matricula} === ${matricula} = ${match}`);
            return match;
          }
          console.log('No valid vehiculo found in review:', review);
          return false;
        });
        console.log('Filtered reviews:', filteredReviews);
        return filteredReviews;
      })
    );
  }  createResena(resena: ResenaModel): Observable<ResenaModel>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
      // Create a clean payload for the backend
    const payload = {
      comentario: resena.comentario,
      puntuacion: resena.puntuacion,
      fecha: resena.fecha,
      usuario: resena.usuario ? {
        id: resena.usuario.id,
        nombre: resena.usuario.nombre,
        apellidos: resena.usuario.apellidos,
        correo: resena.usuario.correo
      } : null,
      vehiculo: resena.vehiculo && typeof resena.vehiculo === 'object' && 'matricula' in resena.vehiculo ? {
        matricula: resena.vehiculo.matricula
      } : resena.vehiculo
    };
    
    console.log('Creating review with data:', resena);
    console.log('API URL:', this.apiUrl);
    console.log('Clean payload being sent:', payload);
    console.log('Payload JSON:', JSON.stringify(payload));
    
    return this.http.post<ResenaModel>(this.apiUrl, payload, { headers, withCredentials:false });
  }

  checkUserReviewExists(matricula: string, usuarioId: number): Observable<boolean> {
    return this.getReviewsByMatricula(matricula).pipe(
      map((reviews: ResenaModel[]) => 
        reviews.some(review => review.usuario?.id === usuarioId)
      )
    );
  }

  updateResena(id: string, resena: ResenaModel): Observable<ResenaModel>{
    return this.http.put<ResenaModel>(`http://localhost:8080/resenas/${id}`, resena, { withCredentials:false });
  }

  deleteResena(id: string): Observable<any>{
    return this.http.delete(`http://localhost:8080/resenas/${id}`, { withCredentials:false });
  }

}
