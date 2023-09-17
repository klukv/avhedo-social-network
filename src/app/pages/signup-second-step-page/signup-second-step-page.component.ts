import {
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  HostListener,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, catchError, throwError } from 'rxjs';
import { IPersonInfo } from 'src/app/models/personInfo';
import { ErrorService } from 'src/app/services/error.service';
import { LoginService } from 'src/app/services/login.service';
import { ModalService } from 'src/app/services/modal.service';
import { PersonPageService } from 'src/app/services/person-page.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-signup-second-step-page',
  templateUrl: './signup-second-step-page.component.html',
  styleUrls: ['./signup-second-step-page.component.css'],
})
export class SignupSecondStepPageComponent {
  @ViewChild('refCheckboxMan') refChecboxMan: ElementRef;
  @ViewChild('refCheckboxWoman') refChecboxWoman: ElementRef;
  @ViewChild('fileInput') fileInput: ElementRef;

  selectElement = '.select-hobby__inner';
  form: FormGroup;
  private _agePerson: number;
  private _genderPerson: string;
  private _userInfo: IPersonInfo = this.storageService.getUser();
  private _formData: FormData = new FormData();
  private sub: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private storageService: StorageService,
    private modalService: ModalService,
    public errorService: ErrorService,
    public personService: PersonPageService
  ) {
    this._createForm();
  }

  private _createForm() {
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
      ],
    });
  }

  //Метод для закрытия выпадающего окна хобби при клике вне его области
  @HostListener('document:click', ['$event'])
  closePopup(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    if (!clickedElement.closest(this.selectElement)) {
      this.modalService.closePopup();
    }
  }

  saveAdditionallyInfoUser() {
    // this.authService.setValueIsRegister(true); устанавливаем значение в true для прохождения регистрации
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

  //сохраняем информацию в бд

  clickSaveInfoUser() {
    if (
      this.form.invalid ||
      this.personService.selectHobbyItems.length === 0 ||
      this._userInfo.id === undefined
    ) {
      console.log(this._formData.getAll('file').length);

      console.log('запрос не прошёл');
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
          url: ``,
        },
        this._userInfo.id.toString()
      )
      .pipe(catchError((error) => this.errorService.handle(error)))
      .subscribe(() => {
        this.storageService.saveShowInfoUser(true);
        this.personService.setLoaded(false);
      });
    if (this._formData.getAll('file').length !== 0) {
      this.personService
        .addImageAvatar(this._userInfo.id, this._formData)
        .subscribe(() => {});
    }
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

  ngOnDestroy() {
    if (this.sub !== undefined) {
      this.sub.unsubscribe();
    }
  }
}
