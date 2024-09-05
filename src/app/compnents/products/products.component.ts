import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import Product from '../../types/product';
import { ProductService } from '../../services/product.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule,MatSort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  datasource!: MatTableDataSource<Product>;
  productService = inject(ProductService);
  products: Product[] = [];
  httpClient = inject(HttpClient);
  displayedColumns = [
    'name',
    'details',
    'brandId',
    'purchasedPrice',
    'availableQuantity',
    'date',
    'action',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit() {
    this.productService.getProducts().subscribe((result) => {
      this.products = result;
      this.initTable();
    });
  }
  initTable() {
    this.datasource = new MatTableDataSource(this.products);
    this.datasource.paginator = this.paginator;
    this.datasource.sort = this.sort;
  }
  applyFilter(event: Event) {
    this.datasource.filter = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.paginator.firstPage();
  }
  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe(() => {
      this.products = this.products.filter(
        (product) => Number(product.id) !== productId
      );
      this.initTable();
       window.location.reload();
    });
  }
}
