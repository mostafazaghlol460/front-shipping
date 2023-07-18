import { CityGovernateBranchService } from './../../Service/city-governate-branch.service';
import { TraderService } from './../../Service/trader.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddSpecialPriceComponent } from '../add-special-price/add-special-price.component';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-add-trader',
  templateUrl: './add-trader.component.html',
  styleUrls: ['./add-trader.component.css']
})
export class AddTraderComponent implements OnInit {
  @ViewChild('traderForm', { static: false }) traderForm!: NgForm;
  Name: string = '';
  Address: string = '';
  Email: string = '';
  Id_Branch: string = '';
  Id_City: string = '';
  Password: string = '';
  Per_Rejected_order: number = 0;
  Phone: string = '';
  Id_Governate: string = '';
  IsDeleted: boolean = false;
  cities: any[] = [];
  governates: any[] = [];
  branches: any[] = [];

  /**
   *
   */
  constructor(
    private CGBService: CityGovernateBranchService,
    private route: ActivatedRoute,
    private traderService: TraderService,
    private router: Router,
    private activeModal : NgbActiveModal,
    private modalService : NgbModal


  ) {}
  ngOnInit() {
    this.getBranches();
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
  alert(){
 
  }
  getCities() {
    this.CGBService.getCities().subscribe((data: any) => {
      this.cities = data;
      console.log(this.governates);
    });
  }
  modal(){
    const modalRef = this.modalService.open(AddSpecialPriceComponent, { size: 'lg', backdrop: 'static' , centered: true});

  }
  getBranches() {
    this.CGBService.getBranches().subscribe((data: any) => {
      this.branches = data;
      console.log(this.governates);
    });
  }

  Submit() {
    if (this.traderForm.valid) {
      const newTrader = {
        name: this.Name,
        address: this.Address,
        email: this.Email,
        id_Branch: this.Id_Branch,
        id_City: this.Id_City,
        password: this.Password,
        per_Rejected_order: this.Per_Rejected_order,
        phone: this.Phone,
        id_Governate: this.Id_Governate,
        isDeleted: false
      };

      this.traderService.addTrader(newTrader).subscribe((data: any) => {
        console.log(data);
        const modalRef = this.modalService.open(AlertComponent, { size: 'md', backdrop: 'static' , centered: true});
        
      });
    }
  }
}
