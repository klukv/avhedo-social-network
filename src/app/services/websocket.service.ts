import { Injectable } from '@angular/core';
import { IChatMessage } from '../models/chatMessage';
import { BehaviorSubject } from 'rxjs';
import { PersonPageService } from './person-page.service';
import { IPersonInfo } from '../models/personInfo';
import { IFriends } from '../models/friends';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { StorageService } from './storage.service';
import { IResponseInfoUser } from '../models/user';
import { ChatService } from './chat.service';

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

  constructor(private storageService:StorageService, private chatService: ChatService) {
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

  sendMessage(msg: string, recipient: IResponseInfoUser) {
    console.log('отправка сообщения');
    if (msg.trim() !== '' && this.personInfo.id) {
      const message = {
        senderId: this.personInfo.id,
        recipientId: recipient.userDto.id,
        senderName: this.personInfo.username,
        recipientName: recipient.userDto.username,
        content: msg,
        timestamp: new Date(),
        status: 'RECEIVED'
      };

      this.stompClient.send('/app/chat', {}, JSON.stringify(message));

      this.chatService.addMessageChat(message);
    }
  }

  private _errorCallBack(error: any) {
    console.log('errorCallBack -> ' + error);
  }

  private _onMessageReceived(message: any) {
    const parseMessage = JSON.parse(message.body);
    console.log(parseMessage);
    
    this.chatService.addMessageChat(parseMessage);
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
