import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-catalogo-component',
  imports: [
 CommonModule
],
  templateUrl: './catalogo-component.component.html',
  styleUrl: './catalogo-component.component.css'
})
export class CatalogoComponentComponent {

  filtrosActivos: string[] = ['Todos los vehículos'];

toggleFiltro(filtro: string): void {
  if (filtro === 'Todos los vehículos') {
    this.filtrosActivos = ['Todos los vehículos'];
  } else {
    const index = this.filtrosActivos.indexOf(filtro);
    if (index > -1) {
      this.filtrosActivos.splice(index, 1);
    } else {
      this.filtrosActivos = this.filtrosActivos.filter(f => f !== 'Todos los vehículos');
      this.filtrosActivos.push(filtro);
    }

    if (this.filtrosActivos.length === 0) {
      this.filtrosActivos = ['Todos los vehículos'];
    }
  }
}

    vehiculos = [

{
 marca: 'Ford',
 modelo: 'EcoBoost',
 anio: 2023,
 precio: 50,
 transmision: 'Manual',
 aireAcondicionado: true,
 combustible: 'PB 95',
 imagen: 'assets/img/catalogo/9.jpg'
 },
 {
 marca: 'Tesla',
 modelo: 'Model 3',
 anio: 2024,
 precio: 70,
 transmision: 'Automática',
 aireAcondicionado: true,
 combustible: 'Eléctrico',
 imagen: 'assets/img/catalogo/4.jpg'
 }, {
 marca: 'Tesla',
 modelo: 'Model 3',
 anio: 2024,
 precio: 70,
 transmision: 'Automática',
 aireAcondicionado: true,
 combustible: 'Eléctrico',
 imagen: 'assets/img/catalogo/4.jpg'
  }



 ];

}
