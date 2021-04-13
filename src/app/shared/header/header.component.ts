import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthUtil } from '../utils/authorizationCheck.util';
import { StateService } from '../utils/state.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {


  public isAuthenticated = AuthUtil.checkAuthorization();

  private unsubscribe: Subject<void> = new Subject<void>();
 
  constructor(private stateService: StateService, private router: Router) {

  }

  ngOnInit(): void {

    this.initSubscription();

  }

  ngOnDestroy(): void {

    this.unsubscribe.next();
    this.unsubscribe.complete();

  }

  initSubscription(): void {
    this.stateService.$state.pipe(takeUntil(this.unsubscribe)).subscribe((value) => {
      if (value) {

        this.isAuthenticated = AuthUtil.checkAuthorization();

      }
    });
  }

  doLogout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userInfo');
    this.isAuthenticated = false;
  }

}
