import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL, AUTH_URL, LOGOUT_URL, SIGNUP_URL } from '../utils/const';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private _http: HttpClient) {}

  login(username: string, password: string) {
    return this._http.post(
      API_URL + AUTH_URL,
      { username, password },
      httpOptions
    );
  }

  register(
    username: string,
    email: string,
    password: string,
    role: string[],
    age: number,
    gender: string
  ): Observable<string> {
    return this._http.post<string>(
      API_URL + SIGNUP_URL,
      { username, email, password, role, age, gender },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this._http.post(API_URL + LOGOUT_URL, {}, httpOptions);
  }
}
