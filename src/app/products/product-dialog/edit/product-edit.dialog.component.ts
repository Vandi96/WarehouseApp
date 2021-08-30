import { Inject } from "@angular/core";
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms';

import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    selector: 'product-edit-dialog',
    templateUrl: './prodcut-edit.dialog.component.html',
  })
  export class ProductEditDialog {
    productForm: FormGroup;

    constructor(
      public dialogRef: MatDialogRef<ProductEditDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
        this.initForm()
      }
  
    private initForm() {
      let productName = '';
      let productLength = '';
      let productWidth = '';

      if (this.data.editMode) {
        productName = this.data.product.name;
        productLength = this.data.product.length;
        productWidth = this.data.product.width;
      }

      this.productForm = new FormGroup({
        'name': new FormControl(productName, [Validators.required, Validators.maxLength(50)]),
        'length': new FormControl(productLength, [Validators.required, Validators.min(1), Validators.max(5)]),
        'width': new FormControl(productWidth, [Validators.required, Validators.min(1), Validators.max(5)])
      });
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    onSubmit(formValue: any) {
      const result = {
        validForm: "true",
        data: formValue
      }
      this.dialogRef.close(result);
    }
  }