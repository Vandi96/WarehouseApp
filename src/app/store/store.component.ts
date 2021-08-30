import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SaveSnackBarComponent } from '../shared/snackbar/save-snackbar.component';
import { StoreEditDialog } from './store-dialog/edit/store-edit.dialog.component';
import { StoreService } from './store.service';

import { v4 as uuidv4 } from 'uuid';
import { AuthService } from '../auth/auth.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
  providers:[StoreService]
})
export class StoreComponent implements OnInit {
  user: User

  constructor(private storeService:StoreService, public dialog: MatDialog, private _snackBar: MatSnackBar, private authService: AuthService) { }

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

  newStore() {
    const dialogRef = this.dialog.open(StoreEditDialog, {
      width: '600px',
      data: {
        editMode: false
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result.validForm) {
        const helper = {
          uuid: uuidv4()
        };

        const newStore = {...result.data, ...helper};
        this.storeService.createStore(newStore).subscribe(
         () => { 
          this.storeService.isStoresChanges();
          this.openSnackBar();
         })
      }
   });
  }
}
