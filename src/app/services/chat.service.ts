import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  API_URL,
  GET_ALL_CHATS_USER,
  GET_ALL_MESSAGES_CHAT,
  httpOptions,
} from '../utils/const';
import { Observable, catchError, tap } from 'rxjs';
import { IAllChats } from '../models/chat';
import { ErrorService } from './error.service';
import { IResponseAllChatMessages } from '../models/chatMessage';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private _http: HttpClient, private errorService: ErrorService) {}

  private _allChatsUser: IAllChats[] = [];
  private _allMessagesChat: IResponseAllChatMessages[] = [];
  private _currentChatId: string = '';

  get allChatsUser() {
    return this._allChatsUser;
  }

  get allMessagesChat() {
    return this._allMessagesChat;
  }

  get currentChatId() {
    console.log(this._currentChatId);
    return this._currentChatId;
  }

  setChatId(id: string) {
    this._currentChatId = id;
  }

  //backend requests

  getAllChatsUser(userId: number): Observable<IAllChats[]> {
    return this._http
      .get<IAllChats[]>(
        API_URL + GET_ALL_CHATS_USER + '/' + userId,
        httpOptions
      )
      .pipe(
        tap((chatsData) => (this._allChatsUser = chatsData)),
        catchError((error) => this.errorService.handle(error))
      );
  }

  getAllMessagesChat(chatId: string): Observable<IResponseAllChatMessages[]> {
    return this._http
      .get<IResponseAllChatMessages[]>(
        API_URL + GET_ALL_MESSAGES_CHAT + '/' + chatId,
        httpOptions
      )
      .pipe(
        tap((messagesChatData) => (this._allMessagesChat = messagesChatData)),
        catchError((error) => this.errorService.handle(error))
      );
  }
}
