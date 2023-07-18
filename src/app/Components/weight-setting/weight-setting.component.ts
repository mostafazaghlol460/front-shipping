import { WeightSettingServiceService } from './../../Service/weight-setting-service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-weight-setting',
  templateUrl: './weight-setting.component.html',
  styleUrls: ['./weight-setting.component.css']
})
export class WeightSettingComponent implements OnInit {
  Id: string = '';

  weight_shipping: number = 0;
  extra_weight: number = 0;
  isEditMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private WeightSettingServiceService: WeightSettingServiceService,
    private router: Router,
    private toastr: ToastrService,
    private modalService : NgbModal


  ) {}

  wsettingForm = new FormGroup({
    weight_shipping: new FormControl('', [Validators.required]),
    extra_weight: new FormControl('', [Validators.required])
  });
  modal(){
    const modalRef = this.modalService.open(AlertComponent, { size: 'md', backdrop: 'static' , centered: true});
   
  }
  ngOnInit() {
    this.WeightSettingServiceService.GetAllSetting().subscribe((data: any) => {
      if (Array.isArray(data)) {
        data.forEach(element => {
          this.Id = element.id;
        });

        console.log(this.Id); // Assuming the route parameter is named 'id'
        if (this.Id) {
          console.log('success');
          this.isEditMode = true;
          this.getWeight_shipping(this.Id);
        }
      } else {
        console.log('Data is not an array');
      }
    });
  }

  get getshippingweight() {
    return this.wsettingForm.controls['weight_shipping'];
  }
  get getextraweight() {
    return this.wsettingForm.controls['extra_weight'];
  }

  getWeight_shipping(id: string) {
    console.log('suucess21');
    this.WeightSettingServiceService.GetSetting(id).subscribe((data: any) => {
      this.extra_weight = data.extra_weight;
      this.weight_shipping = data.weight_shipping;
      console.log(data.extra_weight);
    });
  }

  AddSetting(sw: any) {

      this.WeightSettingServiceService.AddSetting(sw).subscribe((data: any) => {
          //  this.weight_shipping = data;
          console.log(data)
          this.router.navigate(["/"])
     });

    this.WeightSettingServiceService.AddSetting(sw).subscribe((data: any) => {
      //  this.weight_shipping = data;
      console.log(data);
      this.router.navigate(['/']);
    });

  }
  UpdateSetting(sw: any) {
    this.WeightSettingServiceService.UpdateSetting(sw).subscribe(
      (data: any) => {
      }
    );
  }
  
  submitForm() {
    if (this.wsettingForm.valid) {
      const sw = {
        id: this.Id,
        weight_shipping: this.weight_shipping,
        extra_weight: this.extra_weight
      };
      console.log(sw);
      if (this.isEditMode) {
        this.UpdateSetting(sw);
      } else {
        this.AddSetting(sw);
      }
    } else {
      alert('data not valid');
    }
  }
}
