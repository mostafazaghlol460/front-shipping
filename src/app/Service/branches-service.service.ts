import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BranchesServiceService {
  baseURL: string = 'https://localhost:7012/api/Branch';

  constructor(private http: HttpClient) {}

  createBranch(model: any) {
    return this.http.post(this.baseURL, model, { headers: this.getHeaders() });
  }

  getBranches() {
    return this.http.get(this.baseURL, { headers: this.getHeaders() });
  }

  updateBranch(branchData: any) {
    const url = `${this.baseURL}/${branchData.id}`;
    return this.http.put(url, branchData, {
      headers: this.getHeaders()
    });
  }
  getBranchById(id: string) {
    const url = `${this.baseURL}/${id}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }
  deleteBranch(id: string) {
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
