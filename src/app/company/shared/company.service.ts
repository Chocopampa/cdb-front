import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Company } from './company.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  SERVER_URL = 'http://localhost:8080/webapp/Company';

  constructor(private _httpClient: HttpClient) {}

  getAllCompanies(): Observable<Company[]> {
    return this._httpClient.get<Company[]>(this.SERVER_URL);
  }

  getCompaniesSpecified(
    order_by: string,
    type_ascend: string,
    search: string,
    limit: string,
    offset: string
  ): Observable<Company[]> {
    return this._httpClient.get<Company[]>(`${this.SERVER_URL}`, {
      params: new HttpParams()
        .set('order', order_by)
        .set('type', type_ascend)
        .set('search', search)
        .set('limit', limit)
        .set('offset', offset)
    });
  }

  getCompany(id: string): Observable<Company> {
    return this._httpClient.get<Company>(`${this.SERVER_URL}/${id}`);
  }

  postCompany(company: Company): Observable<Company> {
    return this._httpClient.post<Company>(`${this.SERVER_URL}/create`, company);
  }

  putCompany(company: Company, id: string): Observable<Company> {
    return this._httpClient.put<Company>(
      `${this.SERVER_URL}/update/${id}`,
      company
    );
  }

  deleteCompany(id: number): Observable<Company> {
    return this._httpClient.delete<Company>(`${this.SERVER_URL}/${id}`);
  }
}
