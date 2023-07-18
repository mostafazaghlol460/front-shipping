import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RepresentiveServiceService } from 'src/app/Service/representive-service.service';
import { Router } from '@angular/router';
import { getAllRepresentative } from 'src/app/models/IRepresentive';
import { AddRepresentiveComponent } from '../add-representive/add-representive.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { getRepresentative } from './../../models/IRepresentive';
import { UpdateEmployeeComponent } from '../update-employee/update-employee.component';
import { UpdateRepresentativeComponent } from '../update-representive/update-representive.component';
  

@Component({
  selector: 'app-get-all-representive',
  templateUrl: './get-all-representive.component.html',
  styleUrls: ['./get-all-representive.component.css']
})
export class GetAllRepresentiveComponent implements OnInit {
   // Pagination parameters.
   p: any = 1;
   count: any = 3;
  constructor(
    private representativeService: RepresentiveServiceService,
    router: Router,
    private modalService : NgbModal

  ) {}
  ngOnInit(): void {
    this.loadRepresentive();
  }
  modal(){
    const modalRef = this.modalService.open(AddRepresentiveComponent, { size: 'lg', backdrop: 'static' , centered: true});
    modalRef.hidden.subscribe(() => {
      this.loadRepresentive();
     })
  }
  Edit(id : string){
    const modalRef = this.modalService.open( UpdateRepresentativeComponent, { size: 'lg', backdrop: 'static' , centered: true});
    modalRef.componentInstance.R_id=id
    console.log(id)
    modalRef.hidden.subscribe(() => {
      this.loadRepresentive();
     })
  }
  loadRepresentive() {
    this.representativeService.getRepresentive().subscribe(e => {
      this.Representives = e;
      console.log(e);
    });
  }
  Representives: getAllRepresentative[] = [];

  delete(id: string) {
    this.representativeService.delete(id).subscribe(e => {
      this.loadRepresentive();
      alert('Done');
    });
  }
}
