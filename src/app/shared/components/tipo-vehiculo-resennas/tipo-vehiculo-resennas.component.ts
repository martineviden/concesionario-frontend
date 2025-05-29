import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResenaService } from '../../../services/resena.service';

@Component({
  selector: 'app-tipo-vehiculo-resennas',
  standalone: true,
  imports: [],
  templateUrl: './tipo-vehiculo-resennas.component.html',
  styleUrl: './tipo-vehiculo-resennas.component.css'
})
export class TipoVehiculoResennasComponent {

  matricula: string = '';

  constructor(
    private resenaService: ResenaService,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit() {
    this.matricula = this.route.snapshot.paramMap.get('matricula') || '';
    this.resenaService.getResenasByMatricula(this.matricula).subscribe({
      next: res => console.log(res),
      error: err => console.log(err)
    })
  }

}
