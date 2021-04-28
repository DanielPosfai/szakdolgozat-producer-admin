import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationInterceptor } from './authentication.interceptor';
import { LoginModule } from './modules/login/login.module';
import { SignUpModule } from './modules/signup/signup.module';
import { LayoutModule } from './shared/layout/layout.module';



@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule.forRoot(),
    LoginModule,
    SignUpModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule

  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
