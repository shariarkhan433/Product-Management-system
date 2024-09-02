import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import Brand from '../types/brand';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor() { }
  httpClient = inject(HttpClient);
  getBrands(){
    return this.httpClient.get<Brand[]>(environment.apiURL + '/brands');
  }
}
