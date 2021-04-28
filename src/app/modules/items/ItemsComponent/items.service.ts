import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private httpService: HttpClient) { }

  
  getItems() {
    let tempId = JSON.parse(sessionStorage.getItem('userInfo'));
    return this.httpService.get("http://localhost:8080/api/admin/myitems/"+tempId.id);
  }

}


