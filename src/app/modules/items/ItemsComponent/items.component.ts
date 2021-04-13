import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '@app/shared/models/user.model';
import { UserInfo } from '@app/shared/models/userInfo.model';
import { AuthUtil } from '@app/shared/utils/authorizationCheck.util';
import { ItemsService } from './items.service';



@Component({
  selector: 'app-items',
  templateUrl: 'items.component.html',
  styleUrls: ['items.component.scss']
})
export class ItemsComponent implements OnInit, AfterViewInit {

  public itemList = new Array<User>();
  displayedColumns: string[] = ['id', 'image', 'productname', 'details', 'unit', 'price', 'category','producer','edit'];
  dataSource = new MatTableDataSource<User>(this.itemList);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public isAuthenticated = AuthUtil.checkAuthorization();
  public tempUser = new UserInfo;
  constructor(private service: ItemsService) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.paginator._intl.itemsPerPageLabel = "Sorok száma oldalanként";
    this.getItemList();

  }

  getItemList(): void {
    this.service.getItems().subscribe({
      next: response => {

        this.dataSource.data = response as User[]
      },
      error: () => {

      }
    }
    );
  }

}
