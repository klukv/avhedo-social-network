import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { API_URL, LOGIN_URL, SIGNUP_URL } from '../utils/const';
import { IResponseUser } from '../models/user';
import { StorageService } from './storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private _http: HttpClient, private storageService: StorageService) {}

  private isRegister = new BehaviorSubject<boolean>(false);
  isRegister$ = this.isRegister.asObservable();

  login(username: string, password: string) {
    return this._http.post<IResponseUser>(
      API_URL + LOGIN_URL,
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

  logout(){
    this.storageService.infoUserClear();
    window.location.reload();
  }

  setValueIsRegister(value: boolean) {
    this.isRegister.next(value);
  }
}
