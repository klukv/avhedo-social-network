import { Injectable } from '@angular/core';
import { IFriends } from '../models/friends';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  friendsList: IFriends[] = [
   
  ];

  constructor() { }


}
