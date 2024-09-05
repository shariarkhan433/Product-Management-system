import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import Brand from '../types/brand';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor() {}
  httpClient = inject(HttpClient);
  getBrands() {
    return this.httpClient.get<Brand[]>(environment.apiURL + '/brands');
  }
  addBrand(brand: Brand) {
    return this.httpClient.post<Brand>(environment.apiURL + '/brands', brand);
  }
  getBrand(brandId: string) {
    return this.httpClient.get<Brand>(
      environment.apiURL + '/brands/' + brandId
    );
  }
  updateBrand(brand: Brand) {
    return this.httpClient.put<Brand>(
      environment.apiURL + '/brands/' + brand.id,
      brand
    );
  }
  deleteProduct(id: string) {
    return this.httpClient.delete<void>(`${environment.apiURL}/products/${id}`);
  }
}
