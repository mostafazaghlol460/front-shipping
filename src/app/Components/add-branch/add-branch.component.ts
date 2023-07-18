import { CitiesServiceService } from './../../Service/cities-service.service';
import { BranchesServiceService } from './../../Service/branches-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.css']
})
export class AddBranchComponent {
  cityId: string = '';
  @Input() branchId: string = '';
  BranchName: string = '';
  isEditMode: boolean = false;
  Date: string = '';
  cities: any[] = [];
  selectedCityId: string = '';
  constructor(
    private route: ActivatedRoute,
    private branchService: BranchesServiceService,
    private citiesService: CitiesServiceService,
    private router: Router,
    private activeModal : NgbActiveModal,
    private toastr: ToastrService,
  ) {
   
  }
  branchesForm =new FormGroup({
    BranchName:new FormControl('',[Validators.required,Validators.minLength(3)]),
    Date:new FormControl('',[Validators.required]),
    cities:new FormControl('',[Validators.required])
  })

  
  fetchCities() {
    this.citiesService.getCities().subscribe((data: any) => {
      this.cities = data;
    });
  }
  ngOnInit()  {
    // this.route.params.subscribe(params => {
    //   this.branchId = params['id'];
    //   console.log(this.branchId); // Assuming the route parameter is named 'id'
    //   
    //   this.fetchCities();
    // });

    if (this.branchId) {
          console.log('success');
          this.isEditMode = true;
          this.getCity(this.branchId);
        }
       this.fetchCities();
       console.log(this.branchId)

  }
  get getBranchName() {
    return this.branchesForm.controls['BranchName'];
  }
  get getdate() {
    return this.branchesForm.controls['Date'];
  }
  get getcities() {
    return this.branchesForm.controls['cities'];
  }
  getCity(id: string) {
    console.log('suucess21');
    this.branchService.getBranchById(id).subscribe((data: any) => {
      this.BranchName = data.name;
      this.Date = formatDate(data.date, 'yyyy-MM-dd', 'en-US');
      this.cityId = data.id_city;
      this.selectedCityId = this.cityId;
      this.branchesForm.patchValue({
        BranchName :this.BranchName,
        Date : this.Date ,
        cities : this.selectedCityId 
      })
      console.log(this.cityId);
    });
  }

  submitForm() {
    if(this.branchesForm.valid){
    if (this.isEditMode) {
      const branchData = {
        id: this.branchId!,
        name: this.BranchName,
        date: this.Date,
        id_City: this.selectedCityId
      };
      this.updateBranch(branchData);
    } else {
      const branchData = {
        name: this.BranchName,
        date: this.Date,
        id_City: this.selectedCityId
      };
      this.addBranch(branchData);
    }
   this.activeModal.close();
    }
  else{
    this.toastr.error('حدثت مشكله في الخادم ', 'عذرا');
  }
  }
  
  close(){
   this.activeModal.close();

  }

  addBranch(branchData: any) {
    this.branchService.createBranch(branchData).subscribe((data: Object) => {});
  }

  updateBranch(branchData: any) {
    console.log(branchData);
    this.branchService.updateBranch(branchData).subscribe(
      (response: any) => {
      },
      (error: any) => {
        this.toastr.error('حدثت مشكله في الخادم ', 'عذرا');
      }
    );
    console.log(branchData);
  }
}
