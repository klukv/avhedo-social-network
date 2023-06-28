import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { IHobbyInfo } from 'src/app/models/personInfo';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css'],
})
export class MultiSelectComponent {
  @Input() nameControl: string;
  searchHobby: string = '';
  private _selectHobbyItems: IHobbyInfo[] = [];
  private _hobbyList:IHobbyInfo[]  = [
    {
      id: 0,
      information: ' Настольные игры',
    },
    {
      id: 1,
      information: ' Спорт',
    },
    {
      id: 2,
      information: ' Программирование',
    },
    {
      id: 3,
      information: ' Сериалы',
    },
    {
      id: 4,
      information: ' Фильмы',
    },
    {
      id: 5,
      information: ' Рисование',
    },
  ];

  constructor(public modalService: ModalService) {}

  addSelectHobby(hobby: IHobbyInfo) {
    if (this._selectHobbyItems.indexOf(hobby) !== -1) {
      return;
    }
    this._selectHobbyItems.push(hobby);
  }

  removeSelectHobby(id: number) {
    this._selectHobbyItems.filter((hobby) => hobby.id !== id);
  }

  get hobbyList() {
    return this._hobbyList;
  }

  get selectHobbyItems() {
    return this._selectHobbyItems;
  }
}
