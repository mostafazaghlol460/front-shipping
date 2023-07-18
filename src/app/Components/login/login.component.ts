import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  flag=true;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private authService:AuthService,
              private router: Router, ) { }
  ngOnInit() {
  }
  Loginform = new FormGroup({
  password: new FormControl('', [
    Validators.required,
    Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-+_!@#$%^&*.,?]).{8,}$')
  ]),
  Email: new FormControl('', [
    Validators.required,
    Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$')
  ]),
})
  get getPassword() {
    return this.Loginform.controls['password'];
  }
  get getEmail() {
    return this.Loginform.controls['Email'];
  }
  Add(e: Event) {
    e.preventDefault();
    if (this.Loginform.status == 'VALID') {
      this.flag=false;
      console.log(this.Loginform.value);
      const data={
        userName:this.Loginform.value.Email,
        password:this.Loginform.value.password
      }
      this.authService.login(data)
      this.Loginform.reset()

}
}
}
