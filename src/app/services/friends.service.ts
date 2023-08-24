import { Injectable } from '@angular/core';
import {
  IResponseAllUsers,
  IResponseSubscribesInfo,
  IPersonSub,
} from '../models/friends';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { Router } from '@angular/router';
import { WebsocketService } from './websocket.service';
import { HttpClient } from '@angular/common/http';
import {
  ADD_FRIEND,
  API_URL,
  DELETE_FRIEND,
  GET_ALL_FRIENDS,
  GET_ALL_SUBCRIBERS,
  GET_ALL_USERS,
  httpOptions,
} from '../utils/const';
import { ErrorService } from './error.service';
import { IResponseInfoUser } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  private _searchUsernameFriend = new BehaviorSubject<string>('');
  private _friendInfo = new BehaviorSubject<IResponseInfoUser>({
    dateOfBirthday: '',
    aboutMe: '',
    hobby: '',
    url: '',
    sex: '',
    userDto: {
      id: 0,
      username: '',
    },
  });

  private _activeFriendsLinks = {
    searchSubscribes: 'not_active',
    addedSubscribers: 'not_active',
    ownSubscribers: 'not_active',
  };

  private _subscribesList: IPersonSub[] = [];
  private _subscribersList: IPersonSub[] = [];
  private _subscribersListPerson: IResponseSubscribesInfo[] = []; // массив для хранения информации о друзьях на личной странице каждого пользователя
  private _allUsers: IPersonSub[] = [];

  // переменные загрузки
  private _isLoaded: boolean = false;
  private _isLoadedMySubscribes: boolean = false;
  private _isLoadedSubscribers: boolean = false;
  private _isLoadedAllUsers: boolean = false;

  friendInfo$ = this._friendInfo.asObservable();
  searchUsernameFriend$ = this._searchUsernameFriend.asObservable();

  constructor(
    private router: Router,
    private websocketService: WebsocketService,
    private _http: HttpClient,
    private errorService: ErrorService
  ) {}

  get activeFriendsLinks() {
    return this._activeFriendsLinks;
  }

  get isLoaded() {
    return this._isLoaded;
  }

  get isLoadedSubscribers() {
    return this._isLoadedSubscribers;
  }

  get isLoadedSubscribes() {
    return this._isLoadedMySubscribes;
  }

  get isLoadedAllUsers() {
    return this._isLoadedAllUsers;
  }

  get listSubcribes() {
    return this._subscribesList;
  }

  get listSubscribersPerson() {
    return this._subscribersListPerson;
  }

  get listSubsribers() {
    return this._subscribersList;
  }

  get listAllUsers() {
    return this._allUsers;
  }

  setListSubscribes(listSub: IPersonSub[]) {
    this._subscribesList = listSub;
  }

  setLoaded(value: boolean) {
    this._isLoaded = value;
  }

  setLoadedMySubscribes(value: boolean) {
    this._isLoadedMySubscribes = value;
  }

  setLoadedSubscribers(value: boolean) {
    this._isLoadedSubscribers = value;
  }

  setLoadedAllUsers(value: boolean) {
    this._isLoadedAllUsers = value;
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

  setInfoFriend(infoFriend: IResponseInfoUser) {
    this._friendInfo.next(infoFriend);
  }

  goToChat(id: number) {
    this.router.navigate([`messages/chat`], {
      queryParams: {
        id: id,
      },
    });
    this.websocketService.clearMessages();
  }

  goToPageFriend(id: number) {
    this.router.navigate(['person'], {
      queryParams: {
        id: id,
      },
    });
  }

  isExistSubscribe(id: number, list: IPersonSub[]) {
    return list.every((infoSubscribe) => infoSubscribe.id !== id);
  }

  // Backend requests

  addFriend(ownerId: number, friendId: number): Observable<string> {
    return this._http
      .post<string>(
        API_URL + ADD_FRIEND + '/' + ownerId + '/' + friendId,
        httpOptions
      )
      .pipe(catchError((error) => this.errorService.handle(error)));
  }

  deleteFriend(ownerId: number, friendId: number): Observable<string> {
    return this._http
      .delete<string>(
        API_URL + DELETE_FRIEND + '/' + ownerId + '/' + friendId,
        httpOptions
      )
      .pipe(catchError((error) => this.errorService.handle(error)));
  }

  getAllSubscribes(ownerId: number): Observable<IResponseSubscribesInfo[]> {
    return this._http
      .get<IResponseSubscribesInfo[]>(
        API_URL + GET_ALL_FRIENDS + '/' + ownerId,
        httpOptions
      )
      .pipe(
        tap((subscribesData) => {
          subscribesData.map((infoSubscribe) => {
            if (
              this.isExistSubscribe(
                infoSubscribe.friends.userInfo.id,
                this.listSubcribes
              )
            ) {
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

  getAllSubscribers(
    ownerId: number,
    isPersonPage: boolean
  ): Observable<IResponseSubscribesInfo[]> {
    return this._http
      .get<IResponseSubscribesInfo[]>(
        API_URL + GET_ALL_SUBCRIBERS + '/' + ownerId
      )
      .pipe(
        tap((subscribersData) => {
          if (!isPersonPage) {
            subscribersData.map((infoSubscriber) => {
              if (
                this.isExistSubscribe(
                  infoSubscriber.friends.userInfo.id,
                  this.listSubsribers
                )
              ) {
                this._subscribersList.push({
                  id: infoSubscriber.friends.userInfo.id,
                  username: infoSubscriber.friends.userInfo.username,
                  age: infoSubscriber.friends.dateOfBirthday,
                  url: infoSubscriber.friends.url,
                });
              }
            });
          } else {
            this._subscribersListPerson = subscribersData;
          }
        })
      );
  }

  getAllUsers(ownerId: number): Observable<IResponseAllUsers[]> {
    return this._http
      .get<IResponseAllUsers[]>(
        API_URL + GET_ALL_USERS + '/' + ownerId,
        httpOptions
      )
      .pipe(
        tap((allUsersData) => {
          allUsersData.map((infoPerson) => {
            if (
              this.isExistSubscribe(infoPerson.userInfo.id, this.listAllUsers)
            ) {
              this._allUsers.push({
                id: infoPerson.userInfo.id,
                username: infoPerson.userInfo.username,
                age: infoPerson.dateOfBirthday,
                url: infoPerson.url,
              });
            }
          });
        }),
        catchError((error) => this.errorService.handle(error))
      );
  }
}
