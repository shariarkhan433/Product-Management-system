import { Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { BrandService } from '../../services/brand.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  totalOrders: number=100;
  totalProducts:number=50;
  totalBrands!: number;
  brandService = inject(BrandService)
  ngOnInit(){
    this.brandService.getBrands().subscribe(data=>
      this.totalBrands=data.length
    )
  }
}
