import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Usuario } from '../../../models/login.model';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  constructor(private authService:AuthService){}

  ngOnInit(): void {
      this.authService.obtenerUsuarioActual().subscribe(
        usuario =>{
          this.usuarioActual = usuario;
            if (usuario) {
              this.nombre = usuario.nombre;
              this.apellidos = usuario.apellidos;
              this.correo = usuario.correo;
              this.dni = usuario.dni; // hay que quitar el DNI
              this.camposBloqueados = true;
            } else {
              this.camposBloqueados = false;
            }
        });
  }
  // ********falta comprobar el dni 
   errorDni: String = '';
 
   confirmarReserva(){
    if (this.usuarioActual) {
      if (this.dni = this.usuarioActual.dni) {
        this.errorDni = 'El DNI ingresado no coincide con el DNI registrado';
        return;
      }
      else{
        this.errorDni = '';
        console.log("DNI correcto");
        
      }
    }else{
      console.log("No esta inciada ");
      
    }
   

    //recoger los datos de las fechas de inicio y dias de reserva 

    //enviar los datos a la mySQL
   }
}
