import { Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { BrandService } from '../../services/brand.service';
import { OrderService } from '../../services/order.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  totalOrders!: number;
  totalProducts!:number;
  totalBrands!: number;
  brandService = inject(BrandService);
  orderService = inject(OrderService);
  productService = inject(ProductService);
  ngOnInit(){
    this.brandService.getBrands().subscribe((data=>
      this.totalBrands=data.length)
    )
    this.orderService.getOrders().subscribe((data=>
      this.totalOrders=data.length)
    )
    this.productService.getProducts().subscribe((data=>
      this.totalProducts=data.length)
    )
  }
}
