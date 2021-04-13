import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { OrderDetails } from '@app/shared/models/orderDetails.model';
import { AuthUtil } from '@app/shared/utils/authorizationCheck.util';
import { OrderDetailsService } from './orderDetails.service';



@Component({
  selector: 'app-orderDetails',
  templateUrl: 'orderDetails.component.html',
  styleUrls: ['orderDetails.component.scss']
})
export class OrderDetailsComponent implements OnInit, AfterViewInit {

  public orderDetailsList = new Array<OrderDetails>();
  displayedColumns: string[] = ['id','orderid','productname', 'unitprice', 'unittype', 'quantity', 'status','productid', 'edit'];
  dataSource = new MatTableDataSource<OrderDetails>(this.orderDetailsList);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public isAuthenticated = AuthUtil.checkAuthorization();
  constructor(private service: OrderDetailsService, private route: ActivatedRoute) { }

  private itemId = 'id';
  private id = this.route.snapshot.params[this.itemId];

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.paginator._intl.itemsPerPageLabel = "Sorok száma oldalanként";
    this.getCustomerList();

  }

  getCustomerList(): void {
    this.service.getOrderDetails(this.id).subscribe({
      next: response => {

        this.dataSource.data = response as OrderDetails[]
      },
      error: () => {

      }
    }
    );
  }

}
