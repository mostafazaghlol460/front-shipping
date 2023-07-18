import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CitiesServiceService {
  baseURL: string = 'https://localhost:7012/api/Cities';

  constructor(private http: HttpClient) {}

  createCity(model: any) {
    return this.http.post(this.baseURL, model, { headers: this.getHeaders() });
  }

  getCities() {
    return this.http.get(this.baseURL, { headers: this.getHeaders() });
  }

  updateCity(governateData: any) {
    const url = `${this.baseURL}/${governateData.id}`;
    return this.http.put(url, governateData, {
      headers: this.getHeaders()
    });
  }
  getCityById(id: string) {
    const url = `${this.baseURL}/${id}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }
  deleteCity(id: string) {
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
