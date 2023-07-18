import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/Service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor
  (private router: Router,
    private authService:AuthService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = this.authService.getToken()
      const role =this.authService.getRole()
      if (!token)
        return true;
      else if(role=='Employee')
        this.router.navigate(['/employee/home']);
      else if(role=='Trader')
        this.router.navigate(['/trader/home']);
      return false;
  }

}
