import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CityGovernateBranchService {
  constructor(private http: HttpClient) {}

  baseURL: string = 'https://localhost:7012/api/Governates';
  baseURL2: string = 'https://localhost:7012/api/Cities';
  baseURL3: string = 'https://localhost:7012/api/Branch';

  getGovernates() {
    return this.http.get<any[]>(this.baseURL);
  }

  getCities() {
    return this.http.get(this.baseURL2);
  }

  getBranches() {
    return this.http.get(this.baseURL3);
  }
}
