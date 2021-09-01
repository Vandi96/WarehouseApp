import { Product } from "../shared/product.model";
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

import { catchError, map } from 'rxjs/operators';
import { throwError } from "rxjs";
import { Subject } from "rxjs";

@Injectable()
export class ProductService {
    productsChanged = new Subject<Boolean>();
    productSizes: Object;
    public readonly PRODUCTS_API_URL = `http://localhost:3000/products/`;
   
    constructor(private http: HttpClient) {     
    }

    getProducts()  {
        return this.http.get(this.PRODUCTS_API_URL)
            .pipe(
               map((data: Product[]) => {
                 return data;
               }), catchError( error => {
                 return throwError( 'Something went wrong!' );
               })
            );
    }

    isProductsChanges() {
      this.productsChanged.next(true);
    }

    getProduct(id: number) {
      return this.http.get(this.PRODUCTS_API_URL + id)
      .pipe(
         map((data: Product) => {
           return data;
         }), catchError( error => {
           return throwError( 'Something went wrong!' );
         })
      );
    }

    createProduct(data) {
      return this.http.post(this.PRODUCTS_API_URL, data)
      .pipe(
        map((data: Product) => {
          return data;
        }),  catchError( error => {
          return throwError( 'Something went wrong!' );
        })
      );
    }

    updateProduct(id: number, data) {
      return this.http.put(this.PRODUCTS_API_URL + id, data)
      .pipe(
        map((data: Product) => {
          return data;
        }),  catchError( error => {
          return throwError( 'Something went wrong!' );
        })
      );
    }

    deleteProduct(id: number) {
        return this.http.delete(this.PRODUCTS_API_URL + id)
        .pipe(
          map(() => {
            return {};
          }),  catchError( error => {
            return throwError( 'Something went wrong!' );
          })
        );
    }
}