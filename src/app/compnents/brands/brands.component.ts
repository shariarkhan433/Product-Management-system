import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import Brand from '../../types/brand';
import { BrandService } from '../../services/brand.service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterLink,
    MatIconModule
  ],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'], // Fixed the typo from `styleUrl` to `styleUrls`
})
export class BrandsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'action'];
  dataSource!: MatTableDataSource<Brand>; // Correct instantiation
  brandService = inject(BrandService);
  category: Brand[] = [];

  constructor() {
    const initialData: Brand[] = []; // You can populate this with actual data
    this.dataSource = new MatTableDataSource(initialData);
  }
  @ViewChild(MatPaginator) pagination!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.brandService.getBrands().subscribe((result) => {
      this.initTable(result);
    });
  }
  initTable(data: Brand[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.pagination;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    //to change the page number if anyone uses the filter feature
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage;
    }
  }

  deleteCategory(id: string): void {
    this.brandService.deleteProduct(id).subscribe((result) => {
      this.category = this.category.filter(
        (category) => category.id !== id
      );
       this.dataSource.data = this.category;
      this.initTable(this.category);
      window.location.reload();
    });
  }
}
