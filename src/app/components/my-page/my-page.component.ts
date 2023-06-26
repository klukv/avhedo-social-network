import { Component } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
<<<<<<< HEAD
import { PersonPageService } from 'src/app/services/person-page.service';
=======
import { TypeEditVariants } from 'src/app/utils/const';
>>>>>>> modal-edit-age

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

<<<<<<< HEAD
  ngOnInit() {
    this.personService.setNewPersonInfo({ value: 'username', text: 'Вася' });
=======
  variantsEdit = TypeEditVariants;

  constructor(public modalService: ModalService){

>>>>>>> modal-edit-age
  }
}
