import { GetAllOrderService } from './../../Service/get-all-order.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-report-shipping',
  templateUrl: './report-shipping.component.html',
  styleUrls: ['./report-shipping.component.css']
})
export class ReportShippingComponent implements OnInit {
  isDeleted: string | undefined;
  counter: number = 1;
  Order_Report: any[] = [];
  constructor(
    private router: Router,
    private getAllOrderService: GetAllOrderService
  ) {}
  ngOnInit() {
    this.loadReport();
  }
  loadReport() {
    this.getAllOrderService.GetReportShipping().subscribe((data: any) => {
      this.Order_Report = data.data as any[];
      this.Order_Report.forEach(element => {
        element.date = formatDate(element.date, 'yyyy-MM-dd', 'en-US');
      });
      console.log(this.Order_Report);
    });
  }

  // delete(id: string) {
  //   this.EmployeeServicesService.delete(id).subscribe(e => {
  //     this.loadEmployee();
  //     alert('Done');
  //   });
  // }
}
