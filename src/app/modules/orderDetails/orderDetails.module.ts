import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { AddCustomerComponent } from './addCustomerComponent/addCustomer.component';
import { EditOrderDetailsComponent } from './editOrderDetailsComponent/editOrderDetails.component';
import { OrderDetailsRouter } from './orderDetails.router';
import { OrderDetailsComponent } from './orderDetailsComponent/orderDetails.component';

@NgModule({

    imports: [
        CommonModule,
        OrderDetailsRouter,
        MatTableModule,
        MatPaginatorModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    declarations: [

        OrderDetailsComponent,
        AddCustomerComponent,
        EditOrderDetailsComponent
    ],
    exports: [

    ]
})

export class OrderDetailsModule { }
