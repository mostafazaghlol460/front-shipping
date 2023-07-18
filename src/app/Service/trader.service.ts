import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TraderService {
  baseURL: string = 'https://localhost:7012/api/Trader';

  constructor(private http: HttpClient) {}

  getAllTraders() {
    return this.http.get<any[]>(this.baseURL);
  }

  getTraderById(traderId: any) {
    return this.http.get(`${this.baseURL}/id?id=${traderId}`);
  }

  addTrader(trader: any) {
    return this.http.post(`${this.baseURL}/Add`, trader);
  }

  deleteTrader(traderId: any) {
    return this.http.delete(`${this.baseURL}/${traderId}`);
  }
  editTrader(trader: any) {
    return this.http.put(`${this.baseURL}/${trader.id}`, trader);
  }
}
