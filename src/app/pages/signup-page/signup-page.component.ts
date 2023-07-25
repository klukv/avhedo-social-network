import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css'],
})
export class SignupPageComponent {
  @ViewChild('refCheckboxMan') refChecboxMan: ElementRef;
  @ViewChild('refCheckboxWoman') refChecboxWoman: ElementRef;

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this._createForm();
  }

  private _createForm() {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      genderMan: [false, [Validators.required]],
      genderWoman: [false, [Validators.required]],
    });
  }

  setRegisterAgeValue(selectedDate: Date) {}

  logInfo() {
    console.log(this.password?.errors);
    console.log(this.form);
  }

  changeValueCheckbox(type: string){
    if(type === 'man'){
      this.refChecboxWoman.nativeElement['checked'] = false
    }
    if(type === 'woman'){
      this.refChecboxMan.nativeElement['checked'] = false
    }
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  get email() {
    return this.form.get('email');
  }

  get birthday() {
    return this.form.get('birthday');
  }

  get genderMan() {
    return this.form.get('genderMan');
  }

  get genderWoman() {
    return this.form.get('genderWoman');
  }
}
