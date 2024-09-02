import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import Brand from '../types/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor() { }
  httpClient = inject(HttpClient);
  getBrands(){
    return this.httpClient.get<Brand[]>("http://localhost:3000/brands");
  }
}
