import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Component({
    selector: 'auth-component',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
  })
  export class AuthComponent {
    authForm: FormGroup;

    constructor(private http: HttpClient, private authService: AuthService, private router: Router) {
        this.initForm()
      }
  
    private initForm() {
      let authEmail = '';
      let authPassword = '';

      this.authForm = new FormGroup({
        'email': new FormControl(authEmail, [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
        'password': new FormControl(authPassword, Validators.required)
      });
    }

    onSubmit(formValue: any) {
        if (formValue.valid) {
            this.authService.login(formValue.value).subscribe(
                (result: any) => { 
                  this.authService.user.next({name: result.user.name, role: result.user.role, token: result.accessToken});
                  this.router.navigate(['/products']);
                })
        }
    }
  }
