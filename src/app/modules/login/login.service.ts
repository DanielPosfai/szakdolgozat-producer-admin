import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public onError: Subject<string> = new Subject();

  constructor(private httpService: HttpClient) { }

  login(username: string, password: string) {

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.httpService.get("http://localhost:8080/api/auth/login?user=" + username, { headers })
  }

}


