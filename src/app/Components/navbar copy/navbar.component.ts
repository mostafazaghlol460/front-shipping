import { AuthService } from 'src/app/Service/auth.service';
import { Component } from "@angular/core";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private authService:AuthService){}
  logout(){
    this.authService.logout()
  }
}

