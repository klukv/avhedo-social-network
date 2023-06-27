import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  form: FormGroup;

  hobbyList = [
    ' Настольные игры',
    ' Спорт',
    ' Программирование',
    ' Сериалы',
    ' Фильмы',
    ' Рисование',
  ];

  constructor(
    public modalService: ModalService,
    public personService: PersonPageService,
    private fb: FormBuilder
  ) {
    this._createForm();
  }

  private _createForm() {
    this.form = this.fb.group({
      ageValue: ['', Validators.required],
      hobbyName: ['', Validators.required],
      aboutInfo: ['', Validators.required],
    });
  }

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

  addHobby() {
    this._hobby = this.form.value.hobbyName;
  }

  addAboutInfo(){
    this._about = this.form.value.aboutInfo;
    console.log(this.form.value);
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
