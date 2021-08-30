import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductEditDialog } from './product-dialog/edit/product-edit.dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from './product.service';
import { SaveSnackBarComponent } from '../shared/snackbar/save-snackbar.component';
import { AuthService } from '../auth/auth.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  user: User;

  constructor(private productService: ProductService, public dialog: MatDialog, private _snackBar: MatSnackBar, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user.subscribe(
      (user: User) => {
          this.user = user;
      }
    );
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SaveSnackBarComponent, {
      duration: 5000,
    });
  }

  newProduct() {
    const dialogRef = this.dialog.open(ProductEditDialog, {
      width: '600px',
      data: {
        editMode: false
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result.validForm) {
        const helper = {
          createdAt: new Date().toLocaleString()
        };

        const newProduct = {...result.data, ...helper};
        this.productService.createProduct(newProduct).subscribe(
         () => { 
          this.productService.isProductsChanges();
          this.openSnackBar();
         })
      }
   });
  }
}
