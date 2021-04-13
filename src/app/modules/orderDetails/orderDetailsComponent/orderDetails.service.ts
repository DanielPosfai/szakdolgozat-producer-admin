import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {

  constructor(private httpService: HttpClient) { }

  getOrderDetails(id: string) {
    return this.httpService.get("http://localhost:8080/api/auth/orderDetailsList/"+ id);
  }

}


