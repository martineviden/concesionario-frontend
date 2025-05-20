import { Component, inject, OnInit } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import { TipoCoche } from './home-banner-first.model';
import {TipoCocheServce} from './home-banner-first.service'
@Component({
  selector: 'app-home-banner-first',
  imports: [],
  templateUrl: './home-banner-first.component.html',
  styleUrl: './home-banner-first.component.css'
})

export class HomeBannerFirstComponent implements OnInit{

  private tipoCocheServce = inject(TipoCocheServce);


   ngOnInit(): void {
       this.tipoCocheServce.list()
       .subscribe(tipoCoches=>{
        console.log(tipoCoches)
       });
   }

}
