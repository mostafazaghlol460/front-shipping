import { GovernatesServiceService } from './../../Service/governates-service.service';
import { Component, OnInit, NgModule, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, FormControl,FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-governate',
  templateUrl: './add-governate.component.html',
  styleUrls: ['./add-governate.component.css']
})
export class AddGovernateComponent implements OnInit {
  governateName: string = '';
  isEditMode: boolean = false;
  @Input() governateId: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private governateService: GovernatesServiceService,
    private router: Router,
    private activeModal : NgbActiveModal,
    private toastr: ToastrService,
  ) {}
  governateForm =new FormGroup({
    governateName:new FormControl('',[Validators.required,Validators.minLength(3)]),
      
    })

  ngOnInit() {
    
    // this.route.params.subscribe(params => {
    //   this.governateId = params['id']; // Assuming the route parameter is named 'id'
    //   if (this.governateId) {
    //     this.isEditMode = true;
    //     this.getGovernate(this.governateId);
    //   }
    // });

    if (this.governateId) {
          this.isEditMode = true;
          this.getGovernate(this.governateId);
        }
  }
  get getgovernateName() {
    return this.governateForm.controls['governateName'];
  }
  getGovernate(id: string) {
    this.governateService.getGovernateById(id).subscribe((data: any) => {
      this.governateName = data.name;
      this.governateForm.patchValue({
        governateName :this.governateName,
      })
    });
  }

  submitForm() {
    if(this.governateForm.valid){
   

    if (this.isEditMode) {
      const governateData = {
        id: this.governateId,
        name: this.governateName,
      };
      this.updateGovernate(governateData);
    } else {
      const governateData = {
        name: this.governateName,
      };
      this.addGovernate(governateData);
    }
    this.activeModal.close();
  }else{
    this.toastr.error('حدثت مشكله في الخادم ', 'عذرا');
  }
  }
  close(){
    this.activeModal.close();
 
   }
  addGovernate(governateData: any) {
    this.governateService
      .createGovernate(governateData)
      .subscribe((data: Object) => {});
  }

  updateGovernate(governateData: any) {
    this.governateService.updateGovernate(governateData).subscribe(
      (response: any) => {
      },
      (error: any) => {
      }
    );
    console.log(governateData);
  }
}
