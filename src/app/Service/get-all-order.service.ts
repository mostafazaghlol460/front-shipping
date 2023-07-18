import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetAllOrderService {
  baseURL: string = 'https://localhost:7012/api/Order';
  constructor(private http: HttpClient) {}
  GetReportShipping() {
    return this.http.get<any[]>(this.baseURL);
  }
  GetShipping() {
    return this.http.get<any[]>('https://localhost:7012/Show_Order');
  }
  GetShippingForTrader(id:string) {
    return this.http.get<any[]>(`https://localhost:7012/Show_OrderforTrader?id=${id}`);
  }
  getOrdersByStatus(status: string) {
    return this.http.get<any[]>(
      `https://localhost:7012/FilterStatus?Name_status=${status}`
    );
  }

  getOrdersByStatusforTrader(status: string,id:string) {
    return this.http.get<any[]>(
      `https://localhost:7012/FilterStatusForTrader?Name_status=${status}&traderId=${id}`
    );
  }
  updateOrderStatus(id: string, status: string) {
    return this.http.put<any[]>(
      `https://localhost:7012/filter/${id}?newstatus=${status}`,
      status
    );
  }
  GetorderByID(id: string) {
    return this.http.get<any[]>(`${this.baseURL}/${id}`);
  }
  AddOrder(model: any) {
    return this.http.post(this.baseURL, model);
  }
  updateOrder(updatedData: any) {
    const url = `${this.baseURL}/${updatedData.id}`;
    return this.http.put<any[]>(url, updatedData);
  }
  deleteOrder(id: string) {
    const url = `${this.baseURL}/${id}`;
    return this.http.delete<any[]>(url);
  }

  EmpCount() {
    return this.http.get<any[]>(`${this.baseURL}/EmpCount`);
  }
  TraderCount(id:string) {
    return this.http.get<any[]>(`${this.baseURL}/TraderCount/${id}`);
  }
}
