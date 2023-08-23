import { Injectable } from '@angular/core';
import { IChatMessage } from '../models/chatMessage';
import { BehaviorSubject } from 'rxjs';
import { PersonPageService } from './person-page.service';
import { IPersonInfo } from '../models/personInfo';
import { IFriends } from '../models/friends';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private _arrayMessages: IChatMessage[] = [];

  private _messages = new BehaviorSubject<IChatMessage[]>(
    this._arrayMessages
  );

  messages$ = this._messages.asObservable();

  personInfo: IPersonInfo = this.storageService.getUser();

  // Переменные связанные с Stomp и SockJS
  stompClient: any = null;
  urlMessageWebsocket: string;

  constructor(private storageService:StorageService) {
  }

  connect(endPointWebSocket: string) {
    let ws = new SockJS(endPointWebSocket);
    this.stompClient = Stomp.over(ws);

    this.stompClient.connect(
      {},
      () => {
        console.log(`Подключение установлено`);
        this.stompClient.subscribe(
          '/user/' + this.personInfo.id + '/queue/messages',
          this._onMessageReceived.bind(this)
        );
      },
      this._errorCallBack
    );
  }

  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log('Соединение прервано');
  }

  sendMessage(msg: string, friend: IFriends) {
    console.log('отправка сообщения');
    if (msg.trim() !== '') {
      const message = {
        senderId: this.personInfo.id,
        recipientId: friend.id,
        senderName: this.personInfo.username,
        recipientName: friend.username,
        content: msg,
        timestamp: new Date(),
      };

      this.stompClient.send('/app/chat', {}, JSON.stringify(message));

      this._arrayMessages.push(message);
      this._messages.next(this._arrayMessages);
    }
  }

  private _errorCallBack(error: any) {
    console.log('errorCallBack -> ' + error);
  }

  private _onMessageReceived(message: IChatMessage) {
    console.log('Message Recieved from Server :: ' + message);
  }

  clearMessages() {
    this._arrayMessages = [];
    this._messages.next(this._arrayMessages);
  }

  getAllMessages(id: string) {
    // this._arrayMessagesOwn = messageLinkOwn.filter(
    //   (messageInfo) => messageInfo.chatId === id
    // );
    // this._arrayMessagesInterlocutor = messageLinkInterlocutor.filter(
    //   (messageInfo) => messageInfo.chatId === id
    // );
    // this._messagesOwn.next(this._arrayMessagesOwn);
    // this._messagesInterlocutor.next(this._arrayMessagesInterlocutor);
  }
}
