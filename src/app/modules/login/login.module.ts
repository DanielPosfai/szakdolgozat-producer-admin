import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { LoginRouter } from './login.router';

@NgModule({

    imports: [
        // ngif, ngfor miatt kell common
        CommonModule,
        LoginRouter
        // adott modul routere
    ],
    declarations: [
        // általam készített componensek jönnek ide
        LoginComponent
    ],
    exports: [

    ]
})

export class LoginModule { }
