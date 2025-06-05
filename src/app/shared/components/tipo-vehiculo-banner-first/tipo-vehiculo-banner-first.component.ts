import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioAlquilarComponent } from "../formulario-alquilar/formulario-alquilar.component";
import { FormularioResenaComponent } from "../formulario-resena/formulario-resena.component";
import { LoginComponent } from "../Header_Footer/login/login.component";
import { VehiculoModel } from '../../../models/vehiculo.model';
import { TipoVehiculoModel } from '../../../models/tipo-vehiculo.model';
import { AuthService } from '../../../services/auth.service';
import { Rol } from '../../../models/enums';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiculoService } from '../../../services/vehiculo.service';

@Component({
  selector: 'app-tipo-vehiculo-banner-first',
  standalone: true,
  imports: [CommonModule, FormularioAlquilarComponent, FormularioResenaComponent, LoginComponent],
  templateUrl: './tipo-vehiculo-banner-first.component.html',
  styleUrls: ['./tipo-vehiculo-banner-first.component.css']
})
export class TipoVehiculoBannerFirstComponent {
  showMostrarReserva = false;
  showMostrarResena = false;
  showLoginModal = false;
  @Input() vehiculo!: VehiculoModel;
  @Input() tipoVehiculo!: TipoVehiculoModel;
  esAdmin: boolean = false;
  estaAutenticado: boolean = false;
  matricula: string = '';

  constructor(
    private authService: AuthService,
    private vehiculoService: VehiculoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  eliminarVehiculo() {
    this.matricula = this.route.snapshot.paramMap.get('matricula') || '';
    this.vehiculoService.deleteVehiculo(this.matricula).subscribe({
      next: () => {
        console.log('Vehiculo eliminado con matricula: ' + this.matricula);
        this.router.navigate(['/catalogo']);
      },
      error: err => console.log('Error al eliminar vehiculo')
    })
  }
  ngOnInit() {
    this.authService.obtenerUsuarioActual().subscribe(usuario => {
      this.esAdmin = usuario?.rol === Rol.ADMIN;
    });
    
    this.authService.obtenerEstadoAutenticacion().subscribe(autenticado => {
      this.estaAutenticado = autenticado;
    });
  }

  getColorCSS(color: string): string {
    const colorMap: { [key: string]: string } = {
      // Colores básicos
      rojo: 'red', // #FF0000
      azul: 'blue', // #0000FF
      verde: 'green', // #008000
      negro: 'black', // #000000
      blanco: 'white', // #FFFFFF
      amarillo: 'yellow', // #FFFF00
      naranja: 'orange', // #FFA500
      morado: 'purple', // #800080
      rosa: 'pink', // #FFC0CB
      gris: 'gray', // #808080
      marrón: 'brown', // #A52A2A
      cian: 'cyan', // #00FFFF
      magenta: 'magenta', // #FF00FF
      lima: 'lime', // #00FF00
      oliva: 'olive', // #808000
      turquesa: 'turquoise', // #40E0D0
      violeta: 'violet', // #EE82EE
      dorado: 'gold', // #FFD700
      plateado: 'silver', // #C0C0C0

      // Tonos de rojo
      escarlata: 'scarlet', // #FF2400
      carmesí: 'crimson', // #DC143C
      tomate: 'tomato', // #FF6347
      coral: 'coral', // #FF7F50
      salmón: 'salmon', // #FA8072
      granate: 'maroon', // #800000
      bermellón: 'vermilion', // #E34234

      // Tonos de azul
      azul_marino: 'navy', // #000080
      azul_cielo: 'skyblue', // #87CEEB
      azul_acero: 'steelblue', // #4682B4
      azul_real: 'royalblue', // #4169E1
      añil: 'indigo', // #4B0082
      celeste: 'lightblue', // #ADD8E6
      zafiro: '#0F52BA', // No hay nombre directo en CSS, usamos hexadecimal

      // Tonos de verde
      verde_oliva: 'olive', // #808000
      verde_lima: 'limegreen', // #32CD32
      verde_esmeralda: 'emerald', // #50C878
      verde_menta: 'mintcream', // #F5FFFA
      verde_bosque: 'forestgreen', // #228B22
      verde_manzana: '#8FBC8F', // No hay nombre directo, usamos hexadecimal
      jade: '#00A86B', // No hay nombre directo, usamos hexadecimal

      // Tonos de amarillo
      ámbar: 'amber', // #FFBF00
      mostaza: '#FFDB58', // No hay nombre directo, usamos hexadecimal
      ocre: '#CC7722', // No hay nombre directo, usamos hexadecimal
      limón: 'lemonchiffon', // #FFFACD

      // Tonos de gris
      gris_oscuro: 'darkgray', // #A9A9A9
      gris_claro: 'lightgray', // #D3D3D3
      pizarra: 'slategray', // #708090
      carbón: 'charcoal', // #36454F

      // Tonos de marrón
      caoba: '#4A2C2A', // No hay nombre directo, usamos hexadecimal
      chocolate: 'chocolate', // #D2691E
      terracota: '#E2725B', // No hay nombre directo, usamos hexadecimal
      bronce: '#CD7F32', // No hay nombre directo, usamos hexadecimal

      // Tonos de rosa
      fucsia: 'fuchsia', // #FF00FF
      rosa_pálido: 'lightpink', // #FFB6C1
      rosa_caliente: 'hotpink', // #FF69B4

      // Tonos de morado
      púrpura: 'purple', // #800080
      lavanda: 'lavender', // #E6E6FA
      malva: 'mauve', // #E0B0FF
      lila: '#C8A2C8', // No hay nombre directo, usamos hexadecimal

      // Otros colores
      beige: 'beige', // #F5F5DC
      marfil: 'ivory', // #FFFFF0
      crema: 'cream', // #FFFDD0
      menta: 'mintcream', // #F5FFFA
      aguamarina: 'aquamarine', // #7FFFD4
      coral_claro: 'lightcoral', // #F08080
      albaricoque: '#FBCEB1', // No hay nombre directo, usamos hexadecimal
      durazno: 'peachpuff', // #FFDAB9
      perla: '#EAE0C8', // No hay nombre directo, usamos hexadecimal
      esmeralda: '#50C878', // No hay nombre directo, usamos hexadecimal
    };
  return colorMap[color.toLowerCase()] || '#000000'; 
}  mostrarFormularioReserva(){
    if (this.estaAutenticado) {
      this.showMostrarReserva = true;
    } else {
      this.showLoginModal = true;
    }
  }

  mostrarFormularioResena(){
    if (this.estaAutenticado) {
      this.showMostrarResena = true;
    } else {
      this.showLoginModal = true;
    }
  }

  cerrarLoginModal() {
    this.showLoginModal = false;
  }

  onLoginSuccess() {
    this.showLoginModal = false;
    this.showMostrarReserva = true;
  }
}