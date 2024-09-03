import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import Product from '../types/product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  httpClient = inject(HttpClient)
  constructor() { }
  getProducts(){
    return this.httpClient.get<Product[]>(environment.apiURL+'/products');
  }
  addProduct(product:Product){
    return this.httpClient.post<Product>(environment.apiURL + '/products', product);
  }
}
