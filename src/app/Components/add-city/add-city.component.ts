import { ActivatedRoute, Router } from '@angular/router';
import { GovernatesServiceService } from './../../Service/governates-service.service';
import { CitiesServiceService } from './../../Service/cities-service.service';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { governates } from './../../models/Governorate';
@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent {
  @Input() cityId: string = '';
  CityName: string = '';
  isEditMode: boolean = false;
  governateId: string = '';
  regular_Shipping: any = 0;
  governates: any[] = [];
  selectedGovernateId: string = '';

  constructor(
    private route: ActivatedRoute,
    private governateService: GovernatesServiceService,
    private citiesService: CitiesServiceService,
    private router: Router,
    private activeModal: NgbActiveModal,
    private toastr: ToastrService,
  ) { }
  cityForm = new FormGroup({
    CityName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    regularShipping: new FormControl('', [Validators.required]),
    governate: new FormControl('', [Validators.required])
  })
  fetchGovernates() {
    this.governateService.getGovernates().subscribe((data: any) => {
      this.governates = data;
      console.log(this.governates);
    });
  }
  ngOnInit() {
    // this.route.params.subscribe(params => {
    //   this.cityId = params['id']; // Assuming the route parameter is named 'id'
    //   if (this.cityId) {
    //     this.isEditMode = true;
    //     this.getCity(this.cityId);
    //   }
    //   this.fetchGovernates();
    // });

    if (this.cityId) {
          this.isEditMode = true;
          this.getCity(this.cityId);
        }
        this.fetchGovernates();
  }
  get getcityhName() {
    return this.cityForm.controls['CityName'];
  }
  get getregularShipping() {
    return this.cityForm.controls['regularShipping'];
  }
  get getgovernate() {
    return this.cityForm.controls['governate'];
  }

  getCity(id: string) {
    this.citiesService.getCityById(id).subscribe((data: any) => {
      this.CityName = data.name;
      this.regular_Shipping = data.regular_Shipping;
      this.governateId = data.id_Governate;
      this.selectedGovernateId = this.governateId;
      this.cityForm.patchValue({
        CityName :this.CityName,
        regularShipping : this.regular_Shipping ,
        governate : this.selectedGovernateId 
      })
    });
  }

  submitForm() {
    if (this.cityForm.valid) {
      

      if (this.isEditMode) {
        const cityData = {
          id: this.cityId,
          name: this.CityName,
          regular_Shipping: this.regular_Shipping,
          id_Governate: this.selectedGovernateId
        };
        this.updateCity(cityData);
      } else {
        const cityData = {
          name: this.CityName,
          regular_Shipping: this.regular_Shipping,
          id_Governate: this.selectedGovernateId
        };
        this.addCity(cityData);
      }
      this.activeModal.close();

    } else {
      this.toastr.error('حدثت مشكله في الخادم ', 'عذرا');
    }
  }

  addCity(cityData: any) {
    this.citiesService.createCity(cityData).subscribe((data: Object) => { });
  }
  close(){
    this.activeModal.close();
 
   }
 

  updateCity(cityData: any) {
    this.citiesService.updateCity(cityData).subscribe(
      (response: any) => {
      },
      (error: any) => {
        this.toastr.error('حدثت مشكله في الخادم ', 'عذرا');
      }
    );
    console.log(cityData);
  }
}
