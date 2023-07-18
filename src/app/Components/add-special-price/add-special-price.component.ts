import { SpecialPriceService } from './../../Service/special-price.service';
import { CityGovernateBranchService } from './../../Service/city-governate-branch.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-special-price',
  templateUrl: './add-special-price.component.html',
  styleUrls: ['./add-special-price.component.css']
})
export class AddSpecialPriceComponent implements OnInit {
  Id: string = '';

  Price: string = '';
  IsDeleted: boolean = false;

  Id_Governate: string = '';
  Id_City: string = '';

  cities: any[] = [];
  governates: any[] = [];

  /**
   *
   */
  constructor(
    private CGBService: CityGovernateBranchService,
    private route: ActivatedRoute,
    private spService: SpecialPriceService,
    private router: Router,
    private activeModal : NgbActiveModal,

  ) {}
  ngOnInit() {
    this.getCities();
    this.getGovernates();
  }
  close(){
    this.activeModal.close();
 
   }
  getGovernates() {
    this.CGBService.getGovernates().subscribe((data: any) => {
      this.governates = data;
      console.log(this.governates);
    });
  }

  getCities() {
    this.CGBService.getCities().subscribe((data: any) => {
      this.cities = data;
      console.log(this.governates);
    });
  }

  Submit(packageForm: NgForm) {
    if (packageForm.valid) {
      const newPrice = {
        Id: this.Id,
        Price: this.Price,
        Id_City: this.Id_City,
        Id_Governate: this.Id_Governate
      };

      this.spService.addSpecialPrice(newPrice).subscribe((data: any) => {
        console.log(data);

      });
    } else {
    }
  }
}
