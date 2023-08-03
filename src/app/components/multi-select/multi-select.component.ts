import { Component} from '@angular/core';
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

  private _hobbyList: IHobbyInfo[] = [
    {
      id: 0,
      information: 'Настольные игры',
    },
    {
      id: 1,
      information: 'Спорт',
    },
    {
      id: 2,
      information: 'Программирование',
    },
    {
      id: 3,
      information: 'Сериалы',
    },
    {
      id: 4,
      information: 'Фильмы',
    },
    {
      id: 5,
      information: 'Рисование',
    },
  ];

  constructor(
    public modalService: ModalService,
    private personService: PersonPageService
  ) {}

  ngOnInit() {
    this.personService.personInfo$.subscribe((infoPerson) => {
      if (infoPerson.hobby) {
        const arrayCurrentHobby = infoPerson.hobby.split(', ');

        if (arrayCurrentHobby.length === 0) return;

        for (let i = 0; i < arrayCurrentHobby.length; i++) {
          const findHobby = this.hobbyList.filter(
            (hobbyValue) => hobbyValue.information === arrayCurrentHobby[i]
          )[0];
          this.personService.setCurrentHobbyItems(findHobby);
        }
      }
    });
  }

  addSelectHobby(hobby: IHobbyInfo) {
    const isCheck = this.personService.selectHobbyItems.some(
      (hobbyOfArray) => JSON.stringify(hobbyOfArray) === JSON.stringify(hobby)
    );
    if (!isCheck) {
      this.personService.selectHobbyItems.push(hobby);
    }
  }

  get hobbyList() {
    return this._hobbyList;
  }
}
