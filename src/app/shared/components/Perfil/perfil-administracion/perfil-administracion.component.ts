import { CommonModule } from '@angular/common';
import {  Component, inject, Input, OnInit } from '@angular/core';
import { EditarVehiculoComponent } from '../../editar-vehiculo/editar-vehiculo.component';
import { TipoVehiculoModel, TipoVehiculoSinVhiculosModel } from '../../../../models/tipo-vehiculo.model';
import { Usuario } from '../../../../models/login.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../../services/auth.service';
import { Rol } from '../../../../models/enums';
import { CreartTipoVheiculoAdminComponent } from '../../creart-tipo-vheiculo-admin/creart-tipo-vheiculo-admin.component';
import { TipoVehiculoService } from '../../../../services/tipo-vehiculo.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { VehiculoService } from '../../../../services/vehiculo.service';
import { VehiculoModel } from '../../../../models/vehiculo.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-perfil-administracion',
  imports: [ CommonModule,EditarVehiculoComponent,CreartTipoVheiculoAdminComponent,ReactiveFormsModule],
  templateUrl: './perfil-administracion.component.html',
  styleUrls: ['./perfil-administracion.component.css']
})
export class PerfilAdministracionComponent{

  usuarioActual: Usuario | null = null;
  estaAutenticado = false;
  esAdmin = false;
  private authSubscription: Subscription | null = null;

  formUpdate: FormGroup;
  formUpdateVheiculo: FormGroup;

  @Input() vehiculoExiste?: TipoVehiculoModel;

 private rescatarTipoVheculo = inject(TipoVehiculoService);
 private rescataVehiculo = inject(VehiculoService);
 tipoVehiculosList:any[]=[];
 vehiculosList:any[]=[];


 constructor(private authService: AuthService,private fb:FormBuilder,private snackBar: MatSnackBar){
// -------------------formulario TipoVehiculo
  this.formUpdate = this.fb.group({
    id:[],
    marca:[""],
    modelo:[""],
    precio:[""],
    tipo:[""],
    imagen:[""]
  });

// ---------------Formulario Vehiculo
  this.formUpdateVheiculo = this.fb.group({
    tipoVehiculo:[{id:[""]}],
    ubicacion:[""],
    matricula: [""],
    color: [""],
    kilometraje: [],
    disponibilidad: [],
    combustible: [""],
    etiqueta: [""],
    autonomia: [""],
    puertas: [],
    aireAcondicionado: [],
    plazas: [],
    transmision: [],
    reservas: [[]]

  })


 }


  // vehiculos = [
  //   {
  //     nombre: "Honda",
  //     modelo: "CB500F",
  //     anio: "2023",
  //     precio: "€25",
  //     imagen: "assets/img/moto.png",
  //     specs: ["⚙️ Automática", "⛽ PB 95", "❄️ No"]
  //   },
  //   {
  //     nombre: "Yamaha",
  //     modelo: "NMAX 155",
  //     anio: "2024",
  //     precio: "$50",
  //     imagen: "assets/img/moto.png",
  //     specs: ["⚙️ Manual", "⛽ PB 98", "❄️ No"]
  //   },
  //   {
  //     nombre: "BMW",
  //     modelo: "R 1250 GS",
  //     anio: "2023",
  //     precio: "$45",
  //     imagen: "assets/img/moto.png",
  //     specs: ["⚙️ Manual", "⛽ PB 95", "❄️ No"]
  //   },
  //   {
  //     nombre: "Volkswagen",
  //     modelo: "Transporter Kombi",
  //     anio: "2024",
  //     precio: "$40",
  //     imagen: "assets/img/van.png",
  //     specs: ["⚙️ Manual", "⛽ PB 95", "❄️ Aire Acondicionado"]
  //   },
  //   {
  //     nombre: "Toyota",
  //     modelo: "Sedan",
  //     anio: "2016",
  //     precio: "$35",
  //     imagen: "assets/img/coche.png",
  //     specs: ["⚙️ Manual", "⛽ PB 95", "❄️ Aire Acondicionado"]
  //   },
  //   {
  //     nombre: "Porsche",
  //     modelo: "SUV",
  //     anio: "2017",
  //     precio: "$50",
  //     imagen: "assets/img/coche.png",
  //     specs: ["⚙️ Manual", "⛽ PB 95", "❄️ Aire Acondicionado"]
  //   }
  // ];

  //agregar vehiculo
  showAgregarModal = false;

  abrirAgregarVehiculo(){
    this.showAgregarModal = true;
  }
  cerrarAgregarVehiculo(){
    this.showAgregarModal = false;
  }
   //------------------agregar vehiculo tipo modales
  showAgregarModalTipoVheiculo = false;
  abrirAgregarTipoVehiculo(){
    this.showAgregarModalTipoVheiculo = true;
  }
  cerrarAgregarTipoVehiculo(){
    this.showAgregarModalTipoVheiculo = false;
  }

  ngOnInit() {
    this.authSubscription = this.authService.obtenerUsuarioActual().subscribe(usuario => {
      this.usuarioActual = usuario;
      this.estaAutenticado = !!usuario;
      this.esAdmin = usuario?.rol === Rol.ADMIN;


    });
  }



// ----------------Todos tipos vehiculo
  rescatarTipoVheculos():void{
      this.rescatarTipoVheculo.listAllTipoVehiculo().subscribe((tipos:any)=>{
        this.tipoVehiculosList=tipos
        //console.log(this.tipoVehiculosList);
      });

}
//-----------------TodosVehiculos
  rescatarVheculos():void{
    this.rescataVehiculo.listAllVehiculo()
    .subscribe((vhehiculos:any)=>{
        this.vehiculosList=vhehiculos
        console.log(this.vehiculosList);
      });

  }
// ----------------Actualizar por id TipoVehiculo
actualizarTipoVheiculo():void{
  const id: TipoVehiculoModel["id"] = this.formUpdate.value.id;
  const dato: TipoVehiculoSinVhiculosModel = this.formUpdate.value;
  console.log(dato);
  this.rescatarTipoVheculo.updateOneTipoVheculo(id,dato).subscribe((tipos:any)=>{

        if(tipos!=null){
          this.rescatarTipoVheculos();
        }

      });

}
//------------------ Actualizar por id Vehiculo
actualizarVihiculo():void{

}


// -------------------Eliminar por id TipoVheiculo
  eliminarById():void{
    const id: TipoVehiculoModel["id"] = this.formUpdate.value.id;
    this.rescatarTipoVheculo.deleteTipoVehiculo(id).subscribe((tipos:any)=>{
        if(tipos !=null){
          this.rescatarTipoVheculos();
          console.log(tipos+"Se ha borrado");
        }
      });
  }
  // ---------------Eliminar por id Vheiculo
  eliminarByIdVehiculo():void{
    const matricula: VehiculoModel["matricula"] = this.formUpdateVheiculo.value.matricula;
    //console.log(this.formUpdate.value.id);
    this.rescataVehiculo.deleteVehiculo(matricula).subscribe((tipos:any)=>{
        if(tipos !=null){
          this.rescatarVheculos();
          this.openSnackBar("Se ha borrado con exito");
          console.log(tipos+"Se ha borrado");
        }
      });
}
openSnackBar(mensaje:string) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
    });
  }

}




