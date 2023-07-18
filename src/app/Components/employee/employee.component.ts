import { getAllEmployee } from '../../models/IEmployee';
import { EmployeeServicesService } from '../../Service/employee-services.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { updateEmployee } from 'src/app/models/IEmployee';
import { UpdateEmployeeComponent } from '../update-employee/update-employee.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  counter: number = 1;
  EmployeeName:any='';
   // Pagination parameters.
   p: any = 1;
   count: any = 3;
  constructor(
    private router: Router,
    private EmployeeServicesService: EmployeeServicesService,
    private modalService : NgbModal

  ) {
    let names = '';
      
    for (let i = 0; i < this.Employees.length; i++) {
    
      names += this.Employees[i].userName;
    
      if (i < this.Employees.length - 1) {
    
        names += ', ';
      }
    }

    this.EmployeeName = names;
  }
  ngOnInit() {
    this.loadEmployee();
  }
  modal(){
    const modalRef = this.modalService.open(AddEmployeeComponent, { size: 'lg', backdrop: 'static' , centered: true});
    modalRef.hidden.subscribe(() => {
      this.loadEmployee();
     })
  }
  Edit(id : string){
    const modalRef = this.modalService.open(UpdateEmployeeComponent, { size: 'lg', backdrop: 'static' , centered: true});
    modalRef.componentInstance.emp_id=id
    console.log(id)
    modalRef.hidden.subscribe(() => {
      this.loadEmployee();
     })
  }
  softDeleteemployee(id : string){
    this.EmployeeServicesService.getById(id).subscribe(e=>
    {
      const Branch : any= e 
      Branch.isDeleted = true 
      this.EmployeeServicesService.updateEmployee(id,Branch).subscribe(e=>{
        this.loadEmployee()
      })
    })
  }
  loadEmployee() {
    this.EmployeeServicesService.getEmployee().subscribe(e => {
      this.Employees = e;
      console.log(e);
    });
  }
  Employees: getAllEmployee[] = [];

  delete(id: string) {
    this.EmployeeServicesService.delete(id).subscribe(e => {
      this.loadEmployee();
      alert('Done');
    });
  }
}
