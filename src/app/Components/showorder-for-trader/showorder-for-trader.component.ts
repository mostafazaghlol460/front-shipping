import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetAllOrderService } from 'src/app/Service/get-all-order.service';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-showorder-for-trader',
  templateUrl: './showorder-for-trader.component.html',
  styleUrls: ['./showorder-for-trader.component.css']
})
export class ShoworderForTraderComponent implements OnInit {
  Order_Report: any[] = [];
  id : any =this.authService.getId();
  EmployeeServicesService: any;
  orderStates :any[]=[
    {name:'جديد',value:0},
    {name:'قيد الانتظار',value:1},
    {name:'تم التسليم للمندوب',value:2},
    {name:'تم التسليم',value:3},
    {name:'لا يمكن الوصول',value:4},
    {name:'تم التأجيل',value:5},
    {name:'تم التسليم حزيئا',value:6},
    {name:'تم الإلغاء قبل التسليم',value:7},
    {name:'تم الرفض مع الدفع',value:8},
    {name:'رفض مع سداد جزء',value:9},
    {name:'رفض ولم يتم الدفع',value:10}
  ]
  constructor(
    private getAllOrderService: GetAllOrderService,
    private router: Router ,
   private authService : AuthService
  ) {}

  ngOnInit() {
    this.loadReport();
  }

  loadReport() {
    this.getAllOrderService.GetShippingForTrader(this.id).subscribe((data: any) => {
      this.Order_Report = data.data;
      console.log(data);
    });
  }
  filterOrders(status: string) {
    this.getAllOrderService.getOrdersByStatusforTrader(status,this.id).subscribe((data: any) => {
      console.log(data.data);
      this.Order_Report = data.data;
    });
  }
  deleteOrder(id: string) {
    if (confirm('Are you sure you want to delete this order?')) {
      this.getAllOrderService.deleteOrder(id).subscribe((data: any) => {
        console.log(data);

        alert('Order deleted successfully.');
        location.reload();
      });
    }
  }
}
