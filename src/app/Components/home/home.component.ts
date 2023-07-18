import { Component, OnInit } from '@angular/core';
import { GetAllOrderService } from './../../Service/get-all-order.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
orders : number[] =[]
status : string [] =[

  'جديد',
  'قيد الانتظار',
  'تم التسليم للمندوب',
  'تم التسليم',
  'لا يمكن الوصول',
  'تم التأجيل',
  'تم التسليم حزيئا',
  'تم الإلغاء قبل التسليم',
  'تم الرفض مع الدفع',
  'رفض مع سداد جزء',
  'رفض ولم يتم الدفع'

]
constructor
(private orderServise:GetAllOrderService)
 {}

  ngOnInit(): void
  {
    this.orderServise.EmpCount().subscribe(e=>{
      this.orders = e ;


    })
  }


}
