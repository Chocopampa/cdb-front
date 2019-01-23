import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getAllComputers(): Observable<Computer[]> {
    return this._httpClient.get<Computer[]>(`${this.SERVER_URL}`, {
      headers: new HttpHeaders({
        authorization: this._userService.getToken()
      })
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
