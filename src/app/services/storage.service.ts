import { Injectable } from '@angular/core';
import { IS_SHOW_DATA_KEY, TOKEN_KEY, USER_KEY } from '../utils/const';
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

  // Методы, при помощи которых определяется, первый раз зашёл пользователь или нет
  saveShowInfoUser(value: boolean) {
    window.sessionStorage.setItem(IS_SHOW_DATA_KEY, JSON.stringify(value));
  }

  saveIdUser(userId: string){
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(userId));
  }

  isShowInfoUser(): boolean {
    const isShowData = window.sessionStorage.getItem(IS_SHOW_DATA_KEY);

    if (isShowData) {
      return JSON.parse(isShowData);
    }

    return false;
  }

  //===============================================================================

  getUser() {
    const user = window.sessionStorage.getItem(USER_KEY);

    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  isExistUser(): boolean {
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
    return "not exist's";
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
