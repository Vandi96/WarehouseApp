import { Inject } from "@angular/core";
import { Component } from "@angular/core";


import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Product } from "src/app/shared/product.model";

@Component({
    selector: 'product-delete-dialog',
    templateUrl: './product-delete.dialog.component.html',
  })
  export class ProductDeleteDialog {
  
    constructor(
      public dialogRef: MatDialogRef<ProductDeleteDialog>,
      @Inject(MAT_DIALOG_DATA) public data: Product) {}
  
  }