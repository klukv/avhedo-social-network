import { Injectable } from '@angular/core';
import { IFriends } from '../models/friends';
import { allPeople, friendsData } from '../data/friendsData';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { WebsocketService } from './websocket.service';

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

  private _activeFriendsLinks = {
    searchFriends: 'active',
    addedFriends: 'not_active'
  }
  private _friendsList: IFriends[] = friendsData;
  private _friendsListSearch: IFriends[] = allPeople;

  friendInfo$ = this._friendInfo.asObservable();
  searchUsernameFriend$ = this._searchUsernameFriend.asObservable();

  constructor(private router: Router, private websocketService: WebsocketService) {}

  get activeFriendsLinks(){
    return this._activeFriendsLinks;
  }

  get listFriends() {
    return this._friendsList;
  }

  get listSearchFriends() {
    return this._friendsListSearch;
  }

  set listFriends(newFriends: IFriends[]) {
    this._friendsList = newFriends;
  }

  setActiveFriendLink(selectLink: string){
    Object.keys(this._activeFriendsLinks).map(key => {
      if(key === selectLink){
        this._activeFriendsLinks = {
          ...this._activeFriendsLinks,
          [key]: 'active',
        }
      }else{
        this._activeFriendsLinks = {
          ...this._activeFriendsLinks,
          [key]: 'not_active'
        }
      }
    })
  }

  setSearchUsername(value: string) {
    this._searchUsernameFriend.next(value);
  }

  setInfoFriend(infoFriend: IFriends) {
    this._friendInfo.next(infoFriend);
  }
  changeInfoFriend(id: number) {
    const selectFriend = this.listSearchFriends.filter(
      (friend) => friend.id == id
    )[0];
    this.setInfoFriend(selectFriend);
  }

  goToChat(id: number) {
    this.router.navigate([`messages/chat`], {
      queryParams: {
        id: id,
      },
    });
    this.websocketService.clearMessages();
    this.changeInfoFriend(id);
  }

  goToPageFriend(id: number) {
    this.router.navigate(['person'], {
      queryParams: {
        id: id,
      },
    });
  }
}
