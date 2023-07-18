import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Service/auth.service';
import { GetAllOrderService } from 'src/app/Service/get-all-order.service';

@Component({
  selector: 'app-home-for-trader',
  templateUrl: './home-for-trader.component.html',
  styleUrls: ['./home-for-trader.component.css']
})
export class HomeForTraderComponent implements OnInit{
  orders : number[] =[]
  id : any =this.authservice.getId();
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
  (private orderServise:GetAllOrderService,private authservice:AuthService)
   {}
    ngOnInit(): void
    {
      this.orderServise.TraderCount(this.id).subscribe(e=>{
        this.orders = e ; 
      })
    }
  
  
  }
  