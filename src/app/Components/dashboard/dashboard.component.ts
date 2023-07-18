import { AuthService } from 'src/app/Service/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private authService:AuthService,private router:Router){
    const role=this.authService.getRole()
    if(role=='Employee')
      this.router.navigate(['/employee/home'])
    else
      this.router.navigate(['/trader/home'])
  }
}
