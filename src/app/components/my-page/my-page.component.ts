import { Component } from '@angular/core';
import { IPersonInfo } from 'src/app/models/personInfo';
import { ModalService } from 'src/app/services/modal.service';
import { PersonPageService } from 'src/app/services/person-page.service';
import { TypeEditVariants } from 'src/app/utils/const';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.css'],
})
export class MyPageComponent {
  variantsEdit = TypeEditVariants;
  constructor(
    public modalService: ModalService,
    public personService: PersonPageService
  ) {}
}
