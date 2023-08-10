import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IHobbyInfo, IPersonInfo, IPersonItem } from '../models/personInfo';
import { HttpClient } from '@angular/common/http';
import {
  ADD_USER_INFO,
  API_URL,
  EDIT_USER_INFO,
  GET_USER_INFO,
  httpOptions,
} from '../utils/const';
import {
  IAdditionallyInfoUser,
  IResponseEditInfo,
  IResponseInfoUser,
} from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class PersonPageService {
  private _selectHobbyItems: IHobbyInfo[] = [];

  private _isLoaded = new BehaviorSubject<boolean>(false);
  private _personInfo = new BehaviorSubject<IPersonInfo>({
    id: 0,
    username: '',
    age: '',
    gender: undefined,
    hobby: undefined,
    about: undefined,
    urlImage: '',
  });

  personInfo$ = this._personInfo.asObservable();
  isLoaded$ = this._isLoaded.asObservable();

  constructor(private _http: HttpClient) {}

  get personInfo() {
    return this._personInfo.getValue();
  }

  setPersonInfo(newValue: IPersonInfo) {
    this._personInfo.next(newValue);
  }

  setNewPersonInfo(newInfo: IPersonItem<string>) {
    let oldState = this.personInfo;
    oldState = {
      ...oldState,
      [newInfo.value]: newInfo.text,
    };
    this.setPersonInfo(oldState);
  }

  get selectHobbyItems() {
    return this._selectHobbyItems;
  }

  setLoaded(value: boolean) {
    this._isLoaded.next(value);
  }

  setCurrentHobbyItems(currentHobby: IHobbyInfo) {
    const isCheck = this._selectHobbyItems.some(
      (hobby) => JSON.stringify(hobby) === JSON.stringify(currentHobby)
    );
    if (!isCheck) {
      this._selectHobbyItems.push(currentHobby);
    }
  }

  removeSelectHobby(id: number) {
    this._selectHobbyItems = this._selectHobbyItems.filter(
      (hobby) => hobby.id !== id
    );
  }

  //Backend requests

  addAdditionallyInfoUser(
    additionallyInfo: IAdditionallyInfoUser,
    id: string
  ): Observable<any> {
    return this._http.post(
      API_URL + ADD_USER_INFO + '/' + id,
      additionallyInfo,
      httpOptions
    );
  }

  getInfoUser(id: string): Observable<IResponseInfoUser> {
    return this._http.get<IResponseInfoUser>(
      API_URL + GET_USER_INFO + '/' + id,
      httpOptions
    );
  }

  editInfoUser(
    infoUser: IAdditionallyInfoUser,
    id: string
  ): Observable<IResponseEditInfo> {
    return this._http.post<IResponseEditInfo>(
      API_URL + EDIT_USER_INFO + '/' + id,
      infoUser,
      httpOptions
    );
  }
}
