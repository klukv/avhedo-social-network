import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private _typeEdit: string;
  private _typeModal: string;

  constructor() {}

  $isVisible = new BehaviorSubject<boolean>(false);
  $isOpenPopup = new BehaviorSubject<boolean>(false);

  open(typeEdition: string, typeModalWindow: string) {
    this._typeModal = typeModalWindow;
    this._typeEdit = typeEdition;
    this.$isVisible.next(true);
  }

  close() {
    this.$isVisible.next(false);
  }

  openPopup() {
    this.$isOpenPopup.next(true);
  }

  closePopup() {
    this.$isOpenPopup.next(false);
  }

  get typeEdit() {
    return this._typeEdit;
  }

  get typeModal() {
    return this._typeModal;
  }
}
