import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, ViewChild } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { PersonPageService } from 'src/app/services/person-page.service';
import { TypeEditVariants } from 'src/app/utils/const';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent {
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  private _age: number;
  private _hobby: string;
  private _about: string;

  variantsEdit = TypeEditVariants;

  constructor(
    public modalService: ModalService,
    public personService: PersonPageService
  ) {}

  setUserAge(selectedDate: Date) {
    const today = new Date();
    const birthday = new Date(selectedDate);
    const diffMonth = today.getMonth() - birthday.getMonth();
    this._age = today.getFullYear() - birthday.getFullYear();

    if (
      diffMonth < 0 ||
      (diffMonth === 0 && today.getDate() < birthday.getDate())
    ) {
      this._age--;
    }
  }

  setEditions(edit: string | number) {
    switch (edit) {
      case this.variantsEdit.TYPE_AGE:
        this.personService.setNewPersonInfo({
          value: this.variantsEdit.TYPE_AGE,
          text: this._age,
        });
        break;
      case this.variantsEdit.TYPE_HOBBY:
        this.personService.setNewPersonInfo({
          value: this.variantsEdit.TYPE_HOBBY,
          text: this._hobby,
        });
        break;
      case this.variantsEdit.TYPE_ABOUT:
        this.personService.setNewPersonInfo({
          value: this.variantsEdit.TYPE_ABOUT,
          text: this._about,
        });
        break;
    }
    this.modalService.close();
  }

  get currentAge() {
    return this._age;
  }

  get currentHobby() {
    return this._hobby;
  }

  get currentAbout() {
    return this._about;
  }
}
