import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Computer } from './computer.model';
import { UserService } from 'src/app/user/shared/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComputerService {
  SERVER_URL = 'http://localhost:8080/webapp/Computer';

  constructor(
    private _httpClient: HttpClient,
    private _userService: UserService
  ) {}

  getComputersSpecified(
    order_by: string,
    type_ascend: string,
    search: string,
    limit: string,
    offset: string
  ): Observable<Computer[]> {
    return this._httpClient.get<Computer[]>(`${this.SERVER_URL}`, {
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

  getComputerCount(): Observable<number> {
    return this._httpClient.get<number>(`${this.SERVER_URL}/count`, {
      headers: new HttpHeaders({
        authorization: this._userService.getToken()
      })
    });
  }

  getComputerCountFromCompany(id: number): Observable<number> {
    return this._httpClient.get<number>(
      `${this.SERVER_URL}/countFromCompany`,
      {
        headers: new HttpHeaders({
          authorization: this._userService.getToken()
        }),
        params: new HttpParams().set('id', `${id}`)
      }
    );
  }

  getComputerSearchCount(search: string): Observable<number> {
    return this._httpClient.get<number>(`${this.SERVER_URL}/searchCount`, {
      headers: new HttpHeaders({
        authorization: this._userService.getToken()
      }),
      params: new HttpParams().set('search', search)
    });
  }

  getComputer(id: string): Observable<Computer> {
    return this._httpClient.get<Computer>(`${this.SERVER_URL}/${id}`, {
      headers: new HttpHeaders({
        authorization: this._userService.getToken()
      })
    });
  }

  createComputer(computer: Computer): Observable<Computer> {
    return this._httpClient.post<Computer>(
      `${this.SERVER_URL}/create`,
      computer,
      {
        headers: new HttpHeaders({
          authorization: this._userService.getToken()
        })
      }
    );
  }

  updateComputer(computer: Computer): Observable<Computer> {
    return this._httpClient.put<Computer>(
      `${this.SERVER_URL}/update/${computer.id}`,
      computer,
      {
        headers: new HttpHeaders({
          authorization: this._userService.getToken()
        })
      }
    );
  }

  deleteComputer(id: number): Observable<Computer> {
    return this._httpClient.delete<Computer>(`${this.SERVER_URL}/${id}`, {
      headers: new HttpHeaders({
        authorization: this._userService.getToken()
      })
    });
  }
}
