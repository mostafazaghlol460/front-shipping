import { VillageServiceService } from './../../Service/village-service.service';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-village-setting',
  templateUrl: './village-setting.component.html',
  styleUrls: ['./village-setting.component.css']
})
export class VillageSettingComponent implements OnInit {
  Id: string = '';

  value: number = 0;

  isEditMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private villageServiceService: VillageServiceService,
    private router: Router,
    private modalService : NgbModal

  ) {}

  wsettingForm = new FormGroup({
    value: new FormControl('', [Validators.required])
  });
  modal(){
    const modalRef = this.modalService.open(AlertComponent, { size: 'md', backdrop: 'static' , centered: true});
   
  }
  ngOnInit() {
    this.villageServiceService.GetAllSetting().subscribe((data: any) => {
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

  get getValue() {
    return this.wsettingForm.controls['value'];
  }

  getWeight_shipping(id: string) {
    console.log('suucess21');
    this.villageServiceService.GetSetting(id).subscribe((data: any) => {
      this.value = data.value;

      console.log(data.value);
    });
  }

  AddSetting(sw: any) {
    this.villageServiceService.AddSetting(sw).subscribe((data: any) => {
      //  this.weight_shipping = data;
      console.log(data);
    });
  }
  UpdateSetting(sw: any) {
    this.villageServiceService.UpdateSetting(sw).subscribe((data: any) => {
    });
  }

  submitForm() {
    if (this.wsettingForm.valid) {
      const sw = {
        id: this.Id,
        value: this.value
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
