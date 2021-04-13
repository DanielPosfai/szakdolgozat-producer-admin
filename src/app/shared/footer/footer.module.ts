import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FooterComponent } from './footer.component';


@NgModule({

    imports: [
        // ngif, ngfor miatt kell common
        CommonModule
        // adott modul routere
    ],
    declarations: [
        // általam készített componensek jönnek ide
        FooterComponent
    ],
    exports: [
        FooterComponent
    ]
})

export class FooterModule { }
// TestModul = saját elnevezés
