import { Injectable } from '@angular/core';
import { ILikesCard } from '../models/likeCards';
import { BehaviorSubject } from 'rxjs';
import { likeCards } from '../data/likesCards';

@Injectable({
  providedIn: 'root'
})
export class CastingService {
  private _listArrayCard:ILikesCard[] = likeCards
  private _listLikePeople = new BehaviorSubject<ILikesCard[]>(this._listArrayCard);
  listLikePeople$ = this._listLikePeople.asObservable();

  constructor() {
   }

   setNewListCards(indexCard: number){
      this._listArrayCard.splice(indexCard, 1);
      this._listLikePeople.next(this._listArrayCard);
   }

}
