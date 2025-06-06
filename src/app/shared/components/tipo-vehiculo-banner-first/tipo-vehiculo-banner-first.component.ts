import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioAlquilarComponent } from "../formulario-alquilar/formulario-alquilar.component";
import { VehiculoModel } from '../../../models/vehiculo.model';
import { TipoVehiculoModel } from '../../../models/tipo-vehiculo.model';
import { AuthService } from '../../../services/auth.service';
import { Rol } from '../../../models/enums';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiculoService } from '../../../services/vehiculo.service';
import { ReservaService } from '../../../services/reserva.service';
import { ResenaService } from '../../../services/resena.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-tipo-vehiculo-banner-first',
  standalone: true,
  imports: [CommonModule, FormularioAlquilarComponent],
  templateUrl: './tipo-vehiculo-banner-first.component.html',
  styleUrls: ['./tipo-vehiculo-banner-first.component.css']
})
export class TipoVehiculoBannerFirstComponent implements OnInit {
  mostrarFormularioAlquilar = false;

  @Input() vehiculo!: VehiculoModel;
  @Input() tipoVehiculo!: TipoVehiculoModel;

  esAdmin: boolean = false;
  matricula: string = '';
  showMostrarReserva: boolean = false;

  constructor(
    private authService: AuthService,
    private vehiculoService: VehiculoService,
    private reservaService: ReservaService,
    private resenaService: ResenaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

 eliminarVehiculo() {
  this.matricula = this.route.snapshot.paramMap.get('matricula') || '';

  //Primero elimina las reservas asociadas a la matrícula
  this.reservaService.deleteReserva(this.matricula).pipe(
    switchMap(() => {
      console.log('Reservas eliminadas');
      // Solo después elimina el vehículo
      return this.vehiculoService.deleteVehiculo(this.matricula);
    })
  ).subscribe({
    next: () => {
      console.log('Proceso de eliminación completado');
      this.router.navigate(['/catalogo']);
    },
    error: (err: Error) => {
      console.error('Error en el proceso de eliminación: ', err);
    }
  });
}



  ngOnInit() {
    this.authService.obtenerUsuarioActual().subscribe(usuario => {
      this.esAdmin = usuario?.rol === Rol.ADMIN;
    });
  }

  // Se modifica la firma para aceptar string o undefined
  getColorCSS(color: string | undefined): string {
    if (!color) return '#000000';
    const colorMap: { [key: string]: string } = {
      rojo: 'red',
      azul: 'blue',
      verde: 'green',
      negro: 'black',
      blanco: 'white',
      amarillo: 'yellow',
      naranja: 'orange',
      morado: 'purple',
      rosa: 'pink',
      gris: 'gray',
      marrón: 'brown',
      cian: 'cyan',
      magenta: 'magenta',
      lima: 'lime',
      oliva: 'olive',
      turquesa: 'turquoise',
      violeta: 'violet',
      dorado: 'gold',
      plateado: 'silver',
      escarlata: 'scarlet',
      carmesí: 'crimson',
      tomate: 'tomato',
      coral: 'coral',
      salmón: 'salmon',
      granate: 'maroon',
      bermellón: 'vermilion',
      azul_marino: 'navy',
      azul_cielo: 'skyblue',
      azul_acero: 'steelblue',
      azul_real: 'royalblue',
      añil: 'indigo',
      celeste: 'lightblue',
      zafiro: '#0F52BA',
      verde_oliva: 'olive',
      verde_lima: 'limegreen',
      verde_esmeralda: 'emerald',
      verde_menta: 'mintcream',
      verde_bosque: 'forestgreen',
      verde_manzana: '#8FBC8F',
      jade: '#00A86B',
      ámbar: 'amber',
      mostaza: '#FFDB58',
      ocre: '#CC7722',
      limón: 'lemonchiffon',
      gris_oscuro: 'darkgray',
      gris_claro: 'lightgray',
      pizarra: 'slategray',
      carbón: 'charcoal',
      caoba: '#4A2C2A',
      chocolate: 'chocolate',
      terracota: '#E2725B',
      bronce: '#CD7F32',
      fucsia: 'fuchsia',
      rosa_pálido: 'lightpink',
      rosa_caliente: 'hotpink',
      púrpura: 'purple',
      lavanda: 'lavender',
      malva: 'mauve',
      lila: '#C8A2C8',
      beige: 'beige',
      marfil: 'ivory',
      crema: 'cream',
      menta: 'mintcream',
      aguamarina: 'aquamarine',
      coral_claro: 'lightcoral',
      albaricoque: '#FBCEB1',
      durazno: 'peachpuff',
      perla: '#EAE0C8',
      esmeralda: '#50C878'
    };
    return colorMap[color.toLowerCase()] || '#000000';
  }

  mostrarFormularioReserva(){
    this.showMostrarReserva = true;
  }

  // Retorna la imagen del coche, ya sea la definida en el modelo o una imagen por defecto.
  getCarImage(): string {
    if (this.tipoVehiculo?.modelo) {
      const basePath = 'assets/img/catalogo/';
      // Convertir el modelo a minúsculas y reemplazar espacios por guiones bajos para formar el nombre de archivo.
      const modelName = this.tipoVehiculo.modelo.toLowerCase().replace(/\s+/g, '_');
      // Retorna la ruta asumiendo que la imagen está en formato PNG.
      return `${basePath}${modelName}.png`;
    }
    return 'assets/img/catalogo/default.png';
  }

  // Si por alguna razón la imagen en PNG no se encuentra, intenta cambiar la extensión a JPG.
  handleImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    // Si el src termina en .png, se intenta cambiar a .jpg
    if(target.src.includes('.png')) {
      target.src = target.src.replace('.png', '.jpg');
    } else {
      // Si ya intentó con JPG o el nombre no coincide, se asigna una imagen default
      target.src = 'assets/img/catalogo/default.png';
    }
  }
}

