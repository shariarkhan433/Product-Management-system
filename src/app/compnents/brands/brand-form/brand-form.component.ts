import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import Brand from '../../../types/brand';
import { BrandService } from '../../../services/brand.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-brand-form',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, FormsModule, MatFormFieldModule],
  templateUrl: './brand-form.component.html',
  styleUrl: './brand-form.component.css',
})
export class BrandFormComponent {
  name!: string;
  brandService = inject(BrandService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  brand!: Brand;
  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    console.log(id);
    if (id) {
      this.brandService.getBrand(id).subscribe((result) => {
        this.brand = result;
        this.name = result.name;
      });
    }
  }
  addBrand() {
    console.log(this.name + ' Brand has been added');
    if (!this.name) {
      alert('Please insert some value');
      return;
    }
    let brand: Brand = {
      name: this.name,
    };
    this.brandService.addBrand(brand).subscribe((data) => {
      alert('Brand has been added');
      this.router.navigateByUrl('/brands');
    });
  }
  updateBrand() {
    console.log(this.name + ' Brand has been updated');
    if (!this.name) {
      alert('Please insert some value');
      return;
    }
    let brand: Brand = {
      id: this.brand.id,
      name: this.name,
    };
    this.brandService.updateBrand(brand).subscribe((data) => {
      alert('Brand updated succesfully');
      this.router.navigateByUrl('/brands');
    });
  }
}
