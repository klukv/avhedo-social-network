import { Injectable } from '@angular/core';
import { IFriends } from '../models/friends';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  friendsList: IFriends[] = [
    {
      id: 0,
      username: 'Данил',
      age: 21,
    },
    {
      id: 1,
      username: 'Максим',
      age: 25,
    },
    {
      id: 2,
      username: 'Петя',
      age: 16,
    },
    {
      id: 3,
      username: 'Лера',
      age: 19,
    },
    {
      id: 4,
      username: 'Татьяна',
      age: 25,
    },
    {
      id: 5,
      username: 'Юля',
      age: 20,
    },
  ];

  constructor() { }


}
