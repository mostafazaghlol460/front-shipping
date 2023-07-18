import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IRepresentive, updateRepresentative } from '../models/IRepresentive';


@Injectable({
  providedIn: 'root'
})
export class RepresentiveServiceService {
  baseURL: string = 'https://localhost:7012/api/Representive';

  constructor(private http: HttpClient) { }

  createRepresentive(model: IRepresentive) {
    return this.http.post(`${this.baseURL}/Register`, model);
  }

  getRepresentive() {
    return this.http.get<any[]>(this.baseURL);
  }

  getById(id:string){
    return this.http.get<updateRepresentative>(`${this.baseURL}/getById/${id}`);
  }
   
  updateRepreentive(RepresentiveData: any,Rid : string) {
    const url = `${this.baseURL}/Update/${Rid}`;
    return this.http.put(url, RepresentiveData);
  }

  delete(Rid : string){
    const url = `${this.baseURL}/delete/${Rid}`;
    return this.http.delete(url);


  }
}
