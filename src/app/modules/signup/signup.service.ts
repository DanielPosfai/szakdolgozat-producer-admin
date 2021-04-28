import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/shared/models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private addUser = 'http://localhost:8080/api/registerCustomer';

  constructor(private httpClient: HttpClient) { }

  addNewUser(newUser: User): Observable<any> {

    return this.httpClient.post<User>(this.addUser, newUser, { responseType: 'text' as 'json' });
  }

}
