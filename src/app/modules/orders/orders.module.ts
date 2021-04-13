import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { OrdersRouter } from './orders.router';
import { OrdersComponent } from './ordersComponent/orders.component';

@NgModule({

    imports: [
        CommonModule,
        OrdersRouter,
        MatTableModule,
        MatPaginatorModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    declarations: [

        OrdersComponent
        
    ],
    exports: [

    ]
})

export class OrdersModule { }
