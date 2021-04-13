import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from '@app/shared/models/userInfo.model';
import { AuthUtil } from '@app/shared/utils/authorizationCheck.util';
import { StateService } from '@app/shared/utils/state.service';
import { LoginService } from './login.service';


@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {

  public isAuthenticated = AuthUtil.checkAuthorization();
  public tempUser = new UserInfo;
  constructor(private service: LoginService, private router: Router, private stateService: StateService) { }

  ngOnInit() {
    
    if(this.isAuthenticated){
      this.router.navigate(['/items/list']);
    }

  }

  doLogin(username: string, password: string) {

    this.service.login(username, password).subscribe({
      next: response => {
      sessionStorage.setItem('userInfo', JSON.stringify(response));
      // this.tempUser = JSON.parse(sessionStorage.getItem('userInfo'));
      // console.log(this.tempUser.id);
      sessionStorage.setItem('token', btoa(username + ':' + password));
      this.router.navigate(['/items/list']);
      //logoutnál false
      this.stateService.updateValue({ isHeaderRefreshNeeded: true });
         
      },
      error: () => {
        alert(`Hibás jelszó vagy felhasználónév!`);
      }
    }

    );
  }
}
