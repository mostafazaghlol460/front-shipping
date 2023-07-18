import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTraderComponent } from '../add-trader/add-trader.component';
import { TraderService } from './../../Service/trader.service';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UpdateTraderComponent } from '../update-trader/update-trader.component';

@Component({
  selector: 'app-get-traders',
  templateUrl: './get-traders.component.html',
  styleUrls: ['./get-traders.component.css']
})
export class GetTradersComponent {
  title = 'lab5';
  traders: any[] = [];
    // Pagination parameters.
    p: any = 1;
   count: any = 3;

  constructor(private traderService: TraderService,    private toastr: ToastrService,
       private modalService : NgbModal
    ) {}

  ngOnInit() {
    this.getTraders();
  }
  softDeletetrader(id : string){
    this.traderService.getTraderById(id).subscribe(e=>
    {
      const Branch : any= e 
      Branch.isDeleted = true 
      this.traderService.editTrader(Branch).subscribe(e=>{
        this.getTraders()
      })
    })
  }
  modal(){
    const modalRef = this.modalService.open(AddTraderComponent, { size: 'lg', backdrop: 'static' , centered: true});
    modalRef.hidden.subscribe(() => {
      this.getTraders();
     })
  }
  Edit(id : string){
    const modalRef = this.modalService.open(UpdateTraderComponent, { size: 'lg', backdrop: 'static' , centered: true});
    modalRef.componentInstance.Id=id
    console.log(id)
    modalRef.hidden.subscribe(() => {
      this.getTraders();
     })
  }
  getTraders() {
    this.traderService.getAllTraders().subscribe((data: object) => {
      this.traders = data as any[];
    });
  }

  delete(id: string) {
    const deleteConfirm = confirm('Are you Want Delete this Trader ?');
    this.traderService.deleteTrader(id).subscribe(
      (response: any) => {
        this.toastr.success('تم الحذف', '');
        location.reload();
      },
      (error: any) => {
        this.toastr.error('حدثت مشكله في الخادم ', 'عذرا');
      }
    );
  }
}
