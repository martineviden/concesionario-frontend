import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Usuario } from '../../../models/login.model';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReservaModel } from '../../../models/reserva.model';
import { ReservaService } from '../../../services/reserva.service';

@Component({
  selector: 'app-formulario-alquilar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './formulario-alquilar.component.html',
  styleUrls: ['./formulario-alquilar.component.css']
})
export class FormularioAlquilarComponent implements OnInit{
  @Output() cerrarModal = new EventEmitter<void>();

  usuarioActual: Usuario | null = null;
  //Si no se inicio sesion no se autocompleta
  nombre= '';
  apellidos =  '';
  correo = '';
  telefono = '';
  dni = '';
  camposBloqueados = false;

  fechaReserva : string ='';
  diasReserva : number = 1;
  matricula : string = "1234ABC"; // ************hay que cambiarlo para que sea dinamico 

  constructor(private authService:AuthService, private reservaService: ReservaService){}

  ngOnInit(): void {
      this.authService.obtenerUsuarioActual().subscribe(
        usuario =>{
          this.usuarioActual = usuario;
            if (usuario) {
              this.nombre = usuario.nombre;
              this.apellidos = usuario.apellidos;
              this.correo = usuario.correo;
              this.dni = usuario.dni;
              this.camposBloqueados = true;
            } else {
              this.camposBloqueados = false;
            }
        });
  }
  // ********falta comprobar el dni 
   errorDni: String = '';
 
   confirmarReserva(){

    if (!this.usuarioActual) {
      console.log("Usuario No esta inciada ");
      return;
      
    }

   if (this.dni !== this.usuarioActual.dni) {
        this.errorDni = 'El DNI ingresado no coincide con el DNI registrado';
        return;

    }else{
        this.errorDni = '';
        console.log("DNI correcto");
        
    }
    
    if (!this.fechaReserva || !this.diasReserva) {
      console.error('Fechas o días no válidos');
      return;
    }

    //recoger los datos de las fechas de inicio y dias de reserva 
    const reserva = new ReservaModel(
      this.matricula,                  
      this.usuarioActual.id.toString(),
      new Date(this.fechaReserva),     
      this.diasReserva,
      this.diasReserva * 25
    );


   

  this.reservaService.createReserva(reserva).subscribe({
    next: (res) => {
      console.log('Reserva creada con éxito', res);
      this.cerrarModal.emit(); // cerrar modal
    },
    error: (err) => {
      console.error('Error al crear reserva', err);
    }
  });

   }
}
