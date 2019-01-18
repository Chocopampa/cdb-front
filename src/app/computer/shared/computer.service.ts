import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  getComputer(id: string): Observable<Computer> {
    return this._httpClient.get<Computer>(`${this.SERVER_URL}/${id}`);
  }

  createComputer(computer: Computer): Observable<Computer> {
    return this._httpClient.post<Computer>(`${this.SERVER_URL}/create`, computer);
  }

  updateComputer(computer: Computer): Observable<Computer> {
    return this._httpClient.put<Computer>(`${this.SERVER_URL}/update/${computer.id}`, computer);
  }

  deleteComputer(id: number): Observable<Computer> {
    return this._httpClient.delete<Computer>(`${this.SERVER_URL}/${id}`);
  }
}
