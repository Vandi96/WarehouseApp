import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/shared/user.model';
import { StoreDeleteDialog } from '../store-dialog/delete/store-delete.dialog.component';
import { StoreEditDialog } from '../store-dialog/edit/store-edit.dialog.component';
import { Store } from '../store.model';
import { StoreService } from '../store.service';


@Component({
  selector: 'app-store-table',
  templateUrl: './store-table.component.html',
  styleUrls: ['./store-table.component.css']
})
export class StoreTableComponent implements OnInit {
  displayedColumns: string[] = ['azonosító', "cím", 'hosszúság', 'szélesség',  'star'];
  dataSource: MatTableDataSource<Store>;
  isStoreEnough: Boolean;
  user: User;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private http: HttpClient, private storeService: StoreService, public dialog: MatDialog, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.storeService.storesChanged.subscribe(
      () => {
         this.initTable(); 
      }
    );

    this.authService.user.subscribe(
      (user: User) => {
          this.user = user;
      }
    );

    this.storeService.isStoreEnough.subscribe(
      (result: boolean) => {
        this.isStoreEnough = result;
      }
    )

     this.initTable();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  initTable() {
    this.storeService.getStores().subscribe(
      (data:any) => {
        this.dataSource = new MatTableDataSource<Store>(data);
             
        this.dataSource.filterPredicate = function(data, filter: string): boolean {
          return data.address.toLowerCase().includes(filter);
        };

        this.storeService.getStoresSizes(this.dataSource.data);
        this.dataSource.paginator = this.paginator;
      });
  }

  editStore(s: Store) {
    const dialogRef = this.dialog.open(StoreEditDialog, {
      width: '600px',
      data: {
        store: s,
        editMode: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
       if (result != undefined && result.validForm) {
         this.storeService.updateStore(s.id, result.data).subscribe(
          () => { 
            this.initTable(); 
          })
       }
    });
  }

  deleteStore(s: Store) {
    const dialogRef = this.dialog.open(StoreDeleteDialog, {
      data: s
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.storeService.deleteStore(s.id).subscribe(() => {
          this.initTable();
        })
      } 
    });
  }
}