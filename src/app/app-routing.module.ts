import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '@shared/layout/layout.component';



const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },

  {
    path: '', component: LayoutComponent, children: [
      { path: 'items', loadChildren: () => import('@app/modules/items/items.module').then(m => m.ItemsModule)},
      { path: 'orders', loadChildren: () => import('@app/modules/orders/orders.module').then(m => m.OrdersModule)},
      { path: 'orderDetails', loadChildren: () => import('@app/modules/orderDetails/orderDetails.module').then(m => m.OrderDetailsModule)}
    ]
  },
  { path: 'login', redirectTo: 'login' },
  { path: '**', redirectTo: 'pagenotfound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
