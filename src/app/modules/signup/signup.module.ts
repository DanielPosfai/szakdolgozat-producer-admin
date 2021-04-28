import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './signup.component';
import { SignUpRouter } from './signup.router';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({

    imports: [
        // ngif, ngfor miatt kell common
        CommonModule,
        SignUpRouter,
        ReactiveFormsModule,
        MatSnackBarModule

        // adott modul routere
    ],
    declarations: [
        // általam készített componensek jönnek ide
        SignUpComponent
    ],
    exports: [

    ]
})

export class SignUpModule { }
