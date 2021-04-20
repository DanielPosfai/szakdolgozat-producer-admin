import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {
  

  constructor(private httpService: HttpClient) { }

  getOrderDetails(id: string) {
    let tempId = JSON.parse(sessionStorage.getItem('userInfo'));
    return this.httpService.get("http://localhost:8080/api/admin/myOrderDetailList/"+tempId.id);
  }

  deleteDetail(id: string) {
    return this.httpService.delete('http://localhost:8080/api/admin/deleteDetail/'+id,{responseType: 'text' as 'json'});
  }

}


