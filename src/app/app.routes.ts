import { Routes } from '@angular/router';
import { HomeComponent } from './compnents/home/home.component';
import { BrandFormComponent } from './compnents/brands/brand-form/brand-form.component';
import { BrandsComponent } from './compnents/brands/brands.component';
import { ProductsComponent } from './compnents/products/products.component';
import { ProductFormComponent } from './compnents/products/product-form/product-form.component';
import { OrderComponent } from './compnents/order/order.component';
import { OrderFormComponent } from './compnents/order/order-form/order-form.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'brands',
    component: BrandsComponent,
  },
  {
    path: 'brands/add',
    component: BrandFormComponent,
  },
  {
    path: 'brands/:id',
    component: BrandFormComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'products/add',
    component: ProductFormComponent,
  },
  {
    path: 'products/:id',
    component: ProductFormComponent,
  },
  {
    path: 'order',
    component: OrderComponent,
  },
  {
    path: 'order/add',
    component: OrderFormComponent,
  },
  {
    path: 'order/:id',
    component: OrderFormComponent,
  },
];
