import { Component } from '@angular/core';
import { AuthUtil } from '../utils/authorizationCheck.util';

@Component({
  selector: 'app-side-menu',
  templateUrl: 'side-menu.component.html',
  styleUrls: ['side-menu.component.scss']
})
export class SideMenuComponent{


  public isAuthenticated = AuthUtil.checkAuthorization();

  public isNavbarCollapsed = true;
s
  public menuItems = [
    { tabname: 'Termékek', path: 'items/list'},
    { tabname: 'Rendelések', path: 'orders/list' }
  ];

  constructor() {

  }
}
