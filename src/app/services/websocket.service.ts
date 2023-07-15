import { Injectable } from '@angular/core';
import { IChatMessage } from '../models/chatMessage';
import { BehaviorSubject } from 'rxjs';
import { messageLinkOwn } from '../data/messagesData';
import { TypeActionAddNewMessage } from '../utils/const';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private _arrayMessages: IChatMessage[] = messageLinkOwn;
  private _messages = new BehaviorSubject<IChatMessage[]>(this._arrayMessages);
  messages$ = this._messages.asObservable();

  constructor() {}

  addNewMessage(message: IChatMessage) {
    this._arrayMessages.push(message);
    this._messages.next(this._arrayMessages);
  }

  clearMessages(){
    this._arrayMessages = [];
    this._messages.next(this._arrayMessages);
  }
}
