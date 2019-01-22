import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Computer } from './computer.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComputerService {
  SERVER_URL = 'http://localhost:8080/webapp/Computer';
  constructor(private _httpClient: HttpClient) {}

  getAllComputers(): Observable<Computer[]> {
    return this._httpClient.get<Computer[]>(`${this.SERVER_URL}`);
  }

  getComputersSpecified(
    order_by: string,
    type_ascend: string,
    search: string,
    limit: string,
    offset: string
  ): Observable<Computer[]> {
    return this._httpClient.get<Computer[]>(`${this.SERVER_URL}`, {
      params: new HttpParams()
        .set('order', order_by)
        .set('type', type_ascend)
        .set('search', search)
        .set('limit', limit)
        .set('offset', offset)
    });
  }

  getComputerCount(): Observable<number> {
    return this._httpClient.get<number>(`${this.SERVER_URL}/count`);
  }

  getComputer(id: string): Observable<Computer> {
    return this._httpClient.get<Computer>(`${this.SERVER_URL}/${id}`);
  }

  createComputer(computer: Computer): Observable<Computer> {
    return this._httpClient.post<Computer>(
      `${this.SERVER_URL}/create`,
      computer
    );
  }

  updateComputer(computer: Computer): Observable<Computer> {
    return this._httpClient.put<Computer>(
      `${this.SERVER_URL}/update/${computer.id}`,
      computer
    );
  }

  deleteComputer(id: number): Observable<Computer> {
    return this._httpClient.delete<Computer>(`${this.SERVER_URL}/${id}`);
  }
}
