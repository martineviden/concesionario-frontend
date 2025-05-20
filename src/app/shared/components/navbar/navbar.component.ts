import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  
})
export class NavbarComponent {
  @Output() loginClick = new EventEmitter<void>();
  @Output() registroClick = new EventEmitter<void>();

  abrirLogin() {
    this.loginClick.emit();
  }

  abrirRegistro() {
    this.registroClick.emit();
  }
}
