import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShippingSettingService {
  baseURL: string = 'https://localhost:7012/api/Setting_Shipping';
  constructor(private http: HttpClient) { }
  getShippingSetting() {
    return this.http.get<any[]>(this.baseURL);
  }

  getTShippingSettingbyId(ShippingSettingId: any) {
    return this.http.get(`${this.baseURL}/${ShippingSettingId}`);
  }

  addShippingSetting(ShippingSetting: any) {
    return this.http.post(this.baseURL, ShippingSetting);
  }

  deleteShippingSetting(ShippingSettingId: any) {
    return this.http.delete(`${this.baseURL}/${ShippingSettingId}`);
  }
  editShippingSetting(ShippingSetting: any) {
    return this.http.put(`${this.baseURL}/${ShippingSetting.id}`, ShippingSetting);
  }
}
