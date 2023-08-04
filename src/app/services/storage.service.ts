import { Injectable } from '@angular/core';
import { IUser } from '../models/user';
import { TOKEN_KEY, USER_KEY } from '../utils/const';
import { IPersonInfo } from '../models/personInfo';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  infoUserClear() {
    window.sessionStorage.clear();
  }

  saveInfoUser(user: IPersonInfo, token: string) {
    const modifiedToken = 'Bearer ' + token;

    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));

    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, modifiedToken);
  }

  getUser() {
    const user = window.sessionStorage.getItem(USER_KEY);

    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  isExistUser():boolean {
    const user = window.sessionStorage.getItem(USER_KEY);

    if (user) {
      return true;
    }
    return false;
  }

  getToken(): string {
    const token = window.sessionStorage.getItem(TOKEN_KEY);

    if (token) {
      return token;
    }
    return 'Token doesn"t exist';
  }

  isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    const token = window.sessionStorage.getItem(TOKEN_KEY);

    if (user && token) {
      return true;
    }
    return false;
  }
}
