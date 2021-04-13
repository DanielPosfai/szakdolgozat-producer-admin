import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpService: HttpClient) { }

  getOrders() {
    return this.httpService.get("http://localhost:8080/api/auth/orders");
  }

}


