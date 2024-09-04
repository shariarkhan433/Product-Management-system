import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import Order from '../types/order';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  httpClient=inject(HttpClient)
  constructor() { }
  getOrders(){
    return this.httpClient.get<Order[]>(environment.apiURL+'/orders');
  }
  addOrder(order: Order){
    return this.httpClient.post<Order>(environment.apiURL+'/orders',order);
  }
}
