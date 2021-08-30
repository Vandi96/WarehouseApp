import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from './products/products.component';
import { StoreComponent } from './store/store.component';
import { AppRoutingModule } from './app-routing.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import { LayoutComponent } from './layout/layout.component';
import { ProductTableComponent } from './products/product-table/product-table.component';
import { ProductService } from './products/product.service';
import { ProductEditDialog } from './products/product-dialog/edit/product-edit.dialog.component';
import { ProductDeleteDialog } from './products/product-dialog/delete/product-delete.dialog.component';
import { SaveSnackBarComponent } from './shared/snackbar/save-snackbar.component';
import { StoreEditDialog } from './store/store-dialog/edit/store-edit.dialog.component';
import { StoreDeleteDialog } from './store/store-dialog/delete/store-delete.dialog.component';
import { StoreTableComponent } from './store/store-table/store-table.component';
import { AuthComponent } from './auth/auth.component';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthInterceptorService } from './auth/auth-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    StoreComponent,
    LayoutComponent,
    SidenavComponent,
    ProductTableComponent,
    ProductEditDialog,
    ProductDeleteDialog,
    StoreEditDialog,
    StoreDeleteDialog,
    StoreTableComponent,
    SaveSnackBarComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatCardModule,
    MatDialogModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  entryComponents: [
    ProductEditDialog,
    ProductDeleteDialog
  ],
  providers: [ProductService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
