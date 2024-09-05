import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrandService } from '../../../services/brand.service';
import Brand from '../../../types/brand';
import { ProductService } from '../../../services/product.service';
import Product from '../../../types/product';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent {
  builder = inject(FormBuilder);
  productForm: FormGroup = this.builder.group({
    name: ['', [Validators.required]],
    details: [''],
    brandId: ['', [Validators.required]],
    purchasedPrice: ['', [Validators.required]],
    salesPrice: ['', [Validators.required]],
    date: [new Date()],
    availableQuantity: ['', [Validators.required]],
  });
  brandService = inject(BrandService);
  productService = inject(ProductService);
  brands: Brand[] = [];
  router = inject(Router);
  route = inject(ActivatedRoute);
  product!: Product;
  toaster = inject(ToastrService)

  //Fetching the data from database
  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    console.log(id);
    this.brandService.getBrands().subscribe((result) => (this.brands = result));
    if (id) {
      this.productService.getProduct(id).subscribe((result) => {
        this.product = result;
        this.productForm.patchValue(this.product);
      });
    }
  }

  //Adding the products
  addProduct() {
    console.log(this.productForm.value);
    if (this.productForm.invalid) {
      this.toaster.warning('Please fill all the data', 'Halt');
      return;
    }
    let product: Product = this.productForm.value;
    this.productService.addProduct(product).subscribe((result) => {
      this.toaster.success("Task has been successfully added","Success");
      this.router.navigateByUrl('/products');
    });
  }
  updateProduct() {
    if (this.productForm.invalid) {
      this.toaster.success("Please fill all the data","Halt");
      return;
    }
    let product: Product = this.productForm.value;
    this.productService
      .updateProduct(this.product.id!, product)
      .subscribe((result) => {
        this.toaster.success("Your Product update is successfull","Success")
        this.router.navigateByUrl('/products');
      });
  }
}
