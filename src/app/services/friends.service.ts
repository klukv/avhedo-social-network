import { Injectable } from '@angular/core';
import { IFriends } from '../models/friends';
import { friendsData } from '../data/friendsData';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  private _searchUsernameFriend = new BehaviorSubject<string>('');
  private _friendInfo = new BehaviorSubject<IFriends>({
    id: 0,
    username: 'Это кто',
    age: 0,
  });
  friendInfo$ = this._friendInfo.asObservable();
  searchUsernameFriend$ = this._searchUsernameFriend.asObservable();

  constructor() {}

  private _friendsList: IFriends[] = friendsData;

  get listFriends() {
    return this._friendsList;
  }

  set listFriends(newFriends: IFriends[]) {
    this._friendsList = newFriends;
  }

  setSearchUsername(value: string){
    this._searchUsernameFriend.next(value);
  }

  setInfoFriend(infoFriend: IFriends) {
    this._friendInfo.next(infoFriend);
  }
  changeInfoFriend(id: number) {
    const selectFriend = this.listFriends.filter(
      (friend) => friend.id == id
    )[0];
    this.setInfoFriend(selectFriend);
  }
}
