import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import Order from '../../../types/order';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ProductService } from '../../../services/product.service';
import Product from '../../../types/product';
import { MatButtonModule } from '@angular/material/button';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css',
})
export class OrderFormComponent {
  formbuilder = inject(FormBuilder);
  productService = inject(ProductService);
  orderService = inject(OrderService);
  toaster = inject(ToastrService);

  orderForm = this.formbuilder.group<Order>({
    orderNo: '',
    productID: '',
    quantity: null,
    salePrice: null,
    discount: null,
    totalAmount: null,
  });
  products: Product[] = [];
  ngOnInit() {
    this.orderForm.controls.orderNo.addValidators(Validators.required);
    this.orderForm.controls.productID.addValidators(Validators.required);
    this.orderForm.controls.quantity.addValidators(Validators.required);
    this.productService.getProducts().subscribe((result) => {
      this.products = result;
      this.updateTotalAmount();
    });
  }
  router=inject(Router)
  addOrder() {
    if(this.orderForm.invalid){
      alert("Please provide all details");
      return;
    }
    let formValue = this.orderForm.getRawValue() as Order
    if (formValue.quantity!>this.selectProduct!.availableQuantity) {
      this.toaster.warning(
        this.selectProduct?.availableQuantity! + 'unit is available right now',
        'Halt'
      );
      return;
    }

    console.log(this.orderForm.value);
    this.orderService.addOrder(formValue).subscribe(()=>{
      this.selectProduct!.availableQuantity! -= formValue.quantity!;
      this.productService.updateProduct(this.selectProduct!.id!,this.selectProduct!).subscribe();
      this.toaster.success('Your order has been placed successfully','Done');
      this.router.navigateByUrl('/order');
    })
  }

  updateTotalAmount(){
    this.orderForm.valueChanges.subscribe(()=>{
      this.orderForm.controls.totalAmount.enable({emitEvent:false});
      if (this.orderForm.value.productID && this.orderForm.value.quantity) {
        let total = this.selectProduct?.salesPrice! *this.orderForm.value.quantity -
        (this.orderForm.value.discount || 0);
        this.orderForm.controls.totalAmount.setValue(total,{ emitEvent: false });
      }
      this.orderForm.controls.totalAmount.disable({emitEvent:false});

    })
  }

  selectProduct?:Product;
  productSelected(productID: string){
    this.selectProduct=this
    .products.find((x)=>x.id==productID);
    this.orderForm.controls.salePrice.enable();
    this.orderForm.controls.salePrice.setValue(this.selectProduct?.salesPrice!)
    this.orderForm.controls.salePrice.disable();
  }
}
