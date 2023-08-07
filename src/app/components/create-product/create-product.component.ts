import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
import { PersonPageService } from 'src/app/services/person-page.service';
import { StorageService } from 'src/app/services/storage.service';
import { TypeEditVariants } from 'src/app/utils/const';
import { catchError } from 'rxjs';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent {
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  private _age: number;
  private _about: string;
  private _infoUser: any;
  private _infoUserFromStore = this.storageService.getUser();

  variantsEdit = TypeEditVariants;
  form: FormGroup;

  constructor(
    private storageService: StorageService,
    private fb: FormBuilder,
    private errorService: ErrorService,
    public modalService: ModalService,
    public personService: PersonPageService
  ) {
    this._createForm();
    this.personService.personInfo$.subscribe((infoUser) => {
      this._infoUser = infoUser;
    });
    console.log(this.personService.selectHobbyItems.length);
    
  }

  private _createForm() {
    this.form = this.fb.group({
      ageValue: ['', Validators.required],
      hobbyName: ['', Validators.required],
      aboutInfo: ['', Validators.required],
    });
  }
  // =============================================================================== Age-block
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
  // =============================================================================== About-block
  setAboutInfo() {
    this._about = this.form.value.aboutInfo;
  }
  // =============================================================================== Main-block
  setEditions(edit: string | number) {

    switch (edit) {
      case this.variantsEdit.TYPE_AGE:
        this.personService.setNewPersonInfo({
          value: this.variantsEdit.TYPE_AGE,
          text: this._age !== undefined ? this._age : 'Данное поле не заполнено',
        });
        break;
      case this.variantsEdit.TYPE_HOBBY:
        this.personService.setNewPersonInfo({
          value: this.variantsEdit.TYPE_HOBBY,
          text: this.personService.selectHobbyItems.length !== 0 ? this.personService.selectHobbyItems
            .map((hobby) => hobby.information)
            .join(', ') : 'Данное поле не заполнено',
        });
        break;
      case this.variantsEdit.TYPE_ABOUT:
        this.personService.setNewPersonInfo({
          value: this.variantsEdit.TYPE_ABOUT,
          text: this._about !== undefined ? this._about : 'Данное поле не заполнено',
        });
        break;
    }
    this.personService
      .editInfoUser(
        {
          dateOfBirthday: this._infoUser.age,
          hobby: this._infoUser.hobby,
          aboutMe: this._infoUser.about,
          sex: this._infoUser.gender,
          url: this._infoUser.urlImage,
        },
        this._infoUserFromStore.id
      )
      .pipe(catchError(this.errorService.handle.bind(this)))
      .subscribe(() => {});
    this.modalService.close();
  }

  get currentAge() {
    return this._age;
  }

  get currentAbout() {
    return this._about;
  }
}
