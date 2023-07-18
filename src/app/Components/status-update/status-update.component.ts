import { Router, ActivatedRoute } from '@angular/router';
import { GetAllOrderService } from './../../Service/get-all-order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-update',
  templateUrl: './status-update.component.html',
  styleUrls: ['./status-update.component.css']
})
export class StatusUpdateComponent implements OnInit {
  statuses: string[] = [
    'New',
    'Pending',
    'RepresentitiveDelivered',
    'ClientDelivered',
    'UnReachable',
    'Postponed',
    'PartiallyDelivered',
    'ClientCanceled',
    'RejectWithPaying',
    'RejectWithPartialPaying',
    'RejectFromEmployee'
  ];
  selectedStatus: string = '';
  id: string = '';

  constructor(
    private route: ActivatedRoute,
    private getAllOrderService: GetAllOrderService,
    private router: Router
  ) {}
  ngOnInit() {
    this.route.params.subscribe(e => {
      this.id = e['id'];
      this.loadData(this.id);
    });
  }
  loadData(id: string) {
    this.getAllOrderService.GetorderByID(id).subscribe((data: any) => {
      // console.log(data);
      this.selectedStatus = data.stauts_of_Shipping;
      console.log(data);

      console.log(data.stauts_of_Shipping);
    });
  }
  updateStatus() {
    console.log('Selected status:', this.selectedStatus);
    this.getAllOrderService
      .updateOrderStatus(this.id, this.selectedStatus)
      .subscribe(
        response => {
          this.router.navigate(['/employee/ShowOrder']);
          console.log('Order status updated successfully:', response);
          // Handle the success response, e.g., display a success message
        },
        error => {
          console.log('Failed to update order status:', error);
          // Handle the error response, e.g., display an error message
        }
      );
  }
}
