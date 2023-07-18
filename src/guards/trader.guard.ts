import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/Service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TraderGuard implements CanActivate {
  constructor(
    private authService:AuthService,
    private router:Router
    ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const role = this.authService.getRole()
      if (role=='Trader')
        return true;
      this.router.navigate(['/login']);
      return false;
  }

}
