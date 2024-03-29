import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { IHobbyInfo, IPersonInfo, IPersonItem } from '../models/personInfo';
import { HttpClient } from '@angular/common/http';
import {
  ADD_IMAGE_AVATAR,
  ADD_USER_INFO,
  API_URL,
  DELETE_AVATAR,
  EDIT_USER_INFO,
  GET_USER_INFO,
  httpOptions,
} from '../utils/const';
import {
  IAdditionallyInfoUser,
  IResponseEditInfo,
  IResponseInfoUser,
} from '../models/user';
import { ErrorService } from './error.service';

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
    hobby: '',
    about: undefined,
    urlImage: '',
  });

  personInfo$ = this._personInfo.asObservable();
  isLoaded$ = this._isLoaded.asObservable();

  constructor(private _http: HttpClient, private errorService: ErrorService) {}

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

  addImageAvatar(userId: string, formData: FormData) {
    return this._http
      .post(API_URL + ADD_IMAGE_AVATAR + '/' + userId, formData)
      .pipe(catchError((error) => this.errorService.handle(error)));
  }

  deleteImageAvatar(userId: string) {
    return this._http
      .delete(API_URL + DELETE_AVATAR + '/' + userId, httpOptions)
      .pipe(catchError((error) => this.errorService.handle(error)));
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
