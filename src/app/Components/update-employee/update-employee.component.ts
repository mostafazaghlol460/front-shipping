import { branch } from './../../models/Branch';
import { EmployeeServicesService } from './../../Service/employee-services.service';
import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchesServiceService } from 'src/app/Service/branches-service.service';

import { updateEmployee } from 'src/app/models/IEmployee';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent {
 @Input() emp_id: any;
  Employee: updateEmployee | null = null;
  flag: boolean = true;
  actionTitle: any;
  action: any;
  branchIsselected: string = '';
  constructor(
    private route: ActivatedRoute,
    private EmployeeServicesService: EmployeeServicesService,
    private router: Router,
    private branchesServiceService: BranchesServiceService,
    private activeModal : NgbActiveModal,
    private modalService : NgbModal

  ) {}
  close(){
    this.activeModal.close();
 
   }
  ngOnInit(): void {
    this.LoadEmployee(this.emp_id);

    this.branchesServiceService.getBranches().subscribe((e: any) => {
      this.branches = e;
    });
  }

  LoadEmployee(id: string) {
    this.EmployeeServicesService.getById(id).subscribe(e => {
      this.Employee = e;
      this.updateEmployeeForm.patchValue({
        EmployeeName: this.Employee.userName,
        Email: this.Employee.email,
        phone: this.Employee.phone,
        address: this.Employee.address,
        branch: this.Employee.branch
      });
    });
  }

  namepattern = '^[ a-zA-Z][a-zA-Z ]*$';
  branches: branch[] = [];
  updateEmployeeForm = new FormGroup({
    EmployeeName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(this.namepattern)
    ]),
    Email: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$')
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(010|011|012|015)\d{8}$/)
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    branch: new FormControl('', [Validators.required])
  });

  get getEmployeeName() {
    return this.updateEmployeeForm.controls['EmployeeName'];
  }
  get getEmail() {
    return this.updateEmployeeForm.controls['Email'];
  }
  get getphone() {
    return this.updateEmployeeForm.controls['phone'];
  }
  get getAddress() {
    return this.updateEmployeeForm.controls['address'];
  }

  loadRepresentative(representativeId: string) {
    this.EmployeeServicesService.getEmployee;
  }
  Alert(){
    const modalRef = this.modalService.open(AlertComponent, { size: 'md', backdrop: 'static' , centered: true});

  }
  Update(e: Event) {
    console.log(this.updateEmployeeForm.value);
    const X: updateEmployee = {
      userName: this.updateEmployeeForm.value.EmployeeName!,
      email: this.updateEmployeeForm.value.Email!,
      phone: this.updateEmployeeForm.value.phone!,
      address: this.updateEmployeeForm.value.address!,
      branch: this.updateEmployeeForm.value.branch!,
      id: this.emp_id
    };
    e.preventDefault();
    console.log(this.updateEmployeeForm.status);
    if (this.updateEmployeeForm.status == 'VALID') {
      this.flag = false;
      this.EmployeeServicesService.updateEmployee(X, this.emp_id).subscribe(
        res => {
          const modalRef = this.modalService.open(AlertComponent, { size: 'md', backdrop: 'static' , centered: true});
        }
      );
    }
  }
}
