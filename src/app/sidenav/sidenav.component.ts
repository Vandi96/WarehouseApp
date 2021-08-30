import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../shared/user.model';
 
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();
  user: User;
 
  constructor(private authService: AuthService) { }
 
  ngOnInit() {
    this.authService.user.subscribe(
      (user: User) => {
          this.user = user;
      }
    );
  }
 
  logout() {
    this.authService.logout();
    this.onSidenavClose();
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
}