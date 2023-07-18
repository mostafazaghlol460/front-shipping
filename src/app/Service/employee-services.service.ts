import { IEmployee } from './../models/IEmployee';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { updateEmployee } from '../models/IEmployee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServicesService {
  baseURL: string = 'https://localhost:7012/api/Employee';

  constructor(private http: HttpClient) {}

  //add
  createEmployee(model: IEmployee) {
    return this.http.post(`${this.baseURL}/Register`, model);
  }
  //getall
  getEmployee() {
    return this.http.get<any[]>(this.baseURL);
  }
  //getbyid
  getById(id: string) {
    return this.http.get<updateEmployee>(`${this.baseURL}/getById/${id}`);
  }
  //update
  updateEmployee(EmployeeData: any, Eid: string) {
    const url = `${this.baseURL}/Update/${Eid}`;
    return this.http.put(url, EmployeeData);
  }
  //delete
  delete(Eid: string) {
    const url = `${this.baseURL}/delete/${Eid}`;
    return this.http.delete(url);
  }
}
