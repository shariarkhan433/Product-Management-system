import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrandService } from '../../../services/brand.service';
import Brand from '../../../types/brand';
import { ProductService } from '../../../services/product.service';
import Product from '../../../types/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule,MatButtonModule, MatInputModule,MatSelectModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent {
  builder = inject(FormBuilder);
  productForm:FormGroup = this.builder.group({
    name: ['',[Validators.required]],
    details: [''],
    brandId: ['',[Validators.required]],
    purchasedPrice: ['',[Validators.required]],
    salesPrice: ['',[Validators.required]],
    availableQuantity: ['',[Validators.required]],
  });
  brandService = inject(BrandService);
  productService = inject(ProductService);
  brands:Brand[]=[];
  router = inject(Router);

  //Fetching the data from database
  ngOnInit(){
    this.brandService.getBrands().subscribe((result)=>this.brands=result);
  }

  //Adding the products
  addProduct(){
    console.log(this.productForm.value);
    if(this.productForm.invalid){
      alert("Please fill-up all field");
      return;
    }
    let product: Product = this.productForm.value;
    this.productService.addProduct(product).subscribe(result=>{
      alert("Your Product is added succesfully");
      this.router.navigateByUrl('/products');
    });
  }
}
