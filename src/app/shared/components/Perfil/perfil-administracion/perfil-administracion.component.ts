import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { EditarVehiculoComponent } from '../../editar-vehiculo/editar-vehiculo.component';
import { TipoVehiculoModel } from '../../../../models/tipo-vehiculo.model';
import { Usuario } from '../../../../models/login.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../../services/auth.service';
import { Rol } from '../../../../models/enums';
import { CreartTipoVheiculoAdminComponent } from '../../creart-tipo-vheiculo-admin/creart-tipo-vheiculo-admin.component';
import { TipoVehiculoService } from '../../../../services/tipo-vehiculo.service';


@Component({
  selector: 'app-perfil-administracion',
  imports: [ CommonModule,EditarVehiculoComponent,CreartTipoVheiculoAdminComponent],
  templateUrl: './perfil-administracion.component.html',
  styleUrls: ['./perfil-administracion.component.css']
})
export class PerfilAdministracionComponent{

  usuarioActual: Usuario | null = null;
  estaAutenticado = false;
  esAdmin = false;
  private authSubscription: Subscription | null = null;



  @Input() vehiculoExiste?: TipoVehiculoModel;
// private editarVehiculoComponent:EditarVehiculoComponent
 private rescatarTipoVheculo = inject(TipoVehiculoService);
 tipoVehiculosList:any[]=[];
 constructor(private authService: AuthService){


 }
//  ejecutar():void{
//   this.editarVehiculoComponent.rescatarTipoVheculos();
//  }

  vehiculos = [
    {
      nombre: "Honda",
      modelo: "CB500F",
      anio: "2023",
      precio: "€25",
      imagen: "assets/img/moto.png",
      specs: ["⚙️ Automática", "⛽ PB 95", "❄️ No"]
    },
    {
      nombre: "Yamaha",
      modelo: "NMAX 155",
      anio: "2024",
      precio: "$50",
      imagen: "assets/img/moto.png",
      specs: ["⚙️ Manual", "⛽ PB 98", "❄️ No"]
    },
    {
      nombre: "BMW",
      modelo: "R 1250 GS",
      anio: "2023",
      precio: "$45",
      imagen: "assets/img/moto.png",
      specs: ["⚙️ Manual", "⛽ PB 95", "❄️ No"]
    },
    {
      nombre: "Volkswagen",
      modelo: "Transporter Kombi",
      anio: "2024",
      precio: "$40",
      imagen: "assets/img/van.png",
      specs: ["⚙️ Manual", "⛽ PB 95", "❄️ Aire Acondicionado"]
    },
    {
      nombre: "Toyota",
      modelo: "Sedan",
      anio: "2016",
      precio: "$35",
      imagen: "assets/img/coche.png",
      specs: ["⚙️ Manual", "⛽ PB 95", "❄️ Aire Acondicionado"]
    },
    {
      nombre: "Porsche",
      modelo: "SUV",
      anio: "2017",
      precio: "$50",
      imagen: "assets/img/coche.png",
      specs: ["⚙️ Manual", "⛽ PB 95", "❄️ Aire Acondicionado"]
    }
  ];

  //agregar vehiculo
  showAgregarModal = false;

  abrirAgregarVehiculo(){
    this.showAgregarModal = true;
  }
  cerrarAgregarVehiculo(){
    this.showAgregarModal = false;
  }

  ngOnInit() {
    this.authSubscription = this.authService.obtenerUsuarioActual().subscribe(usuario => {
      this.usuarioActual = usuario;
      this.estaAutenticado = !!usuario;
      this.esAdmin = usuario?.rol === Rol.ADMIN;
    });
  }
 //agregar vehiculo tipo
  showAgregarModalTipoVheiculo = false;
  abrirAgregarTipoVehiculo(){
    this.showAgregarModalTipoVheiculo = true;
  }
  cerrarAgregarTipoVehiculo(){
    this.showAgregarModalTipoVheiculo = false;
  }


//   abrir_cerarAgregarVehiculo(){
//     if(this.mostrarFormulario ==false){
//       this.mostrarFormulario = true;
//   }else{
//         this.mostrarFormulario=false;
//       }
// }
  // cerrarAgregarVehiculo(){
  //   this.mostrarFormulario = false;
  // }

  rescatarTipoVheculos():void{
      this.rescatarTipoVheculo.listAllTipoVehiculo().subscribe((tipos:any)=>{
        this.tipoVehiculosList=tipos
      });


}
}
