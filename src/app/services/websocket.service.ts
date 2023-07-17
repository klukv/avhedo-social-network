import { Injectable } from '@angular/core';
import { IChatMessage } from '../models/chatMessage';
import { BehaviorSubject } from 'rxjs';
import { messageLinkInterlocutor, messageLinkOwn } from '../data/messagesData';
import { TypeActionAddNewMessage } from '../utils/const';
import { PersonPageService } from './person-page.service';
import { IPersonInfo } from '../models/personInfo';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private _arrayMessagesOwn: IChatMessage[] = [];
  private _arrayMessagesInterlocutor: IChatMessage[] = [];

  private _messagesOwn = new BehaviorSubject<IChatMessage[]>(this._arrayMessagesOwn);
  private _messagesInterlocutor = new BehaviorSubject<IChatMessage[]>(this._arrayMessagesInterlocutor);

  messagesOwn$ = this._messagesOwn.asObservable();
  messagesInterlocutor$ = this._messagesInterlocutor.asObservable();

  personInfo: IPersonInfo;

  constructor(private personService: PersonPageService) {
    personService.personInfo$.subscribe(currentPersonInfo => this.personInfo = currentPersonInfo);
  }

  addNewMessage(message: IChatMessage) {
    if(this.personInfo.id === Number(message.senderId)){
      this._arrayMessagesOwn.push(message);
      this._messagesOwn.next(this._arrayMessagesOwn);
    }
    if(this.personInfo.id === Number(message.recipientId)){
      this._arrayMessagesInterlocutor.push(message);
      this._messagesInterlocutor.next(this._arrayMessagesInterlocutor);
    }
  }

  clearMessages(){
    this._arrayMessagesOwn = [];
    this._arrayMessagesInterlocutor = [];
    this._messagesOwn.next(this._arrayMessagesOwn);
    this._messagesInterlocutor.next(this._arrayMessagesInterlocutor);
  }

  getAllMessages(id: string) {
    this._arrayMessagesOwn = messageLinkOwn.filter(messageInfo => messageInfo.chatId === id);
    this._arrayMessagesInterlocutor = messageLinkInterlocutor.filter(messageInfo => messageInfo.chatId === id);
    this._messagesOwn.next(this._arrayMessagesOwn);
    this._messagesInterlocutor.next(this._arrayMessagesInterlocutor);
  }
}
