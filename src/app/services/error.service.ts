import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private _error = new BehaviorSubject<string>('');
  private _isVisibleErrorModal = new BehaviorSubject<boolean>(false);

  error$ = this._error.asObservable();
  isVisibleErrorModal$ = this._isVisibleErrorModal.asObservable();

  constructor() {}

  handle(error: HttpErrorResponse) {
    switch (error.status) {
      case 400:
        this._error.next('Запрос отклонен');
        break;
      case 401:
        this._error.next('Доступ запрещён');
        break;
      case 404:
        this._error.next('Запрашиваемый файл не найден');
        break;
      case 500:
        this._error.next('Сервер недоступен');
        break;
    }
    return throwError(() => error.message);
  }

  clear() {
    this._error.next('');
  }

  openErrorModal() {
    this._isVisibleErrorModal.next(true);
  }

  closeErrorModal() {
    this.clear();
    this._isVisibleErrorModal.next(false);
  }
}
