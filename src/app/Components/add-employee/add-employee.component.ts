import { EmployeeServicesService } from './../../Service/employee-services.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchesServiceService } from './../../Service/branches-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IRepresentive } from 'src/app/models/IRepresentive';
import { IEmployee } from 'src/app/models/IEmployee';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  branches: any[] = [];
  isDeleted: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private EmployeeServicesService: EmployeeServicesService,
    private router: Router,
    private branchesServiceService: BranchesServiceService,
    private activeModal : NgbActiveModal,

  ) {}
  close(){
    this.activeModal.close();
 
   }
 
  ngOnInit(): void {
    this.branchesServiceService.getBranches().subscribe((data: any) => {
      console.log(data);
      this.branches = data;
    });
  }

  namepattern = '^[ a-zA-Z][a-zA-Z ]*$';
  flag = true;

  AddEmployee = new FormGroup({
    EmployeeName: new FormControl('', [
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
    branch: new FormControl('', [Validators.required])
  });

  get getEmployeeName() {
    return this.AddEmployee.controls['EmployeeName'];
  }
  get getPassword() {
    return this.AddEmployee.controls['password'];
  }
  get getEmail() {
    return this.AddEmployee.controls['Email'];
  }
  get getphone() {
    return this.AddEmployee.controls['phone'];
  }
  get getAddress() {
    return this.AddEmployee.controls['address'];
  }

  Add(e: Event) {
    const emp: IEmployee = {
      userName: this.AddEmployee.value.EmployeeName,
      email: this.AddEmployee.value.Email,
      password: this.AddEmployee.value.password,
      phone: this.AddEmployee.value.phone,
      address: this.AddEmployee.value.address,
      branch: this.AddEmployee.value.branch||''
    };
    e.preventDefault();
    if (this.AddEmployee.status == 'VALID') {
      this.flag = false;
      this.EmployeeServicesService.createEmployee(emp).subscribe((res: object) => {
            console.log(res);
             alert('Done');
        this.router.navigate(['/getAllEmployee']);
  
      });
    }
    location.reload();
  }

  action: string = ' اضافه موظف ';
  btn: string = 'حفظ ';
  actionTitle: string = ' اضافه موظف ';
}
