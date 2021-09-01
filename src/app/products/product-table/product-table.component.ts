import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/shared/product.model';

import { ProductService } from '../product.service';
import { ProductDeleteDialog } from '../product-dialog/delete/product-delete.dialog.component';
import { ProductEditDialog } from '../product-dialog/edit/product-edit.dialog.component';
import { User } from 'src/app/shared/user.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent implements OnInit {
  displayedColumns: string[] = ['név', 'hosszúság', 'dátum', 'star'];
  dataSource: MatTableDataSource<Product>;
  user: User;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private http: HttpClient, private productService: ProductService, public dialog: MatDialog, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.productService.productsChanged.subscribe(
      () => {
         this.initTable(); 
      }
    );

    this.authService.user.subscribe(
      (user: User) => {
          this.user = user;
      }
    );
    
     this.initTable();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  initTable() {
    this.productService.getProducts().subscribe(
      (data:any) => {
        this.dataSource = new MatTableDataSource<Product>(data);
             
        this.dataSource.filterPredicate = function(data, filter: string): boolean {
          return data.name.toLowerCase().includes(filter);
        };

        this.dataSource.paginator = this.paginator;
      });
  }

  editProduct(p: Product) {
    const dialogRef = this.dialog.open(ProductEditDialog, {
      width: '600px',
      data: {
        product: p,
        editMode: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
       if (result != undefined && result.validForm) {
         this.productService.updateProduct(p.id, result.data).subscribe(
          () => { 
            this.initTable(); 
          })
       }
    });
  }

  deleteProduct(p: Product) {
    const dialogRef = this.dialog.open(ProductDeleteDialog, {
      data: p
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.productService.deleteProduct(p.id).subscribe(() => {
          this.initTable();
        })
      } 
    });
  }
}