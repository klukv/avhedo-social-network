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
  private _isGetRequestCastingCards = new BehaviorSubject<boolean>(false);

  isGetRequestCastingCards$ = this._isGetRequestCastingCards.asObservable();

  //переменная для отслеживания есть ли на бекенде еще карточки, которые не лайкал пользователь или не просматривал
  private _isEmptyCards = false;

  private _activeLinks = {
    castingLink: 'not_active',
    likeLink: 'not_active',
  };

  constructor(private _http: HttpClient, private errorService: ErrorService) {}

  editCastingCards(indexCard: number) {
    this._listArrayCastingCard.splice(indexCard, 1);
    this._listCastingPeople.next(this._listArrayCastingCard);
  }

  setEmptyArrayCasting(){
    this._listArrayCastingCard = [];
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
    this._isGetRequestCastingCards.next(value);
  }

  setIsEmptyCards(value: boolean) {
    this._isEmptyCards = value;
  }

  getValueGettingCards() {
    return this._isGetRequestCastingCards;
  }

  getListArrayLikeCards() {
    return this._listArrayLikesCard;
  }

  getIsEmptyCards() {
    return this._isEmptyCards;
  }

  getActiveLinks() {
    return this._activeLinks;
  }

  deleteUnlikeCard(indexCard: number) {
    this._listArrayLikesCard.splice(indexCard, 1);
    this._listLikesPeople.next(this._listArrayLikesCard);
  }

  //Backend requests

  getCastingCards(idOwner: number, idCard: number): Observable<ICards[]> {
    return this._http
      .get<ICards[]>(
        API_URL + GET_CASTING_CARDS + '/' + idOwner + '/' + idCard,
        httpOptions
      )
      .pipe(
        tap((cardsData) => {
          if (cardsData.length !== 0) {
            const cardInfo = cardsData[cardsData.length - 1];
            this._listArrayCastingCard.push(cardInfo);
            this._listCastingPeople.next(this._listArrayCastingCard);
          }
        }),
        catchError((error) => this.errorService.handle(error))
      );
  }

  likeCard(idOwner: number, idLovers: number) {
    return this._http
      .post(
        API_URL +
          '/' +
          'people' +
          '/' +
          idOwner +
          ADD_LIKE_CARD +
          '/' +
          idLovers,
        httpOptions
      )
      .pipe(catchError((error) => this.errorService.handle(error)));
  }

  likeMutualCard(idOwner: number, idLovers: number) {
    return this._http
      .post(
        API_URL + '/' + idLovers + ADD_LIKE_CARD + '/' + idOwner,
        httpOptions
      )
      .pipe(catchError((error) => this.errorService.handle(error)));
  }

  dislikeCard(idOwner: number, idLovers: number) {
    return this._http
      .delete(
        API_URL +
          '/' +
          'people' +
          '/' +
          idOwner +
          DELETE_LIKE_CARD +
          '/' +
          idLovers,
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
