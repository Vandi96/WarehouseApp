import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Store } from "./store.model";

@Injectable()
export class StoreService {
    storesChanged = new Subject<Boolean>();
    
    public readonly STORES_API_URL = `http://localhost:3000/stores/`;
   
    constructor(private http: HttpClient) {     
    }

    getStores() {
        return this.http.get(this.STORES_API_URL)
            .pipe(
               map((data: Store[]) => {
                 return data;
               }), catchError( error => {
                 return throwError( 'Something went wrong!' );
               })
            );
    }

    isStoresChanges() {
      this.storesChanged.next(true);
    }

    getStore(id: number) {
      return this.http.get(this.STORES_API_URL + id)
      .pipe(
         map((data: Store) => {
           return data;
         }), catchError( error => {
           return throwError( 'Something went wrong!' );
         })
      );
    }

    createStore(data: any) {
      return this.http.post(this.STORES_API_URL, data)
      .pipe(
        map((data: Store) => {
          return data;
        }),  catchError( error => {
          return throwError( 'Something went wrong!' );
        })
      );
    }

    updateStore(id: number, data: any) {
      return this.http.put(this.STORES_API_URL + id, data)
      .pipe(
        map((data: Store) => {
          return data;
        }),  catchError( error => {
          return throwError( 'Something went wrong!' );
        })
      );
    }

    deleteStore(id: number) {
        return this.http.delete(this.STORES_API_URL + id)
        .pipe(
          map(() => {
            return {};
          }),  catchError( error => {
            return throwError( 'Something went wrong!' );
          })
        );
    }
}