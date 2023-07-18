import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ShippingSettingService } from 'src/app/Service/shipping-setting.service';

@Component({
  selector: 'app-add-shipping-setting',
  templateUrl: './add-shipping-setting.component.html',
  styleUrls: ['./add-shipping-setting.component.css']
})
export class AddShippingSettingComponent implements OnInit  {
  isEditMode: boolean = false;
  @Input() id:string='';
  name:string='';
  value:any=0;
  number_Of_Day:any=0
  constructor(
    private route: ActivatedRoute,
    private shippingsettingService: ShippingSettingService,
    private router: Router,
    private activeModal : NgbActiveModal,
    private toastr: ToastrService,


  ) {}
  shippingSettingForm =new FormGroup({
    shippingSettingName:new FormControl('',[Validators.required,Validators.minLength(3)]),
    ValueShipping:new FormControl('',[Validators.required]),
    Numberofday:new FormControl('',[Validators.required])
  })

  ngOnInit(){
    if (this.id) {
      this.isEditMode = true;
      this.getshippingSetting(this.id);
    }
  }
  close(){
    this.activeModal.close();
 
   }
 
  getshippingSetting(id: string) {
    this.shippingsettingService.getTShippingSettingbyId(id).subscribe((data: any) => {
      console.log(data)
      this.name = data.name_Of_Shipping;
      this.value = data.value_Of_shipping;
      this.number_Of_Day=data.number_Of_Days;
      this.shippingSettingForm.patchValue({
        shippingSettingName :this.name,
        ValueShipping : this.value ,
        Numberofday : this.number_Of_Day 
        
      })
    });
  }
  get getName() {
    return this.shippingSettingForm.controls['shippingSettingName'];
  }
  get getValueShipping() {
    return this.shippingSettingForm.controls['ValueShipping'];
  }
  get getnumber() {
    return this.shippingSettingForm.controls['Numberofday'];
  }
  submitForm() {
    if(this.shippingSettingForm.valid){
  
    if (this.isEditMode) {
      const settingData = {
        id:this.id,
         name: this.name,
         value: this.value,
         number_Of_Day: this.number_Of_Day,
         
       };
      this.updateShippingSetting(settingData);
      console.log(settingData)
    } else {
      const settingData = {
         name: this.name,
         value: this.value,
         number_Of_Day: this.number_Of_Day,
         
       };
      this.addShippingSetting(settingData);
      this.activeModal.close();

    }
  }else {
    this.toastr.error('حدثت مشكله في الخادم ', 'عذرا');
}
  }
  addShippingSetting(settingData: any) {
    this.shippingsettingService.addShippingSetting(settingData).subscribe((data: Object) => {});
    this.router.navigate(['/getShippingSetting']);
  }
  updateShippingSetting(settingData: any) {
    console.log(settingData);
    this.shippingsettingService.editShippingSetting(settingData).subscribe(
      (response: any) => {
      },
      (error: any) => {
        this.toastr.error('حدثت مشكله في الخادم ', 'عذرا');
      }
    );
    console.log(settingData);
  }
}
