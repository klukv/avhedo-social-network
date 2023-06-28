import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IHobbyInfo, IPersonInfo, IPersonItem } from '../models/personInfo';

@Injectable({
  providedIn: 'root',
})
export class PersonPageService {
  private _selectHobbyItems: IHobbyInfo[] = [];
  private _personInfo = new BehaviorSubject<IPersonInfo>({
    id: 0,
    username: 'Артём',
    age: 21,
    hobby: 'Настольные игры, спорт',
    about:
      'Hi, i am jhon kates, i am 20 years old and worked as a web developer in microsoft',
  });

  personInfo$ = this._personInfo.asObservable();

  constructor() {}

  get personInfo() {
    return this._personInfo.getValue();
  }

  get selectHobbyItems() {
    return this._selectHobbyItems;
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

  removeSelectHobby(id: number) {
    this._selectHobbyItems = this._selectHobbyItems.filter((hobby) => hobby.id !== id);
  }
}
