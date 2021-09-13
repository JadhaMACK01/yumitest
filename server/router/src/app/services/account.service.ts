import { Account } from '../../../src/app/models/account.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const baseUrl = 'http://localhost:8080/skillsme/accounts' //CH1 8080-8081

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  getAl(email: any): Observable<Account[]> {
    return this.http.get<Account[]>(baseUrl);
  }

  
  create(data: any): Observable<any> {
    //alert(data.email)
    return this.http.post(baseUrl, data);
    
  }

  update(email: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${email}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  get(email: any): Observable<Account> {
    return this.http.get(`${baseUrl}/${email}`);
  }
  
}