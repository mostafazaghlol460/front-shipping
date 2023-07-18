import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GovernatesServiceService {
  baseURL: string = 'https://localhost:7012/api/Governates';

  constructor(private http: HttpClient) {}

  createGovernate(model: any) {
    return this.http.post(this.baseURL, model, { headers: this.getHeaders() });
  }

  getGovernates() {
    return this.http.get<any[]>(this.baseURL, { headers: this.getHeaders() });
  }

  updateGovernate(governateData: any) {
    const url = `${this.baseURL}/${governateData.id}`;
    return this.http.put(url, governateData, {
      headers: this.getHeaders()
    });
  }
  getGovernateById(id: string) {
    const url = `${this.baseURL}/${id}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }
  deleteGovernate(id: string) {
    return this.http.delete(`${this.baseURL}/${id}`, {
      headers: this.getHeaders()
    });
  }
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
  }
}
