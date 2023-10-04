import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap } from 'rxjs';
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
  private _notificationArray: [IAllNotifications[]] = [[]];
  private _notificationList = new BehaviorSubject<[IAllNotifications[]]>(
    this._notificationArray
  );

  notificationList$ = this._notificationList.asObservable();

  //перменная отслеживающая, открыто окно уведомлений или нет
  private _isOpenNotifications = new BehaviorSubject<boolean>(false);

  isOpenNotifications$ = this._isOpenNotifications.asObservable();

  //Количество уведомлений
  private countNotifications: number = 0;

  constructor(private _http: HttpClient, private errorService: ErrorService) {}

  addNotifications(newNotifications: [IAllNotifications[]]) {
    this._notificationArray = newNotifications;
    this._notificationList.next(this._notificationArray);
  }

  setIsOpenNotif(value: boolean) {
    this._isOpenNotifications.next(value);
  }

  setCountNotifications(value: number) {
    this.countNotifications = value;
  }

  getCountNotifications() {
    return this.countNotifications;
  }

  //backend reauest

  getAllNotifications(recipientId: number): Observable<IAllNotifications[]> {
    return this._http
      .get<IAllNotifications[]>(
        API_URL + GET_ALL_NOTIFICATIONS + '/' + recipientId,
        httpOptions
      )
      .pipe(
        tap((notificationsData) => {
          // преобразовываем массив уведомлений (группирую по id отправителя)
          if (notificationsData.length !== 0) {
            const groupedNotifications = notificationsData.reduce<[IAllNotifications[]]>(
              (prevValue, currentNotif) => {
                const existGroupedNotifications = prevValue.find(
                  (currentGroup: IAllNotifications[]) => {
                    return currentGroup[0]?.senderId === currentNotif.senderId;
                  }
                );

                if (existGroupedNotifications) {
                  existGroupedNotifications.push(currentNotif);
                } else {
                  prevValue.push([currentNotif]);
                }

                return prevValue;
              },
              [[]]
            );
              
            //устанавливаю количество уведомлений
            this.setCountNotifications(notificationsData.length);
            //устанавливаю группированные уведомления
            groupedNotifications.shift();
            this.addNotifications(groupedNotifications);
          }
        }),
        catchError((error) => this.errorService.handle(error))
      );
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
