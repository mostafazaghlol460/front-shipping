import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RepresentiveServiceService } from './../../Service/representive-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IRepresentive } from './../../models/IRepresentive';
import { branch } from 'src/app/models/Branch';
import { governates } from 'src/app/models/Governorate';
import { GovernatesServiceService } from 'src/app/Service/governates-service.service';
import { BranchesServiceService } from 'src/app/Service/branches-service.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-representive',
  templateUrl: './add-representive.component.html',
  styleUrls: ['./add-representive.component.css']
})
export class AddRepresentiveComponent implements OnInit {
  branches: any[] = [];
  governorates: governates[] = [];

  constructor(
    private route: ActivatedRoute,
    private representiveServiceService: RepresentiveServiceService,
    private router: Router,
    private governateService: GovernatesServiceService,
    private branchesServiceService: BranchesServiceService,
    private activeModal : NgbActiveModal,

  ) {}

  ngOnInit(): void {
    this.governateService.getGovernates().subscribe((data: any) => {
      this.governorates = data;
    });
    this.branchesServiceService.getBranches().subscribe((data: any) => {
      console.log(data);
      this.branches = data;

      // this.branches=e
    });
  }

  namepattern = '^[ a-zA-Z][a-zA-Z ]*$';
  flag = true;

  AddRepresentive = new FormGroup({
    RepresentiveName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(this.namepattern)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[@$!%*#?&^_-]).{8,}/)
    ]),
    Email: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$')
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{11}$')
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    branch: new FormControl('', [Validators.required]),
    governates: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    discondType: new FormControl('', [Validators.required])
  });

  get getRepresentiveName() {
    return this.AddRepresentive.controls['RepresentiveName'];
  }
  get getPassword() {
    return this.AddRepresentive.controls['password'];
  }
  get getEmail() {
    return this.AddRepresentive.controls['Email'];
  }
  get getphone() {
    return this.AddRepresentive.controls['phone'];
  }
  get getAddress() {
    return this.AddRepresentive.controls['address'];
  }
  close(){
    this.activeModal.close();
 
   }
 
  Add(e: Event) {
    const X: IRepresentive = {
      userName: this.AddRepresentive.value.RepresentiveName,
      email: this.AddRepresentive.value.Email,
      password: this.AddRepresentive.value.password,
      phone: this.AddRepresentive.value.phone,
      address: this.AddRepresentive.value.address,
      branch: this.AddRepresentive.value.branch || '',
      percent: Number(this.AddRepresentive.value.amount),
      type_of_discount: Number(this.AddRepresentive.value.discondType),
      governate: this.AddRepresentive.value.governates || ''
    };
    e.preventDefault();
    if (this.AddRepresentive.status == 'VALID') {
      this.flag = false;
      console.log(X);
      this.representiveServiceService
        .createRepresentive(X)
        .subscribe((res: object) => {
          console.log(res);
          this.activeModal.close();

        });

    }
  }

  action: string = ' اضافه مندوب ';
  btn: string = 'حفظ ';
  actionTitle: string = ' اضافه مندوب ';
}
