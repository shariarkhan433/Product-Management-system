import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import Order from '../types/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  httpClient=inject(HttpClient)
  constructor() { }
  getOrders(){
    return this.httpClient.get<Order[]>('http://localhost:3000/orders');
  }
}
