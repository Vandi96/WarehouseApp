import { Component, EventEmitter, OnInit, Output} from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { User } from "../shared/user.model";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
    @Output() public sidenavToggle = new EventEmitter();
    user: User;

    constructor(private authService: AuthService) { }

      ngOnInit(): void {
        this.authService.user.subscribe(
            (user: User) => {
                this.user = user;
            }
        );
      }

    logout() {
        this.authService.logout();
    }
   
    public onToggleSidenav = () => {
        this.sidenavToggle.emit();
      }
}