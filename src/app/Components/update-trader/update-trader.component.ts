import { TraderService } from './../../Service/trader.service';
import { CityGovernateBranchService } from './../../Service/city-governate-branch.service';

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-trader',
  templateUrl: './update-trader.component.html',
  styleUrls: ['./update-trader.component.css']
})
export class UpdateTraderComponent implements OnInit {
  @ViewChild('traderForm', { static: false }) traderForm!: NgForm;

 @Input() Id: string = '';
  Name: string = '';
  Email: string = '';
  Password: string = '';
  Phone: string = '';
  Address: string = '';
  Id_Governate: number = 0;
  Id_City: number = 0;
  Id_Branch: number = 0;
  Per_Rejected_order: number = 0;
  IsDeleted: boolean = false;
  governates: any[] = [];
  cities: any[] = [];
  branches: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: CityGovernateBranchService,
    private traderService: TraderService,
    private activeModal : NgbActiveModal,

  ) {}
  close(){
    this.activeModal.close();
 
   }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.Id = params['id'];
      console.log('ID:', this.Id);
      this.traderService.getTraderById(this.Id).subscribe(
        (trader: any) => {
          console.log('Trader:', trader);
          this.Name = trader['name'];
          this.Email = trader['email'];
          this.Password = trader['password'];
          this.Phone = trader['phone'];
          this.Address = trader['address'];
          this.Id_Governate = trader['id_Governate'];
          this.Id_City = trader['id_City'];
          this.Id_Branch = trader['id_Branch'];
          this.Per_Rejected_order = trader['per_Rejected_order'];
          this.IsDeleted = trader['is_Deleted'];
          console.log(trader['id_Branch']);
        },
        error => {
          console.log(error);
        }
      );
    });

    this.dataService.getGovernates().subscribe(
      (data: any) => {
        this.governates = data;
      },
      error => {
        console.log(error);
      }
    );

    this.dataService.getCities().subscribe(
      (data: any) => {
        this.cities = data;
      },
      error => {
        console.log(error);
      }
    );

    this.dataService.getBranches().subscribe(
      (data: any) => {
        this.branches = data;
      },
      error => {
        console.log(error);
      }
    );

    console.log(this.Id_Branch);
  }

  Update() {
    if (this.traderForm.valid) {
      const data = {
        id: this.Id,
        name: this.Name,
        email: this.Email,
        password: this.Password,
        phone: this.Phone,
        address: this.Address,
        id_governate: this.Id_Governate,
        id_city: this.Id_City,
        id_branch: this.Id_Branch,
        per_rejected_order: this.Per_Rejected_order,
        is_deleted: this.IsDeleted
      };

      console.log(data);

      this.traderService.editTrader(data).subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/get-traders']);
        },
        error => {
          console.log(error);
        }
      );
    } else {
      alert('Data is not Valid !!');
    }
  }
}
