import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  SERVER_URL = 'http://10.0.1.200:8080/webapp';

  constructor(private _httpClient: HttpClient) {}

  postUser(user: User) {
    return this._httpClient.post<any>(`${this.SERVER_URL}/registration`, user, {
      observe: 'response'
    });
  }

  login(user: User) {
    return this._httpClient.post<any>(`${this.SERVER_URL}/login`, user, {
      observe: 'response'
    });
  }

  logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('role');
  }

  getToken() {
    return localStorage.getItem('jwt');
  }

  saveToken(jwt: string) {
    localStorage.setItem('jwt', jwt);
    const helper = new JwtHelperService();
    for (const r of helper.decodeToken(this.getToken()).role) {
      localStorage.setItem('role', r.authority);
    }
  }

  isConnected() {
    return !!this.getToken();
  }

  isAdmin() {
    if (localStorage.getItem('role') === 'ROLE_ADMIN') {
      return true;
    }
    return false;
  }
}
