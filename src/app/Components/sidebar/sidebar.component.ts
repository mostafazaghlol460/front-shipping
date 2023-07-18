import { AuthService } from 'src/app/Service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent  implements OnInit{
  isSettingCollapsed=true
  isEmp=false
  constructor(private authService:AuthService){}
  ngOnInit(): void {
    const role=this.authService.getRole()
    if(role=='Employee')
      this.isEmp=true
  }

}



