import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from './company.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  SERVER_URL = '10.0.1.200:8080/webapp/Company';

  constructor(private _httpClient: HttpClient) { }

  getAllCompanies(): Observable<Company[]> {
    return this._httpClient.get<Company[]>(this.SERVER_URL);
  }
}
