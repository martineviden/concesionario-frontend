import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reserva-ahora',
  imports: [],
  templateUrl: './reserva-ahora.component.html',
  styleUrl: './reserva-ahora.component.css'
})
export class ReservaAhoraComponent {
  constructor(private renderer: Renderer2, private el: ElementRef) {} // Inyecta Router

  ngAfterViewInit() {
    const boton = this.el.nativeElement.querySelector('.boton-reserva');
    this.renderer.listen(boton, 'click', () => {
      window.location.href = '/catalogo'; // Fallback absoluto
    });
  }

}
