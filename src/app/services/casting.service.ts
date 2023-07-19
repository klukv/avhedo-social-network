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

  private _activeLinks = {
    castingLink: 'not_active',
    likeLink: 'not_active',
  };

  constructor() {
   }

   setNewCastingCards(indexCard: number){
      this._listArrayCastingCard.splice(indexCard, 1);
      this._listCastingPeople.next(this._listArrayCastingCard);
   }

   setNewActiveLink(selectLink: string){
    Object.keys(this._activeLinks).map(key => {
      if(key === selectLink){
        this._activeLinks = {
          ...this._activeLinks,
          [key]: 'active',
        }
      }else{
        this._activeLinks = {
          ...this._activeLinks,
          [key]: 'not_active'
        }
      }
    })
   }

   getActiveLinks(){
    return this._activeLinks;
   }

}
