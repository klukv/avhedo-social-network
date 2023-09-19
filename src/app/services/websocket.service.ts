import { Injectable } from '@angular/core';
import { IChatMessage } from '../models/chatMessage';
import { BehaviorSubject } from 'rxjs';
import { IPersonInfo } from '../models/personInfo';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { StorageService } from './storage.service';
import { IResponseInfoUser } from '../models/user';
import { ChatService } from './chat.service';
import { TActiveChat } from '../models/chat';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private _arrayMessages: IChatMessage[] = [];

  private _messages = new BehaviorSubject<IChatMessage[]>(this._arrayMessages);

  // объект для отслеживания в каком чате в данный момент находится пользователь
  private _activeChat: TActiveChat = {
    id: undefined,
    recipientName: undefined,
  };

  // Переменные связанные с Stomp и SockJS
  private isConnected = new BehaviorSubject<boolean>(false);

  messages$ = this._messages.asObservable();

  personInfo: IPersonInfo = this.storageService.getUser();
  isConnected$ = this.isConnected.asObservable();
  stompClient: any = null;
  urlMessageWebsocket: string;

  constructor(
    private storageService: StorageService,
    private chatService: ChatService,
    private notificationService: NotificationService
  ) {}

  setValueConnecting(value: boolean) {
    this.isConnected.next(value);
  }

  setActiveChat(newInfoChat: TActiveChat) {
    this._activeChat = newInfoChat;
  }

  connect(endPointWebSocket: string) {
    let ws = new SockJS(endPointWebSocket);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect(
      {},
      () => {
        this.setValueConnecting(true);
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
        status: 'RECEIVED',
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
;
    if (this._activeChat.id === parseMessage.senderId) {

      this.chatService
        .getSpecificallyMessage(parseMessage.id)
        .subscribe((message) => {
          this.chatService.addMessageChat(message);
        });
    } else {
      this.notificationService.addNotification(parseMessage);
    }
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
