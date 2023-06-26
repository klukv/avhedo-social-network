import { Component } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { PersonPageService } from 'src/app/services/person-page.service';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.css'],
})
export class MyPageComponent {
  constructor(
    public modalService: ModalService,
    public personService: PersonPageService
  ) {}

  ngOnInit() {
    this.personService.setNewPersonInfo({ value: 'username', text: 'Вася' });
  }
}
