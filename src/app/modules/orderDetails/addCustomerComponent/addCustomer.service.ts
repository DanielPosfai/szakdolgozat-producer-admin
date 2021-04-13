import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/shared/models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddCustomerService {

  private addUser = 'http://localhost:8080/api/auth/addCustomer';

  constructor(private httpClient: HttpClient) { }

  addNewUser(newUser: User): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa("user" + ':' + "password") });
    console.log(newUser);
    return this.httpClient.post<User>(this.addUser, newUser,{headers, responseType: 'text' as 'json'});    
  }
  
}
