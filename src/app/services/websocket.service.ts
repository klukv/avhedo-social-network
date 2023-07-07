import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { IChatMessage } from '../models/chatMessage';
import { BehaviorSubject, Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private _arrayMessages:IChatMessage[] = [];
  private _messages = new BehaviorSubject<IChatMessage[]>(this._arrayMessages);
  messages$ = this._messages.asObservable();

  constructor() {}

  addNewMessage(message: IChatMessage){
    this._arrayMessages.push(message);
    this._messages.next(this._arrayMessages);
  }


}
