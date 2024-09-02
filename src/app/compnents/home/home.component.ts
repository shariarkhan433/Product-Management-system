import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';

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
  totalBrands: number=10;
}
