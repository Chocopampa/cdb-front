import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  SERVER_URL = 'http://localhost:8080/webapp';

  constructor(
    private _httpClient: HttpClient
  ) { }

  postUser(user: User): Observable<User> {
    return this._httpClient.post<User>(`${this.SERVER_URL}/registration`, user);
  }

  login(user: User) {
    return this._httpClient.post<any>(`${this.SERVER_URL}/login`, user, {observe: 'response'});
  }

  logout() {
    localStorage.removeItem('jwt');
  }

  getToken() {
    return localStorage.getItem('jwt');
  }

  saveToken(jwt: string) {
    localStorage.setItem('jwt', jwt);
  }
}