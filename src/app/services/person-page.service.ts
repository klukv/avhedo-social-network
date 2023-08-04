import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IHobbyInfo, IPersonInfo, IPersonItem } from '../models/personInfo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  ADD_USER_INFO,
  API_URL,
  EDIT_USER_INFO,
  GET_USER_INFO,
} from '../utils/const';
import {
  IAdditionallyInfoUser,
  IResponseEditInfo,
  IResponseInfoUser,
} from '../models/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class PersonPageService {
  private _isLoaded: boolean = false;
  private _isShowDataInfo: boolean = false;

  private _selectHobbyItems: IHobbyInfo[] = [];
  private _personInfo = new BehaviorSubject<IPersonInfo>({
    id: 0,
    username: 'Артём',
    age: '21',
    gender: 'man',
    hobby: 'Настольные игры, Спорт, Рисование',
    about:
      'Hi, i am jhon kates, i am 20 years old and worked as a web developer in microsoft',
    urlImage: '',
  });

  personInfo$ = this._personInfo.asObservable();

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

  get isLoaded() {
    return this._isLoaded;
  }

  get isShowDataInfo() {
    return this._isShowDataInfo;
  }

  setLoaded(value: boolean) {
    this._isLoaded = value;
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
    return this._http
      .get<IResponseInfoUser>(API_URL + GET_USER_INFO + '/' + id, httpOptions)
      .pipe(
        tap((userAdditionallyInfo) => {
          if (
            userAdditionallyInfo.dateOfBirthday === undefined ||
            userAdditionallyInfo.aboutMe === undefined ||
            userAdditionallyInfo.hobby === ''
          ) {
            this._isShowDataInfo = false;
          } else {
            this._isShowDataInfo = true;
          }
        })
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
