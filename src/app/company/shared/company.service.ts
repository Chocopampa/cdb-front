import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Company } from './company.model';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/user/shared/user.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  SERVER_URL = 'http://localhost:8080/webapp/Company';

  constructor(
    private _httpClient: HttpClient,
    private _userService: UserService
  ) {}

  getCompaniesSpecified(
    order_by: string,
    type_ascend: string,
    search: string,
    limit: string,
    offset: string
  ): Observable<Company[]> {
    return this._httpClient.get<Company[]>(`${this.SERVER_URL}`, {
      headers: new HttpHeaders({
        authorization: this._userService.getToken()
      }),
      params: new HttpParams()
        .set('order', order_by)
        .set('type', type_ascend)
        .set('search', search)
        .set('limit', limit)
        .set('offset', offset)
    });
  }

  getAllCompany(): Observable<Company[]> {
    return this._httpClient.get<Company[]>(
      `${this.SERVER_URL}/allCompanies`,
      {
        headers: new HttpHeaders({
          authorization: this._userService.getToken()
        })
      }
    );
  }

  getCompany(id: string): Observable<Company> {
    return this._httpClient.get<Company>(`${this.SERVER_URL}/${id}`, {
      headers: new HttpHeaders({
        authorization: this._userService.getToken()
      })
    });
  }

  getCompanyCount(): Observable<number> {
    return this._httpClient.get<number>(`${this.SERVER_URL}/count`, {
      headers: new HttpHeaders({
        authorization: this._userService.getToken()
      })
    });
  }

  getCompanySearchCount(search: string): Observable<number> {
    return this._httpClient.get<number>(`${this.SERVER_URL}/searchCount`, {
      params: new HttpParams().set('search', search)
    });
  }

  postCompany(company: Company) {
    return this._httpClient.post<any>(
      `${this.SERVER_URL}/create`,
      company,
      {
        observe: 'response',
        headers: new HttpHeaders({
          authorization: this._userService.getToken()
        })
      }
    );
  }

  putCompany(company: Company, id: string) {
    return this._httpClient.put<any>(
      `${this.SERVER_URL}/update/${id}`,
      company,
      {
        observe: 'response',
        headers: new HttpHeaders({
          authorization: this._userService.getToken()
        })
      }
    );
  }

  deleteCompany(id: number): Observable<Company> {
    return this._httpClient.delete<Company>(`${this.SERVER_URL}/${id}`, {
      headers: new HttpHeaders({
        authorization: this._userService.getToken()
      })
    });
  }
}
