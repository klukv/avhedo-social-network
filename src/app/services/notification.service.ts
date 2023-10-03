import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { IAllNotifications, INotification } from '../models/chat';
import { HttpClient } from '@angular/common/http';
import {
  API_URL,
  DELETE_NOTIFICATIONS,
  GET_ALL_NOTIFICATIONS,
  httpOptions,
} from '../utils/const';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  // Список уведомлений
  private _notificationArray: IAllNotifications[] = [];
  private _notificationList = new BehaviorSubject<IAllNotifications[]>(
    this._notificationArray
  );

  notificationList$ = this._notificationList.asObservable();

  //перменная отслеживающая, открыто окно уведомлений или нет
  private _isOpenNotifications = new BehaviorSubject<boolean>(false);

  isOpenNotifications$ = this._isOpenNotifications.asObservable();

  constructor(private _http: HttpClient, private errorService: ErrorService) {}

  addNotifications(newNotifications: IAllNotifications[]) {
    this._notificationArray = newNotifications;
    this._notificationList.next(this._notificationArray);
  }

  setIsOpenNotif(value:boolean){
    this._isOpenNotifications.next(value);
  }

  //backend reauest

  getAllNotifications(recipientId: number): Observable<IAllNotifications[]> {
    return this._http
      .get<IAllNotifications[]>(
        API_URL + GET_ALL_NOTIFICATIONS + '/' + recipientId,
        httpOptions
      )
      .pipe(catchError((error) => this.errorService.handle(error)));
  }

  deleteNotificatons(recipientId: number, senderId: string) {
    return this._http
      .delete(
        API_URL + DELETE_NOTIFICATIONS + '/' + recipientId + '/' + senderId,
        httpOptions
      )
      .pipe(catchError((error) => this.errorService.handle(error)));
  }
}
