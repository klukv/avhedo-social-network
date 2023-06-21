import { Injectable } from '@angular/core';
import { IFriends } from '../models/friends';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  private friendInfo = new BehaviorSubject<IFriends>({
    id: 0,
    username: 'Это кто',
    age: 0,
  });
  friendInfo$ = this.friendInfo.asObservable();

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

  constructor() {}

  setInfoFriend(infoFriend: IFriends){
    this.friendInfo.next(infoFriend);
  }
  changeInfoFriend(id:number){
    const selectFriend = this.friendsList.filter(friend => friend.id == id)[0];
    this.setInfoFriend(selectFriend);
  }
}
