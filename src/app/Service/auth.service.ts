import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http:HttpClient,
    private router:Router) { }
  baseUrl='https://localhost:7012/api/User'
  login(data:any){
    this.http.post(`${this.baseUrl}/Login`,data).subscribe((res:any)=>{
      const token:any= res.token
      const tokenData:any=jwtDecode(token)
      const id=tokenData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
      const role=tokenData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
      localStorage.setItem('token',token);
      localStorage.setItem('userId',id);
      localStorage.setItem('userRole',role);
      if(role=='Employee')
        this.router.navigate(['/employee/home'])
      else
        this.router.navigate(['/trader/home'])
    })
  }
  getToken(){
    return localStorage.getItem('token')
  }
  getId(){
    return localStorage.getItem('userId')
  }
  getRole(){
    return localStorage.getItem('userRole')
  }
  logout(){
    this.http.post(`${this.baseUrl}/Logout`,'').subscribe(res=>{
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('userRole')
      localStorage.removeItem('refreshtoken')
      this.router.navigate(['/login'])
    })
  }
}
