import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { IHobbyInfo } from 'src/app/models/personInfo';
import { ModalService } from 'src/app/services/modal.service';
import { PersonPageService } from 'src/app/services/person-page.service';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css'],
})
export class MultiSelectComponent {
  searchHobby: string = '';
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

  constructor(public modalService: ModalService, private personService: PersonPageService) {
  }

  addSelectHobby(hobby: IHobbyInfo) {
    if (this.personService.selectHobbyItems.indexOf(hobby) !== -1) {
      return;
    }
    this.personService.selectHobbyItems.push(hobby);
  }

  get hobbyList() {
    return this._hobbyList;
  }
}
