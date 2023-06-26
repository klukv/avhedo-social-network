import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, ViewChild } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent {
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  private _age: number;

  constructor(public modalService: ModalService) {}

  addEvent(selectedDate: Date) {
    const today = new Date();
    const birthday = new Date(selectedDate);
    const diffMonth = today.getMonth() - birthday.getMonth();
    this._age = today.getFullYear() - birthday.getFullYear();
    if (diffMonth < 0 ||(diffMonth === 0 && today.getDate() < birthday.getDate())) {
      this._age--;
    }
  }
  get currentAge() {
    return this._age;
  }
}
