import { Router } from '@angular/router';
import { GovernatesServiceService } from './../../Service/governates-service.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddGovernateComponent } from './../add-governate/add-governate.component';
import { governates } from 'src/app/models/Governorate';
@Component({
  selector: 'app-governates',
  templateUrl: './governates.component.html',
  styleUrls: ['./governates.component.css']
})
export class GovernatesComponent implements OnInit {
  governates: any[] = [];
  counter: number = 1;
  governateName:any;
  p: any = 1;
   count: any = 3;

  constructor(
    private location: Location,
    private router: Router,
    private governateService: GovernatesServiceService,
    private modalService : NgbModal
  
  ) {
    let names = '';
      
    for (let i = 0; i < this.governates.length; i++) {
    
      names += this.governates[i].name;
    
      if (i < this.governates.length - 1) {
    
        names += ', ';
      }
    }

    this.governateName = names;
  }
  ngOnInit() {
    this.getGovernates();
    
  }
  modal(){
    const modalRef = this.modalService.open(AddGovernateComponent, { size: 'lg', backdrop: 'static' , centered: true});
    modalRef.hidden.subscribe(() => {
      this.getGovernates();
     })
  }
  getGovernates() {
    this.governateService.getGovernates().subscribe((data: Object) => {
      // Handle the received data
      // Example: Assign the data to a component property
      this.governates = data as any[];
     

    
      // Assuming the data is an array of any type
    });

  }
  softDeletegovernate(id : string){
    this.governateService.getGovernateById(id).subscribe(e=>
    {
      const Branch : any= e 
      Branch.isDeleted = true 
      this.governateService.updateGovernate(Branch).subscribe(e=>{
        this.getGovernates()
      })
    })
  }
  Edit(id : string){
    const modalRef = this.modalService.open(AddGovernateComponent, { size: 'lg', backdrop: 'static' , centered: true});
    modalRef.componentInstance.governateId=id
    console.log(id)
    modalRef.hidden.subscribe(() => {
      this.getGovernates();
     })
  }
  deleteGovernate(id: string) {
    const confirmDelete = confirm(
      'Are you sure you want to delete this governate?'
    );
    this.governateService.deleteGovernate(id).subscribe(
      (response: any) => {
        console.log('Governate deleted successfully:', response);
        location.reload();
      },
      (error: any) => {
        console.error('Failed to delete governate:', error);
      }
    );
  }
}
