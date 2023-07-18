import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpecialPriceService {
  baseURL: string = 'https://localhost:7012/api/SpecialPrice';

  constructor(private http: HttpClient) {}

  getSpecialPrices() {
    return this.http.get<any[]>(this.baseURL);
  }

  getSpecialById(spId: any) {
    return this.http.get(`${this.baseURL}/id?id=${spId}`);
  }

  addSpecialPrice(sp: any) {
    return this.http.post(this.baseURL, sp);
  }

  deleteSpecialPrice(spId: any) {
    return this.http.delete(`${this.baseURL}/${spId}`);
  }
  editSpecialPrice(sp: any) {
    return this.http.put(`${this.baseURL}/${sp.id}`, sp);
  }
}
