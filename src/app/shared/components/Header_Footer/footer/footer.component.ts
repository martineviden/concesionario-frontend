import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from '../../../../app.routes';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterModule
  ],
  templateUrl:'./footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
