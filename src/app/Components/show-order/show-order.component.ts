import { GetAllOrderService } from './../../Service/get-all-order.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-order',
  templateUrl: './show-order.component.html',
  styleUrls: ['./show-order.component.css']
})
export class ShowOrderComponent implements OnInit {
  Order_Report: any[] = [];
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
    private router: Router
  ) {}

  ngOnInit() {
    this.loadReport();
  }
  // softDeleteemployee(id : string){
  //   this.EmployeeServicesService.getById(id).subscribe((e: any)=>
  //   {
  //     const Branch : any= e 
  //     Branch.isDeleted = true 
  //     this.EmployeeServicesService.updateEmployee(id,Branch).subscribe((e: any)=>{
  //       this.loadEmployee()
  //     })
  //   })
  // }
  // loadEmployee() {
  //   throw new Error('Method not implemented.');
  // }
  loadReport() {
    this.getAllOrderService.GetShipping().subscribe((data: any) => {
      this.Order_Report = data.data;
      console.log(data);
    });
  }
  filterOrders(status: string) {
    this.getAllOrderService.getOrdersByStatus(status).subscribe((data: any) => {
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
