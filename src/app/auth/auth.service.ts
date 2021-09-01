import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject, throwError } from "rxjs";
import { User } from '../shared/user.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
    user = new BehaviorSubject<User>(null);

    public readonly LOGIN_API_URL = `http://localhost:3000/login`;
   
    constructor(private http: HttpClient, private router: Router) {   
      if (JSON.parse(sessionStorage.getItem('currentUser'))) {
        let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        this.user.next({name: currentUser.user.name, role: currentUser.user.role, token: currentUser.accessToken});
      }
    }

    login(data: any) {
     return this.http.post(this.LOGIN_API_URL, data)
      .pipe(
        map((data: any) => {
          sessionStorage.setItem('currentUser', JSON.stringify(data));
          return data;
        }),  catchError( error => {
          return throwError( 'Something went wrong!' );
        })
      );
    }

    logout() {
      this.user.next(null);
      sessionStorage.clear();
      this.router.navigate(['/products']);
    }
}