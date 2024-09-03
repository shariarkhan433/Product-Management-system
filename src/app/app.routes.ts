import { Routes } from '@angular/router';
import { HomeComponent } from './compnents/home/home.component';
import { BrandFormComponent } from './compnents/brands/brand-form/brand-form.component';
import { BrandsComponent } from './compnents/brands/brands.component';

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
];
