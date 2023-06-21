import { Injectable } from '@angular/core';
import { IFriends } from '../models/friends';
import { friendsData } from '../data/friendsData';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor() { }

  private _friendsList: IFriends[] = friendsData;

  get listFriends() {
    return this._friendsList;
  }

  set listFriends(newFriends: IFriends[]) {
    this._friendsList = newFriends;
  }

}
