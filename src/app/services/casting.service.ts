import { Injectable } from '@angular/core';
import { ICards } from '../models/likeCards';
import { BehaviorSubject } from 'rxjs';
import { castingCards, likesCards } from '../data/likesCards';

@Injectable({
  providedIn: 'root'
})
export class CastingService {
  private _listArrayCastingCard:ICards[] = castingCards
  private _listCastingPeople = new BehaviorSubject<ICards[]>(this._listArrayCastingCard);
  listCastingPeople$ = this._listCastingPeople.asObservable();

  private _listArrayLikesCard:ICards[] = likesCards
  private _listLikesPeople = new BehaviorSubject<ICards[]>(this._listArrayLikesCard);
  listLikesPeople$ = this._listLikesPeople.asObservable();

  constructor() {
   }

   setNewCastingCards(indexCard: number){
      this._listArrayCastingCard.splice(indexCard, 1);
      this._listCastingPeople.next(this._listArrayCastingCard);
   }

}
