import { SpecialPriceService } from './../../Service/special-price.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-get-special-price',
  templateUrl: './get-special-price.component.html',
  styleUrls: ['./get-special-price.component.css']
})
export class GetSpecialPriceComponent implements OnInit {
  specialPrices: any[] = [];
   // Pagination parameters.
    p: any = 1;
   count: any = 3;
  /**
   *
   */
  constructor(private spService: SpecialPriceService) {}
  ngOnInit() {
    this.getAllPrices();
  }

  getAllPrices() {
    this.spService.getSpecialPrices().subscribe((sp: object) => {
      this.specialPrices = sp as any[];
    });
  }

  deleteSP(id: string) {
    const deleteConfirm = confirm('Are you Want Delete this Package ?');
    this.spService.deleteSpecialPrice(id).subscribe(
      (response: any) => {
        alert('Trader Deleted Successfulty..');
        location.reload();
      },
      (error: any) => {
        console.log('Failed to delete..');
      }
    );
  }
}
