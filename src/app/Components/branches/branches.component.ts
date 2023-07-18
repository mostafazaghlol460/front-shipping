import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { BranchesServiceService } from './../../Service/branches-service.service';
import { Component } from '@angular/core';
import { formatDate } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddBranchComponent } from './../add-branch/add-branch.component';
import { branch } from './../../models/Branch';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent {
  Branches: any[] = [];
  counter: number = 1;
  BranchesName:any='';
  // Pagination parameters.
  p: any = 1;
  count: any = 3;
  constructor(
    private location: Location,
    private router: Router,
    private branchesService: BranchesServiceService,
    private modalService : NgbModal
  ) {
    let names = '';
      
    for (let i = 0; i < this.Branches.length; i++) {
    
      names += this.Branches[i].name;
    
      if (i < this.Branches.length - 1) {
    
        names += ', ';
      }
    }

    this.BranchesName = names;
  }
  ngOnInit() {
 
    this.getBranch();
  }
  getBranch() {
    this.branchesService.getBranches().subscribe((data: Object) => {
      this.Branches = data as any[]; 
      this.Branches.forEach(element => {
      console.log(this.Branches)
        element.date= formatDate(element.date, 'yyyy-MM-dd', 'en-US')
      });
     
    });
  }
  modal(){
    const modalRef = this.modalService.open(AddBranchComponent, { size: 'lg', backdrop: 'static' , centered: true});
    modalRef.hidden.subscribe(() => {
      this.getBranch();
     })
  }
  Edit(id : string){
    const modalRef = this.modalService.open(AddBranchComponent, { size: 'lg', backdrop: 'static' , centered: true});
    modalRef.componentInstance.branchId=id
    console.log(id)
    modalRef.hidden.subscribe(() => {
      this.getBranch();
     })
  }
  softDeleteBranch(id : string){
    this.branchesService.getBranchById(id).subscribe(e=>
    {
      const Branch : any= e 
      Branch.isDeleted = true 
      this.branchesService.updateBranch(Branch).subscribe(e=>{
        this.getBranch()
      })
    })
  }
  deleteBranch(id: string) {
    const confirmDelete = confirm(
      'Are you sure you want to delete this Branch?'
    );
    this.branchesService.deleteBranch(id).subscribe(
      (response: any) => {
        console.log('Branch deleted successfully:', response);
        location.reload();
      },
      (error: any) => {
        console.error('Failed to delete Branch:', error);
      }
    );
  }
}
