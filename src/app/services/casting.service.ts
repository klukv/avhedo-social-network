import { Injectable } from '@angular/core';
import { ICards } from '../models/likeCards';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  ADD_LIKE_CARD,
  API_URL,
  DELETE_LIKE_CARD,
  GET_ALL_FANS,
  GET_CASTING_CARDS,
  httpOptions,
} from '../utils/const';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class CastingService {
  private _listArrayCastingCard: ICards[] = [];
  private _listCastingPeople = new BehaviorSubject<ICards[]>(
    this._listArrayCastingCard
  );
  listCastingPeople$ = this._listCastingPeople.asObservable();

  private _listArrayLikesCard: ICards[] = [];
  private _listLikesPeople = new BehaviorSubject<ICards[]>(
    this._listArrayLikesCard
  );
  listLikesPeople$ = this._listLikesPeople.asObservable();

  //переменная для отслеживания был ли уже прокинут один запрос на бекенд по получению карточек знакомств
  private _isGetRequestCastingCards: boolean = false;

  private _activeLinks = {
    castingLink: 'not_active',
    likeLink: 'not_active',
  };

  constructor(private _http: HttpClient, private errorService: ErrorService) {}

  setNewCastingCards(indexCard: number) {
    this._listArrayCastingCard.splice(indexCard, 1);
    this._listCastingPeople.next(this._listArrayCastingCard);
  }

  setNewActiveLink(selectLink: string) {
    Object.keys(this._activeLinks).map((key) => {
      if (key === selectLink) {
        this._activeLinks = {
          ...this._activeLinks,
          [key]: 'active',
        };
      } else {
        this._activeLinks = {
          ...this._activeLinks,
          [key]: 'not_active',
        };
      }
    });
  }

  setValueGettingCards(value: boolean) {
    this._isGetRequestCastingCards = value;
  }

  getValueGettingCards() {
    return this._isGetRequestCastingCards;
  }

  getActiveLinks() {
    return this._activeLinks;
  }

  deleteUnlikeCard(indexCard: number) {
    this._listArrayLikesCard.splice(indexCard, 1);
    this._listLikesPeople.next(this._listArrayLikesCard);
  }

  //Backend requests

  getCastingCards(
    idOwner: number,
  ): Observable<ICards> {
    return this._http
      .get<ICards>(
        API_URL + GET_CASTING_CARDS + '/' + idOwner,
        httpOptions
      )
      .pipe(
        tap((cardsData) => {
          const emptyArray:ICards[] = [];
          emptyArray.push(cardsData);
          this._listArrayCastingCard = emptyArray;
          this._listCastingPeople.next(emptyArray);
        }),
        catchError((error) => this.errorService.handle(error))
      );
  }

  likeCard(idOwner: number, idLovers: number) {
    return this._http
      .post(
        API_URL + '/' + 'people' + '/' + idOwner + ADD_LIKE_CARD + '/' + idLovers,
        httpOptions
      )
      .pipe(catchError((error) => this.errorService.handle(error)));
  }

  likeMutualCard(idOwner: number, idLovers: number){
    return this._http.post(
      API_URL + '/' + idLovers + ADD_LIKE_CARD + '/' + idOwner, 
      httpOptions
    )
    .pipe(catchError((error) => this.errorService.handle(error)));
  }

  dislikeCard(idOwner: number, idLovers: number){
    return this._http
      .delete(
        API_URL + '/' + 'people' + '/' + idOwner + DELETE_LIKE_CARD + '/' + idLovers,
        httpOptions
      )
    .pipe(catchError((error) => this.errorService.handle(error)));
  }

  getAllFans(idOwner: number): Observable<ICards[]> {
    return this._http
      .get<ICards[]>(API_URL + GET_ALL_FANS + '/' + idOwner, httpOptions)
      .pipe(
        tap((fansData) => {
          (this._listArrayLikesCard = fansData),
            this._listLikesPeople.next(fansData);
        }),
        catchError((error) => this.errorService.handle(error))
      );
  }
}
