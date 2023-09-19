import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { INotification } from '../models/chat';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  // Список уведомлений
  private _notificationArray: INotification[] = [];
  private _notificationList = new BehaviorSubject<INotification[]>(
    this._notificationArray
  );

  notificationList$ = this._notificationList.asObservable();

  constructor() {}

  addNotification(newNotification: INotification) {
    const isExist = this._notificationArray.some(
      (notification) => notification.id === newNotification.id
    );

    if (isExist) {
      return;
    }
    this._notificationArray.push(newNotification);
    this._notificationList.next(this._notificationArray);
  }

}
