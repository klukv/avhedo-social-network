import { Injectable } from '@angular/core';
import { IUser } from '../models/user';
import { USER_KEY } from '../utils/const';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  infoUserClear() {
    window.sessionStorage.clear();
  }

  saveInfoUser(user: IUser) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  getUser() {
    const user = window.sessionStorage.getItem(USER_KEY);

    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  isLoggedIn():boolean {
    const user = window.sessionStorage.getItem(USER_KEY);

    if (user) {
      return true;
    }
    return false;
  }
}
