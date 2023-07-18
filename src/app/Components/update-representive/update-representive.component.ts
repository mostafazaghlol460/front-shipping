import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchesServiceService } from 'src/app/Service/branches-service.service';
import { branch } from 'src/app/models/Branch';
import { governates } from 'src/app/models/Governorate';
import { IRepresentive, getRepresentative, updateRepresentative } from 'src/app/models/IRepresentive';
import { RepresentiveServiceService } from './../../Service/representive-service.service';
import { GovernatesServiceService } from 'src/app/Service/governates-service.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-update-representative',
  templateUrl: './update-representive.component.html',
  styleUrls: ['./update-representive.component.css']
})
export class UpdateRepresentativeComponent {
 @Input() R_id:any;
 Representive:updateRepresentative | null =null;
  flag: boolean =true;
  
constructor(
  private route: ActivatedRoute,
  private representiveServie: RepresentiveServiceService ,
  private router :Router,
  private governateService:GovernatesServiceService,
  private branchesServiceService:BranchesServiceService,
  private activeModal : NgbActiveModal,

) {}



ngOnInit(): void {
  this.LoadRepresentive(this.R_id);
  this.governateService.getGovernates().subscribe((e:any)=>{
    this.governorates=e
  })
  this.branchesServiceService.getBranches().subscribe((data :any)=>{
    // console.log(e)
    
    this.branches=data;
})
}

LoadRepresentive(id:string){
this.representiveServie.getById(id).subscribe(e=>{
  this.Representive=e
  console.log(this.Representive)
  // console.log(e)

  this.updateRepresentativeForm.patchValue({
    RepresentiveName:this.Representive.userName,
    Email:this.Representive.email,
    phone:this.Representive.phone,
    address:this.Representive.address,
    branch:this.Representive.branch,
    governates:this.Representive.governate,
    percent:this.Representive.percent?.toString(),
    type_of_discount:this.Representive.type_of_discount?.toString(),
   
    
  })
})
}

  namepattern = "^[ a-zA-Z][a-zA-Z ]*$";
  branches:branch[] = [];
  governorates: governates[] = [];
  updateRepresentativeForm=new FormGroup({
  RepresentiveName:new FormControl("",[
    Validators.required,
    Validators.minLength(3),
    Validators.pattern(this.namepattern)
  ]),
  Email: new FormControl("", [
    Validators.required,
    Validators.pattern(
      "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"),
  ]),
  phone: new FormControl("", [
    Validators.required,
    Validators.pattern(/^(010|011|012|015)\d{8}$/)]
  ),
  address: new FormControl("", [
    Validators.required,
    Validators.minLength(3),
  ]),
  branch:new FormControl("",[
    // Validators.required
  ]),
  governates:new FormControl("",[
    // Validators.required
  ]),
  percent:new FormControl("",[
    Validators.required
  ]),
  type_of_discount:new FormControl("",[
    Validators.required
  ])
});

get getRepresentiveName() {
  return this.updateRepresentativeForm.controls['RepresentiveName']
}
get getEmail() {
  return this.updateRepresentativeForm.controls['Email']
}
get getphone() {
  return this.updateRepresentativeForm.controls['phone']
}
get getAddress() {
  return this.updateRepresentativeForm.controls['address']
}

loadRepresentative(representativeId:string){
  this.representiveServie.getRepresentive
}
close(){
  this.activeModal.close();

 }

Update(e: Event) {
  console.log(this.updateRepresentativeForm.value)
  const X :  updateRepresentative = {
    userName: this.updateRepresentativeForm.value.RepresentiveName!,
    email: this.updateRepresentativeForm.value.Email!,
    phone: this.updateRepresentativeForm.value.phone!,
    address: this.updateRepresentativeForm.value.address!,
    branch : this.updateRepresentativeForm.value.branch ||'',
    percent: Number(this.updateRepresentativeForm.value.percent),
    type_of_discount: Number(this.updateRepresentativeForm.value.type_of_discount),
    governate: this.updateRepresentativeForm.value.governates ||'',
    id: this.R_id 
  }
  e.preventDefault()
  if (this.updateRepresentativeForm.status == 'VALID') {
    this.flag = false
    this.representiveServie.updateRepreentive(X,this.R_id).subscribe(res=>{
      this.activeModal.close();

this.router.navigate(['/getAllRepresentive']);
    })
  }
}

  action:string = " تعديل مندوب "
  btn:string = "حفظ "
  actionTitle:string =" تعديل مندوب "
}
 

