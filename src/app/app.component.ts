import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { HomeBannerFirstComponent } from './shared/components/home-banner-first/home-banner-first.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { DatoHomeComponent } from "./shared/components/dato-home/dato-home.component";
import { HechosHomeComponent } from "./shared/components/hechos-home/hechos-home.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, NavbarComponent, DatoHomeComponent, HechosHomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
},
)

export class AppComponent {
  title = 'Frontend';
}
