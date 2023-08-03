import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private _error = new BehaviorSubject<string>('');
  error$ = this._error.asObservable();

  handle(error: HttpErrorResponse){
    this._error.next(error.message);
    return throwError(() => error.message);
  }

  clear(){
    this._error.next('');
  }

  constructor() { }
}
