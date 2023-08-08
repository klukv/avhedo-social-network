import { Injectable } from '@angular/core';
import {
  IFriends,
  IResponseSubscribesInfo,
  ISubscribes,
} from '../models/friends';
import { allPeople, friendsData } from '../data/friendsData';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { WebsocketService } from './websocket.service';
import { HttpClient } from '@angular/common/http';
import {
  ADD_FRIEND,
  API_URL,
  DELETE_FRIEND,
  GET_ALL_FRIENDS,
  httpOptions,
} from '../utils/const';

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
    searchSubscribes: 'not_active',
    addedSubscribers: 'active',
    ownSubscribers: 'not_active',
  };

  private _subscribesList: ISubscribes[] = [];
  private _friendsList: IFriends[] = friendsData;
  private _friendsListSearch: IFriends[] = allPeople;
  private _isLoaded: boolean = false;
  private _isLoadedMySubscribes: boolean = false;

  friendInfo$ = this._friendInfo.asObservable();
  searchUsernameFriend$ = this._searchUsernameFriend.asObservable();

  constructor(
    private router: Router,
    private websocketService: WebsocketService,
    private _http: HttpClient
  ) {}

  get activeFriendsLinks() {
    return this._activeFriendsLinks;
  }

  get listFriends() {
    return this._friendsList;
  }

  get listSearchFriends() {
    return this._friendsListSearch;
  }

  get isLoaded() {
    return this._isLoaded;
  }

  get isLoadedMySubscribes() {
    return this._isLoadedMySubscribes;
  }

  get listSubcribes() {
    return this._subscribesList;
  }

  set listFriends(newFriends: IFriends[]) {
    this._friendsList = newFriends;
  }

  setLoaded(value: boolean) {
    this._isLoaded = value;
  }

  setLoadedMySubscribes(value: boolean) {
    this._isLoadedMySubscribes = value;
  }

  setActiveFriendLink(selectLink: string) {
    Object.keys(this._activeFriendsLinks).map((key) => {
      if (key === selectLink) {
        this._activeFriendsLinks = {
          ...this._activeFriendsLinks,
          [key]: 'active',
        };
      } else {
        this._activeFriendsLinks = {
          ...this._activeFriendsLinks,
          [key]: 'not_active',
        };
      }
    });
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

  isExistSubscribe(id: number) {
    return this._subscribesList.every(
      (infoSubscribe) => infoSubscribe.id !== id
    );
  }

  // Backend requests

  addFriend(ownerId: number, friendId: number): Observable<string> {
    return this._http.post<string>(
      API_URL + ADD_FRIEND + '/' + ownerId + '/' + friendId,
      httpOptions
    );
  }

  deleteFriend(ownerId: number, friendId: number): Observable<string> {
    return this._http.delete<string>(
      API_URL + DELETE_FRIEND + '/' + ownerId + '/' + friendId,
      httpOptions
    );
  }

  getAllFriends(ownerId: number): Observable<IResponseSubscribesInfo[]> {
    return this._http
      .get<IResponseSubscribesInfo[]>(
        API_URL + GET_ALL_FRIENDS + '/' + ownerId,
        httpOptions
      )
      .pipe(
        tap((subscribesData) => {
          subscribesData.map((infoSubscribe) => {
            if (this.isExistSubscribe(infoSubscribe.friends.userInfo.id)) {
              this._subscribesList.push({
                id: infoSubscribe.friends.userInfo.id,
                username: infoSubscribe.friends.userInfo.username,
                age: infoSubscribe.friends.dateOfBirthday,
                url: infoSubscribe.friends.url,
              });
            }
          });
        })
      );
  }
}
