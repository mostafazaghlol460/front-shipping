import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VillageServiceService {
  baseURL: string = 'https://localhost:7012/api/VillageSetting';

  constructor(private http: HttpClient) {}

  GetSetting(swId: string) {
    return this.http.get(`${this.baseURL}/${swId}`);
  }

  AddSetting(sw: any) {
    return this.http.post(this.baseURL, sw);
  }

  UpdateSetting(sw: any) {
    return this.http.put(`${this.baseURL}/${sw.id}`, sw);
  }

  GetAllSetting() {
    return this.http.get(`${this.baseURL}`);
  }
}
