import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonPageService } from 'src/app/services/person-page.service';

@Component({
  selector: 'app-create-info-user',
  templateUrl: './create-info-user.component.html',
  styleUrls: ['./create-info-user.component.css'],
})
export class CreateInfoUserComponent {
  @ViewChild('refCheckboxMan') refChecboxMan: ElementRef;
  @ViewChild('refCheckboxWoman') refChecboxWoman: ElementRef;

  private _agePerson: number;
  form: FormGroup;

  constructor(private fb: FormBuilder, public personService: PersonPageService) {
    this._createFrom();
  }

  private _createFrom() {
    this.form = this.fb.group({
      birthday: ['', [Validators.required]],
      hobbyPerson: ['', [Validators.required]],
      aboutPerson: ['', [Validators.required, Validators.maxLength(350)]],
      genderMan: ['', [Validators.required]],
      genderWoman: ['', [Validators.required]],
    });
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
    }
    if (type === 'woman') {
      this.refChecboxMan.nativeElement['checked'] = false;
    }
  }

  setAboutInfo(){
    
  }

  clickSaveInfoUser() {
    let genderPerson: string = '';

    if (this.genderMan?.value === true) {
      genderPerson = 'man';
    }
    if (this.genderWoman?.value === true) {
      genderPerson = 'woman';
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
}
