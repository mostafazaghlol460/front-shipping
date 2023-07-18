import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ShippingSettingService } from 'src/app/Service/shipping-setting.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddShippingSettingComponent } from '../add-shipping-setting/add-shipping-setting.component';

@Component({
  selector: 'app-shipping-setting',
  templateUrl: './shipping-setting.component.html',
  styleUrls: ['./shipping-setting.component.css']
})
export class ShippingSettingComponent {
  setting: any[] = [];
  counter: number = 1;
  constructor(
    private location: Location,
    private router: Router,
    private settingService: ShippingSettingService,
    private modalService : NgbModal

  ) {}
  ngOnInit() {
 
    this.getsetting();
  }
  Edit(id : string){
    const modalRef = this.modalService.open(AddShippingSettingComponent, { size: 'lg', backdrop: 'static' , centered: true});
    modalRef.componentInstance.id=id
    console.log(id)
    modalRef.hidden.subscribe(() => {
      this.getsetting();
     })
  }
  modal(){
    const modalRef = this.modalService.open(AddShippingSettingComponent, { size: 'lg', backdrop: 'static' , centered: true});
    modalRef.hidden.subscribe(() => {
      this.getsetting();
     })
  }
  getsetting() {
    this.settingService.getShippingSetting().subscribe((data: Object) => {
      this.setting = data as any[]; 
           
    });
  }
  deleteShippingSetting(id: string) {

      this.settingService.deleteShippingSetting(id).subscribe(
        (response: any) => {
          console.log('ShippingSetting deleted successfully:', response);      
            this.getsetting();
        },
        (error: any) => {
          console.error('Failed to delete ShippingSetting:', error);
        }
      );
    }
    
  }

