import { Injectable } from '@angular/core';
import { ICards } from '../models/likeCards';
import { BehaviorSubject } from 'rxjs';
import { likeCards } from '../data/likesCards';

@Injectable({
  providedIn: 'root'
})
export class CastingService {
  private _listArrayCard:ICards[] = likeCards
  private _listCastingPeople = new BehaviorSubject<ICards[]>(this._listArrayCard);
  listCastingPeople$ = this._listCastingPeople.asObservable();

  constructor() {
   }

   setNewListCards(indexCard: number){
      this._listArrayCard.splice(indexCard, 1);
      this._listCastingPeople.next(this._listArrayCard);
   }

}
