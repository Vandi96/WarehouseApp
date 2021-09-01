import { Inject } from "@angular/core";
import { Component } from "@angular/core";

import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Store } from "../../store.model";


@Component({
    selector: 'store-delete-dialog',
    templateUrl: './store-delete.dialog.component.html',
  })
  export class StoreDeleteDialog {
  
    constructor(
      public dialogRef: MatDialogRef<StoreDeleteDialog>,
      @Inject(MAT_DIALOG_DATA) public data: Store) {}
  }