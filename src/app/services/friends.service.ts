import { Injectable } from '@angular/core';
import { IFriends } from '../models/friends';
import { friendsData } from '../data/friendsData';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor() { }

  friendsList: IFriends[] = friendsData;

}
