import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private _typeEdit: string;

  constructor() {}

  $isVisible = new BehaviorSubject<boolean>(false);

  open(typeEdition:string) {
    this._typeEdit = typeEdition;
    this.$isVisible.next(true);
  }

  close() {
    this.$isVisible.next(false);
  }

  get typeEdit(){
    return this._typeEdit;
  }
}
