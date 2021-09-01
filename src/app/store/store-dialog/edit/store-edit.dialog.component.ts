import { Inject } from "@angular/core";
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms';

import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    selector: 'store-edit-dialog',
    templateUrl: './store-edit.dialog.component.html',
  })
  export class StoreEditDialog {
    storeForm: FormGroup;

    constructor(
      public dialogRef: MatDialogRef<StoreEditDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
        this.initForm()
      }
  
    private initForm() {
      let storeId = ''; 
      let storeAddress = '';
      let storeLength = '';
      let storeWidth = '';

      if (this.data.editMode) {
        storeId = this.data.store.uuid;
        storeAddress = this.data.store.address;
        storeLength = this.data.store.length;
        storeWidth = this.data.store.width;
      }

      this.storeForm = new FormGroup({
        'uuid': new FormControl({value: storeId, disabled: true}), 
        'address': new FormControl(storeAddress, [Validators.required, Validators.maxLength(50)]),
        'length': new FormControl(storeLength, [Validators.required, Validators.min(1), Validators.max(5)]),
        'width': new FormControl( storeWidth, [Validators.required, Validators.min(1), Validators.max(5)])
      });
    }

    onSubmit(formValue: any) {
      const result = {
        validForm: "true",
        data: formValue
      }
      this.dialogRef.close(result);
    }
  }