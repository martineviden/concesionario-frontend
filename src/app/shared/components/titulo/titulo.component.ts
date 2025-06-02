import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-titulo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './titulo.component.html',
  styleUrl: './titulo.component.css'
})
export class TituloComponent {}
