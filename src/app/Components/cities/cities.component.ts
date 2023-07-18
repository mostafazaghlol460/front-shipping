import { Router } from '@angular/router';
import { CitiesServiceService } from './../../Service/cities-service.service';
import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddBranchComponent } from '../add-branch/add-branch.component';
import { AddCityComponent } from '../add-city/add-city.component';
@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {
  Cities: any[] = [];
  counter: number = 1;
  CitiesName:any='';
 // Pagination parameters.
 p: any = 1;
 count: any = 3;
  constructor(
    private location: Location,
    private router: Router,
    private CitiesService: CitiesServiceService,
    private modalService : NgbModal

  ) {
    let names = '';
      
    for (let i = 0; i < this.Cities.length; i++) {
    
      names += this.Cities[i].name;
    
      if (i < this.Cities.length - 1) {
    
        names += ', ';
      }
    }

    this.CitiesName = names;
  }
  ngOnInit() {
    this.getCity();
  }
  modal(){
    const modalRef = this.modalService.open(AddCityComponent, { size: 'lg', backdrop: 'static' , centered: true});
    modalRef.hidden.subscribe(() => {
      this.getCity();
     })
  }
  getCity() {
    this.CitiesService.getCities().subscribe((data: Object) => {
      // Handle the received data
      // Example: Assign the data to a component property
      this.Cities = data as any[]; // Assuming the data is an array of any type
    });
  }
  Edit(id : string){
    const modalRef = this.modalService.open( AddCityComponent, { size: 'lg', backdrop: 'static' , centered: true});
    modalRef.componentInstance.cityId=id
    console.log(id)
    modalRef.hidden.subscribe(() => {
      this.getCity();
     })
  }
  softDeleteCity(id : string){
    this.CitiesService.getCityById(id).subscribe(e=>
    {
      const Branch : any= e 
      Branch.isDeleted = true 
      this.CitiesService.updateCity(Branch).subscribe(e=>{
        this.getCity()
      })
    })
  }
  deleteCity(id: string) {
    const confirmDelete = confirm('Are you sure you want to delete this City?');
    this.CitiesService.deleteCity(id).subscribe(
      (response: any) => {
        console.log('City deleted successfully:', response);
        location.reload();
      },
      (error: any) => {
        console.error('Failed to delete City:', error);
      }
    );
  }
}
