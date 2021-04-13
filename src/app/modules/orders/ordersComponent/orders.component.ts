import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from '@app/shared/models/order.model';
import { AuthUtil } from '@app/shared/utils/authorizationCheck.util';
import { OrdersService } from './orders.service';



@Component({
  selector: 'app-orders',
  templateUrl: 'orders.component.html',
  styleUrls: ['orders.component.scss']
})
export class OrdersComponent implements OnInit, AfterViewInit {

  public orderList = new Array<Order>();
  displayedColumns: string[] = ['id', 'orderdate', 'status', 'totalprice', 'customerid', 'edit'];
  dataSource = new MatTableDataSource<Order>(this.orderList);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public isAuthenticated = AuthUtil.checkAuthorization();
  constructor(private service: OrdersService) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.paginator._intl.itemsPerPageLabel = "Sorok száma oldalanként";
    this.getOrdersList();

  }

  getOrdersList(): void {
    this.service.getOrders().subscribe({
      next: response => {

        this.dataSource.data = response as Order[]
      },
      error: () => {

      }
    }
    );
  }

}
