import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonPageService } from 'src/app/services/person-page.service';
import { StorageService } from 'src/app/services/storage.service';
import { catchError } from 'rxjs';
import { ErrorService } from 'src/app/services/error.service';
import { ModalService } from 'src/app/services/modal.service';
import { IPersonInfo } from 'src/app/models/personInfo';

@Component({
  selector: 'app-create-info-user',
  templateUrl: './create-info-user.component.html',
  styleUrls: ['./create-info-user.component.css'],
})
export class CreateInfoUserComponent {
  @ViewChild('refCheckboxMan') refChecboxMan: ElementRef;
  @ViewChild('refCheckboxWoman') refChecboxWoman: ElementRef;
  @ViewChild('fileInput') fileInput: ElementRef;

  private _agePerson: number;
  private _genderPerson: string;
  private _userInfo: IPersonInfo = this.storageService.getUser();
  private _formData: FormData = new FormData();
  form: FormGroup;

  constructor(
    public personService: PersonPageService,
    private fb: FormBuilder,
    private storageService: StorageService,
    private errorService: ErrorService,
    private modalService: ModalService
  ) {
    this._createFrom();
  }

  private _createFrom() {
    this.form = this.fb.group({
      birthday: ['', [Validators.required]],
      aboutPerson: ['', [Validators.required, Validators.maxLength(350)]],
      gender: ['', Validators.required],
      imageAvatar: [
        {
          filename: '',
          filetype: '',
          value: '',
        },
        Validators.required,
      ],
    });
  }

  get birthdayPerson() {
    return this.form.get('birthday');
  }

  get hobbyPerson() {
    return this.form.get('hobby');
  }

  get aboutPerson() {
    return this.form.get('aboutPerson');
  }

  get genderMan() {
    return this.form.get('genderMan');
  }

  get genderWoman() {
    return this.form.get('genderWoman');
  }

  get imageAvatar() {
    return this.form.get('imageAvatar');
  }

  //Метод для загрузки фото в форму

  onFileChange(event: any) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];

      reader.readAsDataURL(file);

      this._formData.append('file', file);

      reader.onload = () => {
        const imageControl = this.form.get('imageAvatar');

        if (imageControl && typeof reader.result === 'string') {
          imageControl.setValue({
            filename: file.name,
            filetype: file.type,
            value: reader.result.split(',')[1],
          });
        }
      };
    }
  }

  setAgeValue(selectedDate: Date) {
    const today = new Date();
    const birthday = new Date(selectedDate);
    const diffMonth = today.getMonth() - birthday.getMonth();
    this._agePerson = today.getFullYear() - birthday.getFullYear();

    if (
      diffMonth < 0 ||
      (diffMonth === 0 && today.getDate() < birthday.getDate())
    ) {
      this._agePerson--;
    }
  }

  changeValueCheckbox(type: string) {
    if (type === 'man') {
      this.refChecboxWoman.nativeElement['checked'] = false;
      this._genderPerson = type;
    }
    if (type === 'woman') {
      this.refChecboxMan.nativeElement['checked'] = false;
      this._genderPerson = type;
    }
  }

  clickSaveInfoUser() {
    if (
      this.form.invalid ||
      this.personService.selectHobbyItems.length === 0 ||
      this._userInfo.id === undefined
    ) {
      console.log('запрос не прошёл');
      console.log(this.imageAvatar);
      return;
    }
    console.log('запрос прошёл');
    this.personService
      .addAdditionallyInfoUser(
        {
          dateOfBirthday: this._agePerson,
          hobby: this.personService.selectHobbyItems
            .map((hobby) => hobby.information)
            .join(', '),
          aboutMe: this.aboutPerson?.value,
          sex: this._genderPerson,
          url: `assets/avatars/${this.imageAvatar?.value.filename}`,
        },
        this._userInfo.id.toString()
      )
      .pipe(catchError((error) => this.errorService.handle(error)))
      .subscribe(() => {
        this.storageService.saveShowInfoUser(true);
        this.personService.setLoaded(false);
        this.modalService.close();
      });
    if (this._formData.getAll.length !== 0) {
      this.personService.addImageAvatar(this._userInfo.id, this._formData);
    }
  }
}
